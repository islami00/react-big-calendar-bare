import type { RBCEvent, RBCResource } from './misc.types'
import type {
  RBCWeekProps,
  WeekNavigateFn,
  WeekRangeFn,
  WeekTitleFn,
} from './Week.types'

export interface HorizontalResourceProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends Omit<RBCWeekProps<TEvent, TResource>, 'width'> {
  rangeFn?: WeekRangeFn
}

declare function HorizontalResource<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
>(props: HorizontalResourceProps<TEvent, TResource>): React.ReactElement

declare namespace HorizontalResource {
  const range: WeekRangeFn
  const navigate: WeekNavigateFn
  const title: WeekTitleFn
}

export default HorizontalResource
