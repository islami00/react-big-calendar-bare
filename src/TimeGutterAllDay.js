/** @import * as R from 'react' */
/** @import * as types from 'react-big-calendar/lib/TimeGutterAllDay' */
/** @import {Event, Resource} from 'react-big-calendar' */
import React from 'react'
import clsx from 'clsx'
import TimeGutterAllDaySlot from './TimeGutterAllDaySlot'
import { forwardRefWithGenerics } from './misc'

/**
 * @template {NonNullable<unknown>} [TEvent=Event]
 * @template {NonNullable<unknown>} [TResource=Resource]
 * @param {types.TimeGutterAllDayProps<TEvent, TResource>} props
 * @param {R.Ref<HTMLDivElement>} ref Gutter Ref
 */
const TimeGutterAllDay = (props, ref) => {
  const { resources, components, accessors } = props
  const { timeGutterAllDayWrapper: TimeGutterWrapper } = components

  const TimeGutterAllDaySlotComponent =
    components.timeGutterAllDaySlot || TimeGutterAllDaySlot
  return (
    <TimeGutterWrapper resources={resources}>
      <div className="brbc-time-gutter" ref={ref}>
        {resources.map(([resourceId, resource], idx, arrayLen) => {
          const isLast = idx === arrayLen - 1
          return (
            <div
              key={resourceId.toString()}
              className={clsx('brbc-resource-row', isLast && 'brbc-last')}
            >
              <TimeGutterAllDaySlotComponent
                resource={resource}
                accessors={accessors}
              />
            </div>
          )
        })}
      </div>
    </TimeGutterWrapper>
  )
}

export default forwardRefWithGenerics(TimeGutterAllDay)
