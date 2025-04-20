'use strict'

var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var React = _interopRequireWildcard(require('react'))
var _misc = require('./misc')
/**
 * @import * as rbc from "react-big-calendar"
 * @import {TimeGutterAllDaySlotProps} from "react-big-calendar/lib/TimeGutterAllDaySlot"
 * */

/**
 * @template {NonNullable<unknown>} [TEvent=rbc.Event]
 * @template {NonNullable<unknown>} [TResource=rbc.Resource]
 * @param {TimeGutterAllDaySlotProps<TEvent, TResource>} props
 * @param {React.Ref<any>} ref
 */
function TimeGutterAllDaySlot(props, ref) {
  var accessors = props.accessors,
    resource = props.resource
  return /*#__PURE__*/ React.createElement(
    'span',
    {
      className: 'rbc-label',
      ref: ref,
    },
    accessors.resourceTitle(resource)
  )
}
var _default = (exports.default = (0, _misc.forwardRefWithGenerics)(
  TimeGutterAllDaySlot
))
