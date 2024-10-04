import type { DateLocalizer } from '../localizer.types'
import type { DateRangeList, RBCEvent } from '../misc.types'
import type { EventLevelsList, RowSegment } from './eventLevels.types'

export interface GetSlotMetricsReturns<TEvent extends object = RBCEvent> {
  first: Date
  last: Date
  levels: EventLevelsList<TEvent>
  extra: RowSegment<TEvent>[]
  range: DateRangeList
  slots: number
  clone: (arg: GetSlotMetricsArgs<TEvent>) => GetSlotMetricsReturns<TEvent>
  getDateForSlot: (slotNumber: number) => Date
  getSlotForDate: (date: Date) => Date | undefined
  getEventsForSlot: (slot: number) => TEvent[]
  continuesPrior: (event: TEvent) => boolean
  continuesAfter: (event: TEvent) => boolean
}

export interface GetSlotMetricsArgsAccessors<TEvent extends object = RBCEvent> {
  title?: ((event: TEvent) => string) | undefined
  tooltip?: ((event: TEvent) => string) | undefined
  end?: ((event: TEvent) => Date) | undefined
  start?: ((event: TEvent) => Date) | undefined
  allDay?: ((event: TEvent) => boolean) | undefined
}

interface GetSlotMetricsArgs<TEvent extends object = RBCEvent> {
  range: DateRangeList
  events: TEvent[]
  maxRows: number
  minRows: number
  accessors: GetSlotMetricsArgsAccessors<TEvent>
  localizer: DateLocalizer
}

export type GetSlotMetrics = (
  options: GetSlotMetricsArgs
) => GetSlotMetricsReturns
