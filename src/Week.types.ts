import type * as React from 'react'
import type { NavigateAction } from 'react-big-calendar'
import type {
  OnSelectSlotArgs,
  SelectableOptions,
} from './BackgroundCells.types'
import type {
  CalendarComponentsWithDefaults,
  CalendarViewComponentProps,
  ViewComponentStatic,
} from './components.types'
import type { DateLocalizer } from './localizer.types'
import type {
  DaylayoutAlgorithmOptions,
  HandleViewNavigateFn,
  PopupOffsetOptions,
  PropTypeFunc,
  RBCEvent,
  RBCResource,
} from './misc.types'

export interface RBCWeekProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource[]
> extends CalendarViewComponentProps {
  date: Date

  events: TEvent[]
  backgroundEvents: TEvent[]
  resources?: TResource[]

  step?: number
  timeslots?: number
  range?: Date[]
  min?: Date
  max?: Date
  getNow: () => Date

  scrollToTime?: Date
  enableAutoScroll?: boolean
  showMultiDayTimes?: boolean

  rtl?: boolean
  resizable?: boolean
  width?: number

  accessors: object
  components: CalendarComponentsWithDefaults<TEvent, TResource>
  getters: object
  localizer: DateLocalizer

  allDayMaxRows?: number

  selected?: object
  selectable?: SelectableOptions
  longPressThreshold?: number

  onNavigate?: HandleViewNavigateFn
  onSelectSlot?: (args: OnSelectSlotArgs) => any
  onSelectEnd?: PropTypeFunc
  onSelectStart?: PropTypeFunc
  onSelectEvent?: PropTypeFunc
  onDoubleClickEvent?: PropTypeFunc
  onKeyPressEvent?: PropTypeFunc
  onShowMore?: PropTypeFunc

  dayLayoutAlgorithm?: DaylayoutAlgorithmOptions
  showAllEvents?: boolean
  doShowMoreDrillDown?: boolean

  popup?: boolean
  handleDragStart?: PropTypeFunc

  popupOffset?: PopupOffsetOptions
}

export type WeekNavigateFn = <
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
>(
  date: Date,
  action: NavigateAction,
  props: RBCWeekProps<TEvent, TResource>
) => Date

type WeekRangeFnProps<TEvent extends object, TResource extends object> = Pick<
  RBCWeekProps<TEvent, TResource>,
  'localizer'
>

export type WeekRangeFn = <
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
>(
  date: Date,
  props: WeekRangeFnProps<TEvent, TResource>
) => Date[]

export type WeekTitleFn = <
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
>(
  date: Date,
  props: RBCWeekProps<TEvent, TResource>
) => string

declare class Week<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends React.Component<RBCWeekProps<TEvent, TResource>> {
  static navigate: ViewComponentStatic['navigate']

  static range: ViewComponentStatic['range']

  static title: ViewComponentStatic['title']
}

export default Week
