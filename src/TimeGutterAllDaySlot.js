/**
 * @import * as rbc from "react-big-calendar"
 * @import {TimeGutterAllDaySlotProps} from "react-big-calendar/lib/TimeGutterAllDaySlot"
 * */
import * as React from 'react'
import { forwardRefWithGenerics } from './misc'
/**
 * @template {NonNullable<unknown>} [TEvent=rbc.Event]
 * @template {NonNullable<unknown>} [TResource=rbc.Resource]
 * @param {TimeGutterAllDaySlotProps<TEvent, TResource>} props
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
