import type { NavigateAction } from 'react-big-calendar'
import type { DateLocalizer } from '../localizer.types'

interface NavigateCalendarProps {
  // This is mostly what navigate() uses
  localizer: DateLocalizer
}
export interface MoveDateParam1 extends NavigateCalendarProps {
  action: NavigateAction
  date: Date | undefined
  today: Date | undefined
}
