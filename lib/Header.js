'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _propTypes = _interopRequireDefault(require('prop-types'))
var _react = _interopRequireDefault(require('react'))
/** @import {HeaderProps} from "react-big-calendar" */

/**
 * @param {HeaderProps} props
 */
var Header = function Header(_ref) {
  var label = _ref.label
  return /*#__PURE__*/ _react.default.createElement(
    'span',
    {
      role: 'columnheader',
      'aria-sort': 'none',
    },
    label
  )
}
Header.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        label: _propTypes.default.node,
      }
    : {}
var _default = (exports.default = Header)
