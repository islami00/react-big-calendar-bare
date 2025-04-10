import TimeGridHeaderAllDay, {
  TimeGridHeaderAllDayProps,
} from './TimeGridHeaderAllDay.types'

// This can't be in a d.ts of the same file as it errors
declare module 'react-big-calendar/lib/TimeGridHeaderAllDay' {
  export { TimeGridHeaderAllDayProps }
  export default TimeGridHeaderAllDay
}
export { TimeGridHeaderAllDayProps }

export default TimeGridHeaderAllDay
