import type { CalendarComponentsWithDefaults } from './components.types'
import type {
  CalendarAccessors,
  CalendarGetters,
  RBCEvent,
  RBCResource,
} from './misc.types'
import type { ResourcesFnReturns } from './utils/Resources.types'

export interface TimeGutterAllDayProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> {
  resources: ResourcesFnReturns<TEvent, TResource>
  components: CalendarComponentsWithDefaults<TEvent, TResource>
  getters?: CalendarGetters<TEvent>
  accessors: CalendarAccessors<TEvent, TResource>
}
