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
 * @import * as types from "./TimeGutterAllDaySlot.types"
 * @import {RBCEvent, RBCResource} from "./misc.types"
 * */

/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template {NonNullable<unknown>} [TResource=RBCResource]
 * @param {types.TimeGutterAllDaySlotProps<TEvent, TResource>} props
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
