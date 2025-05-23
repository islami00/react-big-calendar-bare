'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getSlotMetrics = getSlotMetrics
var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
)
var _memoizeOne = _interopRequireDefault(require('memoize-one'))
var _eventLevels2 = require('./eventLevels')
/**
 * @import * as types from 'react-big-calendar/lib/utils/DateSlotMetrics'
 * @import {RowSegment} from 'react-big-calendar/lib/utils/eventLevels'
 *  */

/**
 * @param {RowSegment} seg
 * @param {number} slot
 */
var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot
}
var isEqual = function isEqual(a, b) {
  return a[0].range === b[0].range && a[0].events === b[0].events
}

/**
 * @returns {types.GetSlotMetrics}
 */
function getSlotMetrics() {
  return (0, _memoizeOne.default)(
    /**
     * @type  {types.GetSlotMetrics}
     */
    function (options) {
      var range = options.range,
        events = options.events,
        maxRows = options.maxRows,
        minRows = options.minRows,
        accessors = options.accessors,
        localizer = options.localizer
      var _endOfRange = (0, _eventLevels2.endOfRange)({
          dateRange: range,
          localizer: localizer,
        }),
        first = _endOfRange.first,
        last = _endOfRange.last
      var segments = events.map(function (evt) {
        return (0,
        _eventLevels2.eventSegments)(evt, range, accessors, localizer)
      })
      var _eventLevels = (0, _eventLevels2.eventLevels)(
          segments,
          Math.max(maxRows - 1, 1)
        ),
        levels = _eventLevels.levels,
        extra = _eventLevels.extra
      // Subtract 1 from minRows to not include showMore button row when
      // it would be rendered
      var minEventRows = extra.length > 0 ? minRows - 1 : minRows
      while (levels.length < minEventRows) levels.push([])
      return {
        first: first,
        last: last,
        levels: levels,
        extra: extra,
        range: range,
        slots: range.length,
        clone: function clone(args) {
          var metrics = getSlotMetrics()
          return metrics(
            (0, _objectSpread2.default)(
              (0, _objectSpread2.default)({}, options),
              args
            )
          )
        },
        getDateForSlot: function getDateForSlot(slotNumber) {
          return range[slotNumber]
        },
        getSlotForDate: function getSlotForDate(date) {
          return range.find(function (r) {
            return localizer.isSameDate(r, date)
          })
        },
        getEventsForSlot: function getEventsForSlot(slot) {
          return segments
            .filter(function (seg) {
              return isSegmentInSlot(seg, slot)
            })
            .map(function (seg) {
              return seg.event
            })
        },
        continuesPrior: function continuesPrior(event) {
          return localizer.continuesPrior(accessors.start(event), first)
        },
        continuesAfter: function continuesAfter(event) {
          var start = accessors.start(event)
          var end = accessors.end(event)
          return localizer.continuesAfter(start, end, last)
        },
      }
    },
    isEqual
  )
}
