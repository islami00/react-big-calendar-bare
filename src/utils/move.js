/**
 * @import {MoveDateParam1} from './move.types'
 * @import {ViewComponent} from '../components.types'
 * */
import invariant from 'invariant'
import { navigate } from './constants'
import VIEWS from '../Views'
/**
 *
 * @param {ViewComponent | undefined} View
 * @param {MoveDateParam1} param1
 * @returns {Date}
 */
export default function moveDate(View, { action, date, today, ...props }) {
  View = typeof View === 'string' ? VIEWS[View] : View

  switch (action) {
    case navigate.TODAY:
      date = today || new Date()
      break
    case navigate.DATE:
      break
    default:
      invariant(
        View && typeof View.navigate === 'function',
        'Calendar View components must implement a static `.navigate(date, action)` method.s'
      )
      date = View.navigate(date, action, props)
  }
  return date
}
