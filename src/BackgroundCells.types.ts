import type * as React from 'react'
import type { DateLocalizer } from './localizer.types'
import type {
  SelectActions,
  SelectClickPoint,
  SelectRect,
} from './Selection.types'
import type { PropTypeFunc } from './misc.types'

export interface OnSelectSlotArgs {
  start: number
  end: number
  action: SelectActions
  bounds?: SelectRect
  box?: SelectClickPoint
  // Same resource passed in
  resourceId?: any
}

export interface BackgroundCellsProps {
  /** Used to mark days outside the current month in the calendar month view */
  date?: Date
  getNow: PropTypeFunc

  getters: object
  components: object

  container?: PropTypeFunc
  dayPropGetter?: PropTypeFunc
  selectable?: SelectableOptions
  longPressThreshold?: number

  onSelectSlot?: (args: OnSelectSlotArgs) => any
  onSelectEnd?: PropTypeFunc
  onSelectStart?: PropTypeFunc

  range: Date[]
  rtl?: boolean
  type?: string
  // Same resource passed in
  resourceId: any

  localizer: DateLocalizer
}

export interface BackgroundCellsState {
  selecting: boolean
  startIdx?: boolean
  endIdx?: boolean
}
export declare class BackgroundCells extends React.Component<
  BackgroundCellsProps,
  BackgroundCellsState
> {}
export type SelectableOptions = boolean | 'ignoreEvents'
