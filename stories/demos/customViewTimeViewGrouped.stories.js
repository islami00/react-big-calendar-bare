import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import CustomView from './exampleCode/TimeViewGrouped'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const localizer = momentLocalizer(moment)
// Hours spent: 5
export function Example011() {
  return <CustomView localizer={localizer} />
}
Example011.storyName = 'Custom Calendar Views - Time View Grouped'
