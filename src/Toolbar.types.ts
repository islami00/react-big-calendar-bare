import type { ToolbarProps } from 'react-big-calendar'
import type { ViewRegistery, ViewRegisteryKey } from './components.types'
import type { RBCEvent, RBCResource } from './misc.types'
import type * as React from 'react'

type SharedToolbarProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> = Omit<ToolbarProps<TEvent, TResource>, 'views' | 'view' | 'onView'>
export interface RBCToolbarProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends SharedToolbarProps<TEvent, TResource> {
  view: ViewRegisteryKey
  views: ViewRegistery

  onView: (view: ViewRegisteryKey) => void
}

declare class Toolbar<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends React.Component<RBCToolbarProps<TEvent, TResource>> {}
export default Toolbar
