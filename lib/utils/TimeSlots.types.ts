import type { DateLocalizer } from '../localizer.types'
import type { SelectBoundsRectObject } from '../Selection.types'
export interface TimeSlotsGetSlotMetricsArgs {
  min: Date
  max: Date
  step: number
  timeslots: number
  localizer: DateLocalizer
}

interface SelectionNodeBounds {
  top: number
  left: number
  right: number
  bottom: number
}
export interface TimeSlotsGetSlotMetricsReturns {
  groups: Date[][]

  update: (args: TimeSlotsGetSlotMetricsArgs) => TimeSlotsGetSlotMetricsReturns

  dateIsInGroup: (date: Date, groupIndex: number) => boolean

  nextSlot: (slot: number) => Date
  closestSlotToPosition: (percent: number) => Date

  closestSlotFromPoint: (
    point: SelectBoundsRectObject,
    boundaryRect: SelectionNodeBounds
  ) => Date

  closestSlotFromDate: (date: Date, offset: number) => Date

  startsBeforeDay: (date: Date) => boolean

  startsAfterDay: (date: Date) => boolean

  startsBefore: (date: Date) => boolean

  startsAfter: (date: Date) => boolean

  getRange: (
    rangeStart: Date,
    rangeEnd: Date,
    ignoreMin: boolean,
    ignoreMax: boolean
  ) => {
    top: number
    height: number
    start: number
    startDate: Date
    end: number
    endDate: Date
  }

  getCurrentTimePosition: (rangeStart: Date) => number
}

export type TimeSlotsGetSlotMetricsFn = (
  args: TimeSlotsGetSlotMetricsArgs
) => TimeSlotsGetSlotMetricsReturns
