import type * as React from 'react'
import type { TimeGridProps } from 'react-big-calendar'
import type {
  CalendarAccessors,
  CalendarGetters,
  DaylayoutAlgorithmOptions,
  HandleViewNavigateFn,
  PopupOffsetOptions,
  PropTypeFunc,
  RBCEvent,
  RBCResource,
} from './misc.types'
import type { CalendarComponentsWithDefaults } from './components.types'
import type { DateLocalizer } from './localizer.types'
import type { CalendarViewComponentProps } from './components.types'
import { OverlayProps } from './PopOverlay.types'

export interface TimeGridAllDayState<TEvent extends object = RBCEvent> {
  overlay?: OverlayProps<TEvent> | null
  isOverflowing: boolean | null
}

type CommonProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> = Pick<
  TimeGridProps<TEvent, TResource>,
  | 'accessors'
  | 'resources'
  | 'min'
  | 'max'
  | 'showMultiDayTimes'
  | 'rtl'
  | 'selected'
  | 'selectable'
  | 'longPressThreshold'
  | 'onSelectSlot'
  | 'onSelectEnd'
  | 'onSelectStart'
  | 'onSelectEvent'
  | 'onDoubleClickEvent'
  | 'onKeyPressEvent'
>
export interface TimeGridAllDayProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends CommonProps<TEvent, TResource>,
    CalendarViewComponentProps {
  events: TEvent[]
  backgroundEvents: TEvent[]
  resources?: TResource[]

  range: Date[]
  getNow: () => Date

  resizable?: boolean

  accessors: CalendarAccessors<TEvent, TResource>
  getters: CalendarGetters<TEvent>
  localizer: DateLocalizer

  allDayMaxRows?: number

  onNavigate?: HandleViewNavigateFn
  onShowMore?: PropTypeFunc

  dayLayoutAlgorithm?: DaylayoutAlgorithmOptions
  showAllEvents?: boolean
  doShowMoreDrillDown?: boolean

  popup?: boolean
  handleDragStart?: PropTypeFunc

  popupOffset?: PopupOffsetOptions

  components: CalendarComponentsWithDefaults<TEvent, TResource>
}

declare class TimeGridAllDay<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends React.Component<
  TimeGridAllDayProps<TEvent, TResource>,
  TimeGridAllDayState<TEvent>
> {}

export default TimeGridAllDay
