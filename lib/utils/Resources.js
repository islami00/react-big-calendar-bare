'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.NONE = void 0
exports.default = Resources
/**
 * @import * as types from './Resources.types'
 * @import {CalendarAccessors, RBCResource, RBCEvent} from '../misc.types'
 * */
var NONE = (exports.NONE = {})

/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template {NonNullable<unknown>} [TResource=RBCResource]
 *  @param { TResource[] | undefined} resources
 *  @param {CalendarAccessors<TEvent, TResource>} accessors
 *  @returns {types.ResourcesFnReturns<TEvent, TResource>}
 */
function Resources(resources, accessors) {
  return {
    map: function map(fn) {
      // REASON: This doesn't render anything in the time view when an empty list is passed to resources, even if events exist
      if (!resources || resources.length === 0) {
        return [fn([NONE, null], 0, 1)]
      }
      return resources.map(function (resource, idx, array) {
        return fn([accessors.resourceId(resource), resource], idx, array.length)
      })
    },
    groupEvents: function groupEvents(events) {
      var eventsByResource = new Map()
      if (!resources) {
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events)
        return eventsByResource
      }
      events.forEach(function (event) {
        var id = accessors.resource(event) || NONE
        if (Array.isArray(id)) {
          id.forEach(function (item) {
            var resourceEvents = eventsByResource.get(item) || []
            resourceEvents.push(event)
            eventsByResource.set(item, resourceEvents)
          })
        } else {
          var resourceEvents = eventsByResource.get(id) || []
          resourceEvents.push(event)
          eventsByResource.set(id, resourceEvents)
        }
      })
      return eventsByResource
    },
  }
}
