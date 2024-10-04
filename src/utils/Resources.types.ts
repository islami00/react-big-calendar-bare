import type {
  RBCResource,
  RBCEvent,
  ResourceIdOptions,
  CalendarAccessors,
} from '../misc.types'

export type ResourcesFnNoneObject = {}

/** `Resources` ensures this is never null or undefined */
export type ResourcesFnGroupKey = ResourcesFnNoneObject | ResourceIdOptions

export type ResourcesFnTuple<TResource extends object = RBCResource> = [
  ResourcesFnGroupKey,
  TResource | null
]

export type ResourcesFnMapFn<T, TResource extends object = RBCResource> = (
  resourceTuple: ResourcesFnTuple<TResource>,
  idx: number,
  /** Array length. */
  arrayLen: number
) => T

export type ResourcesFnGroupedEvents<TEvent extends object = RBCEvent> = Map<
  ResourcesFnGroupKey,
  TEvent[]
>

export interface ResourcesFnReturns<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> {
  map: <T>(fn: ResourcesFnMapFn<T, TResource>) => T[]
  groupEvents: (events: RBCEvent[]) => ResourcesFnGroupedEvents<TEvent>
}
export type ResourcesFn<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> = (
  resources: TResource[] | undefined,
  accessors: CalendarAccessors<TEvent, TResource>
) => ResourcesFnReturns<TEvent, TResource>
