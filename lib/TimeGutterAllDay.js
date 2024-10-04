'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
)
var _react = _interopRequireDefault(require('react'))
var _clsx = _interopRequireDefault(require('clsx'))
var _TimeGutterAllDaySlot = _interopRequireDefault(
  require('./TimeGutterAllDaySlot')
)
var _misc = require('./misc')
/** @import * as R from 'react' */
/** @import * as types from './TimeGutterAllDay.types' */
/** @import {RBCEvent, RBCResource} from './misc.types' */

/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template {NonNullable<unknown>} [TResource=RBCResource]
 * @param {types.TimeGutterAllDayProps<TEvent, TResource>} props
 * @param {R.Ref<HTMLDivElement>} ref Gutter Ref
 */
var TimeGutterAllDay = function TimeGutterAllDay(props, ref) {
  var resources = props.resources,
    components = props.components,
    accessors = props.accessors
  var TimeGutterWrapper = components.timeGutterAllDayWrapper
  var TimeGutterAllDaySlotComponent =
    components.timeGutterAllDaySlot || _TimeGutterAllDaySlot.default
  return /*#__PURE__*/ _react.default.createElement(
    TimeGutterWrapper,
    {
      resources: resources,
    },
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'brbc-time-gutter',
        ref: ref,
      },
      resources.map(function (_ref, idx, arrayLen) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          resourceId = _ref2[0],
          resource = _ref2[1]
        var isLast = idx === arrayLen - 1
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            key: resourceId.toString(),
            className: (0, _clsx.default)(
              'brbc-resource-row',
              isLast && 'brbc-last'
            ),
          },
          /*#__PURE__*/ _react.default.createElement(
            TimeGutterAllDaySlotComponent,
            {
              resource: resource,
              accessors: accessors,
            }
          )
        )
      })
    )
  )
}
var _default = (exports.default = (0, _misc.forwardRefWithGenerics)(
  TimeGutterAllDay
))
