import type {
  DayLayoutAlgorithm,
  DayLayoutFunction,
  DayPropGetter,
  EventPropGetter,
  NavigateAction,
  SlotGroupPropGetter,
  SlotPropGetter,
} from 'react-big-calendar'
import type { DateLocalizer } from './localizer.types'
import type * as React from 'react'
export type PropTypeFunc = (...args: any[]) => any

export type DateRangeList = [Date, ...Date[]]

export type ResourceIdOptions = string | number // must be unique

/** Alternatively, resourceIdAccessor and resourceTitleAccessor can be used instead */
export interface RBCResource {
  id: ResourceIdOptions
  title: string
}

export interface RBCEvent {
  allDay?: boolean | undefined
  title?: React.ReactNode | undefined
  /** optional if you specify an accessor */
  start?: Date | undefined
  /** optional if you specify an accessor */
  end?: Date | undefined
  resourceId?: string | number
}

interface PropsWithLocalizer {
  localizer: DateLocalizer
}
export type ViewRangeFn = (
  date: Date,
  props: PropsWithLocalizer
) => DateRangeList

interface NavigateProps {
  localizer: DateLocalizer
}

export type ViewNavigate = (
  date: Date,
  action: NavigateAction,
  props: NavigateProps
) => Date
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export interface ForwardRefFunction {
  <T, P = {}>(
    render: (
      props: React.PropsWithoutRef<P>,
      ref: React.ForwardedRef<T>
    ) => React.ReactElement | null
  ): (
    props: React.PropsWithoutRef<P> & React.RefAttributes<T>
  ) => React.ReactNode | null
}

export type HandleViewNavigateFn = (value: NavigateAction, date?: Date) => void

export type DaylayoutAlgorithmOptions = DayLayoutAlgorithm | DayLayoutFunction

export interface PopupOffsetObject {
  x: number
  y: number
}
export type PopupOffsetOptions = number | PopupOffsetObject
type RequiredFn<T extends PropTypeFunc> = (
  ...args: Parameters<T>
) => NonNullable<ReturnType<T>>

// Not used anywhere for some reason
type BackgroundEventPropGetter = (...args: any[]) => NonNullable<unknown>

export interface CalendarGetters<TEvent extends object = RBCEvent> {
  eventProp: RequiredFn<EventPropGetter<TEvent>>
  backgroundEventProp: BackgroundEventPropGetter
  slotProp: RequiredFn<SlotPropGetter>
  slotGroupProp: RequiredFn<SlotGroupPropGetter>
  dayProp: RequiredFn<DayPropGetter>
}

export interface CalendarAccessors<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> {
  title: (event: TEvent) => string
  tooltip: (event: TEvent) => string
  end: (event: TEvent) => Date
  start: (event: TEvent) => Date
  allDay: (data: TEvent) => boolean
  resource: (data: TEvent) => TResource | null | undefined
  resourceId: (data: TResource) => ResourceIdOptions
  resourceTitle: (data: TResource | null) => string
}
