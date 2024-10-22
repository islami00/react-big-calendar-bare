import type { RBCEvent } from '../misc.types'
import type { DateLocalizer } from '../localizer.types'
import type { GetSlotMetricsArgsAccessors } from './DateSlotMetrics.types'
export interface EventLevelsReturns<TEvent extends object = RBCEvent> {
  levels: EventLevelsList<TEvent>
  extra: RowSegment<TEvent>[]
}
export type EventLevelsFn = (
  rowSegments: RowSegment[],
  limit?: number
) => EventLevelsReturns

export type EventSegmentsFn = <TEvent extends object = RBCEvent>(
  event: TEvent,
  range: DateRangeList,
  accessors: GetSlotMetricsArgsAccessors<TEvent>,
  localizer: DateLocalizer
) => RowSegment<TEvent>
export interface RowSegment<TEvent = RBCEvent> {
  event: TEvent
  span: number
  left: number
  right: number
}
export type EventLevelsList<TEvent = RBCEvent> = RowSegment<TEvent>[][]

export type DateRangeList = [Date, ...Date[]]
