import type {
  CalendarComponentsWithDefaults,
  CalendarViewComponentProps,
} from './components.types'
import type { DateLocalizer } from './localizer.types'
import type { CalendarGetters, RBCEvent, RBCResource } from './misc.types'
import type * as React from 'react'

export interface TimeGridHeaderAllDayProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends CalendarViewComponentProps {
  range: Date[]
  rtl?: boolean
  getNow: () => Date
  isOverflowing: boolean | null
  localizer: DateLocalizer
  components: CalendarComponentsWithDefaults<TEvent, TResource>
  getters: CalendarGetters<TEvent>
}

declare class TimeGridHeaderAllDay<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends React.Component<TimeGridHeaderAllDayProps<TEvent, TResource>> {}

export default TimeGridHeaderAllDay
