import Calendar from './Calendar.types'
import type { RBCCalendarProps } from './Calendar.types'

declare module 'react-big-calendar/lib/Calendar' {
  export type { RBCCalendarProps }
  export default Calendar
}
