import type { TimeSlotsGetSlotMetricsReturns } from './utils/TimeSlots.types'

import type { NavigateAction } from 'react-big-calendar'
export interface DayColumnWrapperProps {
  children: React.ReactNode[]
  className?: string
  date: Date
  slotMetrics: TimeSlotsGetSlotMetricsReturns
  style?: React.CSSProperties
  onNavigate: (action: NavigateAction, newDate?: Date) => void
}
