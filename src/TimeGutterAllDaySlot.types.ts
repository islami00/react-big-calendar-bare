import type { CalendarAccessors, RBCEvent, RBCResource } from './misc.types'

/** This was created instead of using TimeSlotWrapper as TimeSlotWrapper is already used for something else  */
export interface TimeGutterAllDaySlotProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> {
  resource: null | TResource
  accessors: CalendarAccessors<TEvent, TResource>
  ref?: React.Ref<HTMLElement>
}
