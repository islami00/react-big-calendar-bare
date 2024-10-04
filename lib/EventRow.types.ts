import type * as React from 'react'

import type { RowSegment } from './utils/eventLevels.types'
import type { RBCEvent } from './misc.types'
import type { GetSlotMetricsReturns } from './utils/DateSlotMetrics.types'
export interface EventRowProps<TEvent extends object = RBCEvent> {
  segments: RowSegment<TEvent>[]
  slotMetrics: GetSlotMetricsReturns<TEvent>
  className?: string
}

export declare class EventRow<
  TEvent extends object = RBCEvent
> extends React.Component<EventRowProps<TEvent>> {}
