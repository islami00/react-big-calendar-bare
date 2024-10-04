/**
 * @import * as types from "./TimeGutterAllDaySlot.types"
 * @import {RBCEvent, RBCResource} from "./misc.types"
 * */
import * as React from 'react'
import { forwardRefWithGenerics } from './misc'
/**
 * @template {NonNullable<unknown>} [TEvent=RBCEvent]
 * @template {NonNullable<unknown>} [TResource=RBCResource]
 * @param {types.TimeGutterAllDaySlotProps<TEvent, TResource>} props
 * @param {React.Ref<any>} ref
 */
function TimeGutterAllDaySlot(props, ref) {
  const { accessors, resource } = props
  return (
    <span className="rbc-label" ref={ref}>
      {accessors.resourceTitle(resource)}
    </span>
  )
}
export default forwardRefWithGenerics(TimeGutterAllDaySlot)
