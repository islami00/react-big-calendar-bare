'use strict'

var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
)
var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
)
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)
var _callSuper2 = _interopRequireDefault(
  require('@babel/runtime/helpers/callSuper')
)
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)
var _react = _interopRequireWildcard(require('react'))
var _clsx = _interopRequireDefault(require('clsx'))
var animationFrame = _interopRequireWildcard(
  require('dom-helpers/animationFrame')
)
var _memoizeOne = _interopRequireDefault(require('memoize-one'))
var _TimeGridHeaderAllDay = _interopRequireDefault(
  require('./TimeGridHeaderAllDay.js')
)
var _PopOverlay = _interopRequireDefault(require('./PopOverlay'))
var _position = _interopRequireDefault(require('dom-helpers/position'))
var _constants = require('./utils/constants')
var _eventLevels = require('./utils/eventLevels')
var _helpers = require('./utils/helpers')
var _Resources = _interopRequireDefault(require('./utils/Resources'))
var _propTypes = require('./utils/propTypes')
var _DateContentRow = _interopRequireDefault(require('./DateContentRow'))
var _TimeGutterAllDay = _interopRequireDefault(require('./TimeGutterAllDay'))
/**
 * @import TimeGridAllDayClass,  {TimeGridAllDayProps, TimeGridAllDayState} from './TimeGridAllDay.types'
 * @import {OnSelectSlotArgs} from './BackgroundCells.types'
 * @import {ResourcesFn, ResourcesFnReturns, ResourcesFnGroupedEvents} from './utils/Resources.types'
 * @import {RBCEvent, RBCResource} from './misc.types'
 */
// import TimeGutter from './TimeGutter'
/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template  {NonNullable<unknown>} [TResource=RBCResource]
 * @extends {Component<TimeGridAllDayProps<TEvent, TResource>, TimeGridAllDayState<TEvent>>}
 * @type {typeof TimeGridAllDayClass}
 * */
var TimeGridAllDay = (exports.default = /*#__PURE__*/ (function (_Component) {
  /**
   *
   * @param {TimeGridAllDayProps<TEvent, TResource>} props
   */
  function TimeGridAllDay(props) {
    var _this
    ;(0, _classCallCheck2.default)(this, TimeGridAllDay)
    _this = (0, _callSuper2.default)(this, TimeGridAllDay, [props])

    /** @type {TimeGridAllDayState<TEvent>} */
    /**
     *
     * @param {React.UIEvent<HTMLDivElement>} e
     */
    _this.handleScroll = function (e) {
      if (_this.scrollRef.current) {
        _this.scrollRef.current.scrollLeft = e.target.scrollLeft
      }
    }
    _this.handleResize = function () {
      animationFrame.cancel(_this.rafHandle)
      _this.rafHandle = animationFrame.request(_this.checkOverflow)
    }
    _this.handleKeyPressEvent = function () {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }
      ;(0, _helpers.notify)(_this.props.onKeyPressEvent, args)
    }
    _this.handleSelectEvent = function () {
      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2]
      }
      //cancel any pending selections so only the event click goes through.

      ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
    }
    _this.handleDoubleClickEvent = function () {
      for (
        var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
        _key3 < _len3;
        _key3++
      ) {
        args[_key3] = arguments[_key3]
      }
      ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
    }
    _this.handleShowMore = function (events, date, cell, slot, target) {
      var _this$props = _this.props,
        popup = _this$props.popup,
        onDrillDown = _this$props.onDrillDown,
        onShowMore = _this$props.onShowMore,
        getDrilldownView = _this$props.getDrilldownView,
        doShowMoreDrillDown = _this$props.doShowMoreDrillDown
      if (popup) {
        var position = (0, _position.default)(cell, _this.containerRef.current)
        _this.setState({
          overlay: {
            date: date,
            events: events,
            position: (0, _objectSpread2.default)(
              (0, _objectSpread2.default)({}, position),
              {},
              {
                width: '200px',
              }
            ),
            target: target,
          },
        })
      } else if (doShowMoreDrillDown) {
        ;(0, _helpers.notify)(onDrillDown, [
          date,
          getDrilldownView(date) || _constants.views.DAY,
        ])
      }
      ;(0, _helpers.notify)(onShowMore, [events, date, slot])
    }
    /**
     * @param {Date[]} slots
     * @param {OnSelectSlotArgs} slotInfo
     */
    _this.handleSelectSlot = function (slots, slotInfo) {
      var onSelectSlot = _this.props.onSelectSlot
      var start = new Date(slots[0])
      var end = new Date(slots[slots.length - 1])
      end.setDate(slots[slots.length - 1].getDate() + 1)
      ;(0, _helpers.notify)(onSelectSlot, {
        slots: slots,
        start: start,
        end: end,
        action: slotInfo.action,
        resourceId: slotInfo.resourceId,
      })
    }
    _this.overlayDisplay = function () {
      _this.setState({
        overlay: null,
      })
    }
    _this.checkOverflow = function () {
      if (_this._updatingOverflow) return
      var content = _this.contentRef.current
      if (!(content !== null && content !== void 0 && content.scrollHeight))
        return
      var isOverflowing = content.scrollHeight > content.clientHeight
      if (_this.state.isOverflowing !== isOverflowing) {
        _this._updatingOverflow = true
        _this.setState(
          {
            isOverflowing: isOverflowing,
          },
          function () {
            _this._updatingOverflow = false
          }
        )
      }
    }
    _this.memoizedResources = (0, _memoizeOne.default)(
      /**
       * @type {ResourcesFn<TEvent, TResource>}
       */
      function (resources, accessors) {
        return (0, _Resources.default)(resources, accessors)
      }
    )
    _this.getContainer = function () {
      return _this.containerRef.current
    }
    _this.state = {
      isOverflowing: null,
    }
    _this.scrollRef = /*#__PURE__*/ _react.default.createRef()
    _this.contentRef = /*#__PURE__*/ _react.default.createRef()
    _this.containerRef = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  ;(0, _inherits2.default)(TimeGridAllDay, _Component)
  return (0, _createClass2.default)(TimeGridAllDay, [
    {
      key: 'getSnapshotBeforeUpdate',
      value: function getSnapshotBeforeUpdate() {
        this.checkOverflow()
        return null
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('resize', this.handleResize)
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
        animationFrame.cancel(this.rafHandle)
      },
    },
    {
      key: 'renderEvents',
      value:
        /**
         * @param {ResourcesFnGroupedEvents<TEvent>} groupedEvents
         * @param {ResourcesFnReturns<TEvent, TResource>} memoizedResourcesResult
         */
        function renderEvents(groupedEvents, memoizedResourcesResult) {
          var _this2 = this
          var _this$props2 = this.props,
            rtl = _this$props2.rtl,
            resizable = _this$props2.resizable,
            selectable = _this$props2.selectable,
            getters = _this$props2.getters,
            getNow = _this$props2.getNow,
            localizer = _this$props2.localizer,
            accessors = _this$props2.accessors,
            components = _this$props2.components,
            range = _this$props2.range
          return memoizedResourcesResult.map(function (_ref, idx, arrayLen) {
            var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
              resourceId = _ref2[0]
            var isLast = idx === arrayLen - 1
            var events = groupedEvents.get(resourceId) || []
            return /*#__PURE__*/ _react.default.createElement(
              _DateContentRow.default,
              {
                getNow: getNow,
                key: ''.concat(resourceId),
                container: _this2.getContainer,
                rtl: rtl,
                minRows: 1,
                // Expect styles to only have two rows, otherwise use a similar method as Month to change it
                maxRows: isLast ? Infinity : 2,
                range: range,
                events: events,
                resourceId: resourceId,
                className: (0, _clsx.default)(
                  'brbc-time-content-row brbc-resource-row',
                  isLast && 'brbc-last'
                ),
                selectable: selectable,
                selected: _this2.props.selected,
                components: components,
                accessors: accessors,
                getters: getters,
                localizer: localizer,
                onSelect: _this2.handleSelectEvent,
                onShowMore: _this2.handleShowMore,
                onDoubleClick: _this2.handleDoubleClickEvent,
                onKeyPress: _this2.handleKeyPressEvent,
                onSelectSlot: _this2.handleSelectSlot,
                longPressThreshold: _this2.props.longPressThreshold,
                resizable: resizable,
              }
            )
          })
        },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props3 = this.props,
          events = _this$props3.events,
          backgroundEvents = _this$props3.backgroundEvents,
          range = _this$props3.range,
          rtl = _this$props3.rtl,
          getNow = _this$props3.getNow,
          resources = _this$props3.resources,
          components = _this$props3.components,
          accessors = _this$props3.accessors,
          getters = _this$props3.getters,
          localizer = _this$props3.localizer,
          showMultiDayTimes = _this$props3.showMultiDayTimes
        var start = range[0],
          end = range[range.length - 1]
        this.slots = range.length
        /**
         * @type {TEvent[]} allDayEvents
         * */
        var allDayEvents = [],
          /**
           * @type {TEvent[]} allDayEvents
           * */
          rangeEvents = [],
          /**
           * @type {TEvent[]} allDayEvents
           * */
          rangeBackgroundEvents = []
        events.forEach(function (event) {
          if (
            (0, _eventLevels.inRange)(event, start, end, accessors, localizer)
          ) {
            var eStart = accessors.start(event),
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
        backgroundEvents.forEach(function (event) {
          if (
            (0, _eventLevels.inRange)(event, start, end, accessors, localizer)
          ) {
            rangeBackgroundEvents.push(event)
          }
        })
        allDayEvents.sort(function (a, b) {
          return (0, _eventLevels.sortEvents)(a, b, accessors, localizer)
        })
        var memoizedResourcesResult = this.memoizedResources(
          resources,
          accessors
        )
        var groupedEvents = memoizedResourcesResult.groupEvents(allDayEvents)
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: (0, _clsx.default)('brbc-time-view-all-day-inline'),
            ref: this.containerRef,
          },
          /*#__PURE__*/ _react.default.createElement(
            _TimeGridHeaderAllDay.default,
            {
              range: range,
              rtl: rtl,
              getNow: getNow,
              isOverflowing: this.state.isOverflowing,
              localizer: localizer,
              components: components,
              getters: getters,
              onDrillDown: this.props.onDrillDown,
              getDrilldownView: this.props.getDrilldownView,
            }
          ),
          this.props.popup && this.renderOverlay(),
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              ref: this.contentRef,
              className: 'brbc-time-content',
              onScroll: this.handleScroll,
            },
            /*#__PURE__*/ _react.default.createElement(
              _TimeGutterAllDay.default,
              {
                components: components,
                resources: memoizedResourcesResult,
                accessors: this.props.accessors,
              }
            ),
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'brbc-time-content-event-list',
              },
              this.renderEvents(groupedEvents, memoizedResourcesResult)
            )
          )
        )
      },
    },
    {
      key: 'renderOverlay',
      value: function renderOverlay() {
        var _this3 = this
        var _this$props4 = this.props,
          accessors = _this$props4.accessors,
          localizer = _this$props4.localizer,
          components = _this$props4.components,
          getters = _this$props4.getters,
          selected = _this$props4.selected,
          popupOffset = _this$props4.popupOffset,
          handleDragStart = _this$props4.handleDragStart
        var onHide = function onHide() {
          return _this3.setState({
            overlay: null,
          })
        }
        if (!this.state.overlay) return null
        return /*#__PURE__*/ _react.default.createElement(_PopOverlay.default, {
          overlay: this.state.overlay,
          accessors: accessors,
          localizer: localizer,
          components: components,
          getters: getters,
          selected: selected,
          popupOffset: popupOffset,
          ref: this.containerRef,
          handleKeyPressEvent: this.handleKeyPressEvent,
          handleSelectEvent: this.handleSelectEvent,
          handleDoubleClickEvent: this.handleDoubleClickEvent,
          handleDragStart: handleDragStart,
          overlayDisplay: this.overlayDisplay,
          onHide: onHide,
        })
      },
    },
  ])
})(_react.Component))
