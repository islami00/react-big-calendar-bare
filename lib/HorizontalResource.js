'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _toArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toArray')
)
var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
)
var _react = _interopRequireDefault(require('react'))
var _constants = require('./utils/constants')
var _TimeGridAllDay = _interopRequireDefault(require('./TimeGridAllDay'))
var _excluded = ['date', 'localizer', 'min', 'max', 'rangeFn']
/** @import  {HorizontalResourceProps} from "react-big-calendar/lib/HorizontalResource" */
/**
 * @template {NonNullable<unknown>} TEvent
 * @template {NonNullable<unknown>} TResource
 * @param {HorizontalResourceProps<TEvent, TResource>} props
 */
function HorizontalResource(props) {
  var date = props.date,
    localizer = props.localizer,
    _props$min = props.min,
    min =
      _props$min === void 0 ? localizer.startOf(new Date(), 'day') : _props$min,
    _props$max = props.max,
    max =
      _props$max === void 0 ? localizer.endOf(new Date(), 'day') : _props$max,
    _props$rangeFn = props.rangeFn,
    rangeFn =
      _props$rangeFn === void 0 ? HorizontalResource.range : _props$rangeFn,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded)
  var currRange = _react.default.useMemo(
    function () {
      return rangeFn(date, {
        localizer: localizer,
      })
    },
    [date, localizer, rangeFn]
  )
  return /*#__PURE__*/ _react.default.createElement(
    _TimeGridAllDay.default,
    Object.assign({}, rest, {
      range: currRange,
      eventOffset: 15,
      localizer: localizer,
      min: min,
      max: max,
    })
  )
}
var _default = (exports.default = HorizontalResource)
HorizontalResource.navigate = function (date, action, _ref) {
  var localizer = _ref.localizer
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return localizer.add(date, -1, 'week')
    case _constants.navigate.NEXT:
      return localizer.add(date, 1, 'week')
    default:
      return date
  }
}
HorizontalResource.range = function (date, _ref2) {
  var localizer = _ref2.localizer
  var firstOfWeek = localizer.startOfWeek()
  var start = localizer.startOf(date, 'week', firstOfWeek)
  var end = localizer.endOf(date, 'week', firstOfWeek)
  return localizer.range(start, end)
}
HorizontalResource.title = function (date, _ref3) {
  var localizer = _ref3.localizer
  var _HorizontalResource$r = HorizontalResource.range(date, {
      localizer: localizer,
    }),
    _HorizontalResource$r2 = (0, _toArray2.default)(_HorizontalResource$r),
    start = _HorizontalResource$r2[0],
    rest = _HorizontalResource$r2.slice(1)
  return localizer.format(
    {
      start: start,
      end: rest.pop(),
    },
    'dayRangeHeaderFormat'
  )
}
