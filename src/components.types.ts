import type { Components, ViewStatic } from 'react-big-calendar'
import type { DateLocalizer } from './localizer.types'
import type { RBCEvent, RBCResource, WithRequired } from './misc.types'
import type * as React from 'react'
import type { TimeGutterAllDaySlotProps } from './TimeGutterAllDaySlot.types'
import type { ResourcesFnReturns } from './utils/Resources.types'
import type { HeaderProps } from './Header.types'
export interface TimeSlotWrapperProps<TResource extends object = RBCResource> {
  children: React.ReactNode
  value: Date
  resource: null | TResource
}

export interface TimeGutterAllDayWrapperProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> {
  children: React.ReactNode
  resources: ResourcesFnReturns<TEvent, TResource>
}

export interface CalendarViewComponentProps {
  onDrillDown: (date: Date, view: ViewRegisteryKey) => void
  getDrilldownView: (targetDate: Date) => ViewRegisteryKey | null
}
export interface DefaultViews {
  month: ViewComponent
  week: ViewComponent
  work_week: ViewComponent
  day: ViewComponent
  agenda: ViewComponent
}
type DefaultViewsOptionalBoolean = {
  [K in keyof DefaultViews]?: true | DefaultViews[K]
}
export interface ViewRegistery extends DefaultViewsOptionalBoolean {}
export type ViewRegisteryKey = keyof ViewRegistery // Allow custom values views via decl merging

export interface ViewComponentStaticRangeArgs {
  localizer: DateLocalizer
}

export interface ViewComponentStatic extends ViewStatic {
  // Fixed props because it's called in the calendar for all like this
  range(date: Date, args: ViewComponentStaticRangeArgs): Date[]
}

export interface ViewFunctionalComponent
  extends ViewComponentStatic,
    React.FunctionComponent<CalendarViewComponentProps> {}

export interface ViewClassComponent
  extends ViewComponentStatic,
    React.ComponentClass<CalendarViewComponentProps> {}

export type ViewComponent = ViewFunctionalComponent | ViewClassComponent

type SharedCalendarComponents<
  TEvent extends object,
  TResource extends object
> = Omit<Components<TEvent, TResource>, 'timeSlotWrapper' | 'header'>

export interface CalendarComponents<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends SharedCalendarComponents<TEvent, TResource> {
  timeSlotWrapper?:
    | React.ComponentType<TimeSlotWrapperProps<TResource>>
    | undefined
  timeGutterAllDaySlot?: React.ComponentType<
    TimeGutterAllDaySlotProps<TEvent, TResource>
  >
  header?: React.ComponentType<HeaderProps>

  backgroundEventWrapper?: React.ComponentType
  weekWrapper?: React.ComponentType
  timeGutterAllDayWrapper?: React.ComponentType<
    TimeGutterAllDayWrapperProps<TEvent, TResource>
  >
}

export type CalendarComponentsWithDefaults<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> = WithRequired<
  CalendarComponents<TEvent, TResource>,
  | 'eventWrapper'
  | 'backgroundEventWrapper'
  | 'eventContainerWrapper'
  | 'dateCellWrapper'
  | 'weekWrapper'
  | 'timeSlotWrapper'
  | 'timeGutterAllDayWrapper'
>
