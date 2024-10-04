/** @import {TimeGridHeaderAllDayProps} from "./TimeGridHeaderAllDay.types" */
/** @import {Component} from "react" */
/** @import {ViewRegisteryKey} from "./components.types" */
/** @import { RBCEvent, RBCResource } from "./misc.types" */
import PropTypes from 'prop-types'
import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import React from 'react'

import Header from './Header'
import { notify } from './utils/helpers'

/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template  {NonNullable<unknown>} [TResource=RBCResource]
 * @extends {Component<TimeGridHeaderAllDayProps<TEvent,TResource>>}
 */
class TimeGridHeaderAllDay extends React.Component {
  /**
   *
   * @param {Date} date
   * @param {ViewRegisteryKey} view
   * @param {React.MouseEvent} e
   */
  handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }
  /**
   * @param {Date[]} range
   */
  renderHeaderCells(range) {
    let {
      localizer,
      getDrilldownView,
      getNow,
      getters: { dayProp },
      components: { header: HeaderComponent = Header },
    } = this.props

    const today = getNow()

    return range.map((date, i) => {
      let drilldownView = getDrilldownView(date)
      let label = localizer.format(date, 'dayFormat')

      const { className, style } = dayProp(date)

      let header = (
        <HeaderComponent date={date} label={label} localizer={localizer} />
      )

      return (
        <div
          key={i}
          style={style}
          className={clsx(
            'rbc-header',
            className,
            localizer.isSameDate(date, today) && 'rbc-today'
          )}
        >
          {drilldownView ? (
            <button
              type="button"
              className="rbc-button-link"
              onClick={(e) => this.handleHeaderClick(date, drilldownView, e)}
            >
              {header}
            </button>
          ) : (
            <span>{header}</span>
          )}
        </div>
      )
    })
  }

  render() {
    let {
      rtl,
      range,
      isOverflowing,
      components: { timeGutterHeader: TimeGutterHeader },
    } = this.props

    /** @type {React.CSSProperties} */
    let style = {}
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize() - 1}px`
    }

    return (
      <div
        style={style}
        className={clsx('rbc-time-header', isOverflowing && 'rbc-overflowing')}
      >
        <div className="rbc-label brbc-time-gutter-header">
          {TimeGutterHeader && <TimeGutterHeader />}
        </div>
        <div className="rbc-time-header-content">
          <div
            className={`rbc-row rbc-time-header-cell${
              range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''
            }`}
          >
            {this.renderHeaderCells(range)}
          </div>
        </div>
      </div>
    )
  }
}

TimeGridHeaderAllDay.propTypes = {
  range: PropTypes.array.isRequired,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,

  rtl: PropTypes.bool,

  localizer: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,

  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
}

export default TimeGridHeaderAllDay
