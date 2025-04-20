/** @import  {HorizontalResourceProps} from "react-big-calendar/lib/HorizontalResource" */
import React from 'react'

import { navigate } from './utils/constants'

import TimeGridAllDay from './TimeGridAllDay'

/**
 * @template {NonNullable<unknown>} TEvent
 * @template {NonNullable<unknown>} TResource
 * @param {HorizontalResourceProps<TEvent, TResource>} props
 */
function HorizontalResource(props) {
  let {
    date,
    localizer,
    min = localizer.startOf(new Date(), 'day'),
    max = localizer.endOf(new Date(), 'day'),
    rangeFn = HorizontalResource.range,
    ...rest
  } = props
  let currRange = React.useMemo(
    () => rangeFn(date, { localizer }),
    [date, localizer, rangeFn]
  )

  return (
    <TimeGridAllDay
      {...rest}
      range={currRange}
      eventOffset={15}
      localizer={localizer}
      min={min}
      max={max}
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
