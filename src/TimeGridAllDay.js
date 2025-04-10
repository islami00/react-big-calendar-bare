/**
 * @import TimeGridAllDayClass,  {TimeGridAllDayProps, TimeGridAllDayState} from './TimeGridAllDay.types'
 * @import {OnSelectSlotArgs} from './BackgroundCells.types'
 * @import {ResourcesFn, ResourcesFnReturns, ResourcesFnGroupedEvents} from './utils/Resources.types'
 * @import {RBCEvent, RBCResource} from './misc.types'
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as animationFrame from 'dom-helpers/animationFrame'
import memoize from 'memoize-one'

// import TimeGutter from './TimeGutter'
import TimeGridHeaderAllDay from './TimeGridHeaderAllDay.js'
import PopOverlay from './PopOverlay'

import getPosition from 'dom-helpers/position'
import { views } from './utils/constants'
import { inRange, sortEvents } from './utils/eventLevels'
import { notify } from './utils/helpers'
import Resources from './utils/Resources'
import { DayLayoutAlgorithmPropType } from './utils/propTypes'
import DateContentRow from './DateContentRow'
import TimeGutterAllDay from './TimeGutterAllDay'

/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template  {NonNullable<unknown>} [TResource=RBCResource]
 * @extends {Component<TimeGridAllDayProps<TEvent, TResource>, TimeGridAllDayState<TEvent>>}
 * @type {typeof TimeGridAllDayClass}
 * */
export default class TimeGridAllDay extends Component {
  /**
   *
   * @param {TimeGridAllDayProps<TEvent, TResource>} props
   */
  constructor(props) {
    super(props)

    /** @type {TimeGridAllDayState<TEvent>} */
    this.state = {
      isOverflowing: null,
    }

    this.scrollRef = React.createRef()
    this.contentRef = React.createRef()
    this.containerRef = React.createRef()
  }

  getSnapshotBeforeUpdate() {
    this.checkOverflow()
    return null
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }
  /**
   *
   * @param {React.UIEvent<HTMLDivElement>} e
   */
  handleScroll = (e) => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollLeft = e.target.scrollLeft
    }
  }

  handleResize = () => {
    animationFrame.cancel(this.rafHandle)
    this.rafHandle = animationFrame.request(this.checkOverflow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)

    animationFrame.cancel(this.rafHandle)
  }

  handleKeyPressEvent = (...args) => {
    notify(this.props.onKeyPressEvent, args)
  }

  handleSelectEvent = (...args) => {
    //cancel any pending selections so only the event click goes through.
    notify(this.props.onSelectEvent, args)
  }

  handleDoubleClickEvent = (...args) => {
    notify(this.props.onDoubleClickEvent, args)
  }

  handleShowMore = (events, date, cell, slot, target) => {
    const {
      popup,
      onDrillDown,
      onShowMore,
      getDrilldownView,
      doShowMoreDrillDown,
    } = this.props

    if (popup) {
      let position = getPosition(cell, this.containerRef.current)

      this.setState({
        overlay: {
          date,
          events,
          position: { ...position, width: '200px' },
          target,
        },
      })
    } else if (doShowMoreDrillDown) {
      notify(onDrillDown, [date, getDrilldownView(date) || views.DAY])
    }

    notify(onShowMore, [events, date, slot])
  }

  /**
   * @param {Date[]} slots
   * @param {OnSelectSlotArgs} slotInfo
   */
  handleSelectSlot = (slots, slotInfo) => {
    const { onSelectSlot } = this.props

    const start = new Date(slots[0])
    const end = new Date(slots[slots.length - 1])
    end.setDate(slots[slots.length - 1].getDate() + 1)

    notify(onSelectSlot, {
      slots,
      start,
      end,
      action: slotInfo.action,
      resourceId: slotInfo.resourceId,
    })
  }
  /**
   * @param {ResourcesFnGroupedEvents<TEvent>} groupedEvents
   * @param {ResourcesFnReturns<TEvent, TResource>} memoizedResourcesResult
   */
  renderEvents(groupedEvents, memoizedResourcesResult) {
    let {
      //
      rtl,
      resizable,
      selectable,
      getters,
      getNow,
      localizer,
      accessors,
      components,
      range,
      //
    } = this.props
    return memoizedResourcesResult.map(([resourceId], idx, arrayLen) => {
      const isLast = idx === arrayLen - 1

      const events = groupedEvents.get(resourceId) || []

      return (
        <DateContentRow
          getNow={getNow}
          key={`${resourceId}`}
          container={this.getContainer}
          rtl={rtl}
          minRows={1}
          // Expect styles to only have two rows, otherwise use a similar method as Month to change it
          maxRows={isLast ? Infinity : 2}
          range={range}
          events={events}
          resourceId={resourceId}
          className={clsx(
            'brbc-time-content-row brbc-resource-row',
            isLast && 'brbc-last'
          )}
          selectable={selectable}
          selected={this.props.selected}
          components={components}
          accessors={accessors}
          getters={getters}
          localizer={localizer}
          onSelect={this.handleSelectEvent}
          onShowMore={this.handleShowMore}
          onDoubleClick={this.handleDoubleClickEvent}
          onKeyPress={this.handleKeyPressEvent}
          onSelectSlot={this.handleSelectSlot}
          longPressThreshold={this.props.longPressThreshold}
          resizable={resizable}
        />
      )
    })
  }

  render() {
    let {
      events,
      backgroundEvents,
      range,
      rtl,
      getNow,
      resources,
      components,
      accessors,
      getters,
      localizer,
      showMultiDayTimes,
    } = this.props

    let start = range[0],
      end = range[range.length - 1]

    this.slots = range.length
    /**
     * @type {TEvent[]} allDayEvents
     * */
    let allDayEvents = [],
      /**
       * @type {TEvent[]} allDayEvents
       * */
      rangeEvents = [],
      /**
       * @type {TEvent[]} allDayEvents
       * */
      rangeBackgroundEvents = []

    events.forEach((event) => {
      if (inRange(event, start, end, accessors, localizer)) {
        let eStart = accessors.start(event),
          eEnd = accessors.end(event)

        if (
          accessors.allDay(event) ||
          localizer.startAndEndAreDateOnly(eStart, eEnd) ||
          (!showMultiDayTimes && !localizer.isSameDate(eStart, eEnd))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })

    backgroundEvents.forEach((event) => {
      if (inRange(event, start, end, accessors, localizer)) {
        rangeBackgroundEvents.push(event)
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, accessors, localizer))

    const memoizedResourcesResult = this.memoizedResources(resources, accessors)
    const groupedEvents = memoizedResourcesResult.groupEvents(allDayEvents)

    return (
      <div
        className={clsx('brbc-time-view-all-day-inline')}
        ref={this.containerRef}
      >
        <TimeGridHeaderAllDay
          range={range}
          rtl={rtl}
          getNow={getNow}
          isOverflowing={this.state.isOverflowing}
          localizer={localizer}
          components={components}
          getters={getters}
          onDrillDown={this.props.onDrillDown}
          getDrilldownView={this.props.getDrilldownView}
        />
        {this.props.popup && this.renderOverlay()}
        <div
          ref={this.contentRef}
          className="brbc-time-content"
          onScroll={this.handleScroll}
        >
          <TimeGutterAllDay
            components={components}
            resources={memoizedResourcesResult}
            accessors={this.props.accessors}
          />
          <div className="brbc-time-content-event-list">
            {this.renderEvents(groupedEvents, memoizedResourcesResult)}
          </div>
        </div>
      </div>
    )
  }

  renderOverlay() {
    let {
      accessors,
      localizer,
      components,
      getters,
      selected,
      popupOffset,
      handleDragStart,
    } = this.props

    const onHide = () => this.setState({ overlay: null })
    if (!this.state.overlay) return null
    return (
      <PopOverlay
        overlay={this.state.overlay}
        accessors={accessors}
        localizer={localizer}
        components={components}
        getters={getters}
        selected={selected}
        popupOffset={popupOffset}
        ref={this.containerRef}
        handleKeyPressEvent={this.handleKeyPressEvent}
        handleSelectEvent={this.handleSelectEvent}
        handleDoubleClickEvent={this.handleDoubleClickEvent}
        handleDragStart={handleDragStart}
        overlayDisplay={this.overlayDisplay}
        onHide={onHide}
      />
    )
  }

  overlayDisplay = () => {
    this.setState({
      overlay: null,
    })
  }

  checkOverflow = () => {
    if (this._updatingOverflow) return

    const content = this.contentRef.current

    if (!content?.scrollHeight) return
    let isOverflowing = content.scrollHeight > content.clientHeight

    if (this.state.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true
      this.setState({ isOverflowing }, () => {
        this._updatingOverflow = false
      })
    }
  }

  memoizedResources = memoize(
    /**
     * @type {ResourcesFn<TEvent, TResource>}
     */
    (resources, accessors) => Resources(resources, accessors)
  )

  getContainer = () => {
    return this.containerRef.current
  }
}

TimeGridAllDay.propTypes = {
  events: PropTypes.array.isRequired,
  backgroundEvents: PropTypes.array.isRequired,
  resources: PropTypes.array,

  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  getNow: PropTypes.func.isRequired,

  showMultiDayTimes: PropTypes.bool,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  allDayMaxRows: PropTypes.number,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onNavigate: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onShowMore: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,

  dayLayoutAlgorithm: DayLayoutAlgorithmPropType,

  showAllEvents: PropTypes.bool,
  doShowMoreDrillDown: PropTypes.bool,

  popup: PropTypes.bool,
  handleDragStart: PropTypes.func,

  popupOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ]),
}
