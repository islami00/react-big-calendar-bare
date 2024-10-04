'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
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
var _clsx = _interopRequireDefault(require('clsx'))
var _scrollbarSize = _interopRequireDefault(
  require('dom-helpers/scrollbarSize')
)
var _react = _interopRequireDefault(require('react'))
var _Header = _interopRequireDefault(require('./Header'))
var _helpers = require('./utils/helpers')
/** @import {TimeGridHeaderAllDayProps} from "./TimeGridHeaderAllDay.types" */
/** @import {Component} from "react" */
/** @import {ViewRegisteryKey} from "./components.types" */
/** @import { RBCEvent, RBCResource } from "./misc.types" */
/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template  {NonNullable<unknown>} [TResource=RBCResource]
 * @extends {Component<TimeGridHeaderAllDayProps<TEvent,TResource>>}
 */
var TimeGridHeaderAllDay = /*#__PURE__*/ (function (_React$Component) {
  function TimeGridHeaderAllDay() {
    var _this
    ;(0, _classCallCheck2.default)(this, TimeGridHeaderAllDay)
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }
    _this = (0, _callSuper2.default)(
      this,
      TimeGridHeaderAllDay,
      [].concat(args)
    )
    /**
     *
     * @param {Date} date
     * @param {ViewRegisteryKey} view
     * @param {React.MouseEvent} e
     */
    _this.handleHeaderClick = function (date, view, e) {
      e.preventDefault()
      ;(0, _helpers.notify)(_this.props.onDrillDown, [date, view])
    }
    return _this
  }
  ;(0, _inherits2.default)(TimeGridHeaderAllDay, _React$Component)
  return (0, _createClass2.default)(TimeGridHeaderAllDay, [
    {
      key: 'renderHeaderCells',
      value:
        /**
         * @param {Date[]} range
         */
        function renderHeaderCells(range) {
          var _this2 = this
          var _this$props = this.props,
            localizer = _this$props.localizer,
            getDrilldownView = _this$props.getDrilldownView,
            getNow = _this$props.getNow,
            dayProp = _this$props.getters.dayProp,
            _this$props$component = _this$props.components.header,
            HeaderComponent =
              _this$props$component === void 0
                ? _Header.default
                : _this$props$component
          var today = getNow()
          return range.map(function (date, i) {
            var drilldownView = getDrilldownView(date)
            var label = localizer.format(date, 'dayFormat')
            var _dayProp = dayProp(date),
              className = _dayProp.className,
              style = _dayProp.style
            var header = /*#__PURE__*/ _react.default.createElement(
              HeaderComponent,
              {
                date: date,
                label: label,
                localizer: localizer,
              }
            )
            return /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                key: i,
                style: style,
                className: (0, _clsx.default)(
                  'rbc-header',
                  className,
                  localizer.isSameDate(date, today) && 'rbc-today'
                ),
              },
              drilldownView
                ? /*#__PURE__*/ _react.default.createElement(
                    'button',
                    {
                      type: 'button',
                      className: 'rbc-button-link',
                      onClick: function onClick(e) {
                        return _this2.handleHeaderClick(date, drilldownView, e)
                      },
                    },
                    header
                  )
                : /*#__PURE__*/ _react.default.createElement(
                    'span',
                    null,
                    header
                  )
            )
          })
        },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props2 = this.props,
          rtl = _this$props2.rtl,
          range = _this$props2.range,
          isOverflowing = _this$props2.isOverflowing,
          TimeGutterHeader = _this$props2.components.timeGutterHeader

        /** @type {React.CSSProperties} */
        var style = {}
        if (isOverflowing) {
          style[rtl ? 'marginLeft' : 'marginRight'] = ''.concat(
            (0, _scrollbarSize.default)() - 1,
            'px'
          )
        }
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            style: style,
            className: (0, _clsx.default)(
              'rbc-time-header',
              isOverflowing && 'rbc-overflowing'
            ),
          },
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'rbc-label brbc-time-gutter-header',
            },
            TimeGutterHeader &&
              /*#__PURE__*/ _react.default.createElement(TimeGutterHeader, null)
          ),
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'rbc-time-header-content',
            },
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-row rbc-time-header-cell'.concat(
                  range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''
                ),
              },
              this.renderHeaderCells(range)
            )
          )
        )
      },
    },
  ])
})(_react.default.Component)
var _default = (exports.default = TimeGridHeaderAllDay)
