/** @import HorizontalResourceFn, {HorizontalResourceProps} from "./HorizontalResource.types" */
import React from 'react'

import { navigate } from './utils/constants'

import TimeGridAllDay from './TimeGridAllDay'

/**
 * @template {NonNullable<unknown>} TEvent
 * @template {NonNullable<unknown>} TResource
 * @param {HorizontalResourceProps<TEvent, TResource>} props
 * @type {HorizontalResourceFn<TEvent, TResource>}
 */
function HorizontalResource(props) {
  let {
    date,
    localizer,
    min = localizer.startOf(new Date(), 'day'),
    max = localizer.endOf(new Date(), 'day'),
    scrollToTime = localizer.startOf(new Date(), 'day'),
    enableAutoScroll = true,
    ...rest
  } = props
  let currRange = React.useMemo(
    () => HorizontalResource.range(date, { localizer }),
    [date, localizer]
  )

  return (
    <TimeGridAllDay
      {...rest}
      range={currRange}
      eventOffset={15}
      localizer={localizer}
      min={min}
      max={max}
      scrollToTime={scrollToTime}
      enableAutoScroll={enableAutoScroll}
    />
  )
}

export default HorizontalResource

HorizontalResource.navigate = (date, action, { localizer }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'week')

    case navigate.NEXT:
      return localizer.add(date, 1, 'week')

    default:
      return date
  }
}

HorizontalResource.range = (date, { localizer }) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = localizer.startOf(date, 'week', firstOfWeek)
  let end = localizer.endOf(date, 'week', firstOfWeek)

  return localizer.range(start, end)
}

HorizontalResource.title = (date, { localizer }) => {
  let [start, ...rest] = HorizontalResource.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}
