import React from 'react'
import {
  CalendarAccessors,
  CalendarGetters,
  PropTypeFunc,
  RBCEvent,
  RBCResource,
} from './misc.types'
import { DOMContainer } from 'react-overlays/cjs/useWaitForDOMRef'
import { DateLocalizer } from './localizer.types'
import { CalendarComponents } from './components.types'
import { TimeGridProps } from 'react-big-calendar'

export interface OverlayProps<TEvent extends object = RBCEvent> {
  events: TEvent[]
  position: {
    top: number
    left: number
    height: number
    width: string
  }
  date?: Date
  end?: Date
  target: DOMContainer
}

export interface PopupOffset {
  x: number
  y: number
}

export interface PopOverlayProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> {
  popupOffset?: number | PopupOffset
  overlay?: OverlayProps<TEvent>
  accessors: CalendarAccessors<TEvent, TResource>
  localizer: DateLocalizer
  components: CalendarComponents<TEvent, TResource>
  getters: CalendarGetters<TEvent>
  selected?: object
  handleSelectEvent?: TimeGridProps<TEvent>['onSelectEvent']
  handleDoubleClickEvent?: TimeGridProps<TEvent>['onDoubleClickEvent']
  handleKeyPressEvent?: TimeGridProps<TEvent>['onKeyPressEvent']
  handleDragStart?: PropTypeFunc
  onHide?: () => void
  overlayDisplay?: () => void
}
export interface PopOverlayInnerProps<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
> extends PopOverlayProps<TEvent, TResource> {
  containerRef: React.Ref<any>
}

declare function PopOverlay<
  TEvent extends object = RBCEvent,
  TResource extends object = RBCResource
>(
  props: PopOverlayProps<TEvent, TResource> & React.RefAttributes<any>
): React.ReactNode

export default PopOverlay
