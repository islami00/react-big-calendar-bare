import type * as React from 'react'
import type * as rbc from 'react-big-calendar'
import type {
  CalendarComponents,
  DefaultViews,
  ViewComponent,
  ViewRegistery,
  ViewRegisteryKey,
} from './components.types'
import type { RBCEvent, RBCResource } from './misc.types'

type SharedCalendarProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> = Omit<
  rbc.CalendarProps<TEvent, TResource>,
  | 'components'
  | 'views'
  | 'view'
  | 'onNavigate'
  | 'onView'
  | 'drilldownView'
  | 'defaultView'
  | 'ref'
  | 'getDrilldownView'
  | 'onDrillDown'
>
export interface RBCCalendarProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends SharedCalendarProps<TEvent, TResource>,
    React.RefAttributes<Calendar<TEvent, TResource>> {
  components?: CalendarComponents<TEvent, TResource> | undefined
  views?: Partial<ViewRegistery> | (keyof DefaultViews)[]
  view: ViewRegisteryKey

  onNavigate?:
    | ((
        newDate: Date,
        view: ViewRegisteryKey,
        action: rbc.NavigateAction
      ) => void)
    | undefined
  onView?: ((view: ViewRegisteryKey) => void) | undefined
  drilldownView?: ViewRegisteryKey | null | undefined
  onDrillDown?:
    | ((
        date: Date,
        view: ViewRegisteryKey,
        // Not sure where this is defined
        drilldownView?: ViewRegisteryKey
      ) => void)
    | undefined
  getDrilldownView?:
    | ((
        targetDate: Date,
        currentViewName: ViewRegisteryKey,
        configuredViewNames: ViewRegisteryKey[]
      ) => void)
    | null
    | undefined
  defaultView?: ViewRegisteryKey | undefined
}

declare class Calendar<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends React.Component<RBCCalendarProps<TEvent, TResource>> {
  getViews: () => Record<string, ViewComponent>
  getView: () => ViewComponent
  getDrilldownView: (date: Date) => ViewRegisteryKey | null
}
export default Calendar
