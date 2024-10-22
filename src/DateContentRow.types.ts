import type * as React from 'react'
import type {
  OnSelectSlotArgs,
  SelectableOptions,
} from './BackgroundCells.types'
import type { RBCEvent, PropTypeFunc } from './misc.types'
import type { DateLocalizer } from './localizer.types'

export interface DateContentRowProps<TEvent = RBCEvent> {
  /** Passed to the background, and used in marking today in the header if headers are included */
  date?: Date
  events: TEvent[]
  range: Date[]

  rtl?: boolean
  resizable?: boolean
  resourceId: any
  renderForMeasure?: boolean
  /** Render a header node */
  renderHeader?: PropTypeFunc

  /** Important for selection */
  container?: PropTypeFunc
  selected?: object
  selectable?: SelectableOptions
  longPressThreshold?: number

  onShowMore: PropTypeFunc
  showAllEvents?: boolean
  onSelectSlot: (range: Date[], slot: OnSelectSlotArgs) => void
  onSelect?: PropTypeFunc
  /** Forwarded to BackgroundCells */
  onSelectEnd?: PropTypeFunc
  /** Forwarded to BackgroundCells */
  onSelectStart?: PropTypeFunc
  onDoubleClick?: PropTypeFunc
  onKeyPress?: PropTypeFunc
  dayPropGetter?: PropTypeFunc

  getNow: PropTypeFunc
  /** All day row of TimeGrid */
  isAllDay?: boolean

  accessors: object
  components: object
  getters: object
  localizer: DateLocalizer

  minRows: number
  maxRows: number

  className?: string
}
export declare class DateContentRow extends React.Component<DateContentRowProps> {}
