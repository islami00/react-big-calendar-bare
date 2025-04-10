import type * as rbc from 'react-big-calendar'

interface InEventRangeArgs {
  event: rbc.DateRange
  range: rbc.DateRange
}
export type SharedDateLocalizerSpec = Omit<
  rbc.DateLocalizerSpec,
  'inEventRange'
>
export interface DateLocalizerSpec extends SharedDateLocalizerSpec {
  inEventRange?: (args: InEventRangeArgs) => boolean
}
type SharedDateLocalizerProps = Omit<rbc.DateLocalizer, 'inEventRange'>

export interface DateLocalizer extends SharedDateLocalizerProps {
  inEventRange: (args: InEventRangeArgs) => boolean
}

declare module 'react-big-calendar/lib/localizer' {
  export default DateLocalizer
}
export default DateLocalizer
