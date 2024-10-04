import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import HorizontalResource from '../../../src/HorizontalResource' // use 'react-big-calendar/lib/Week'. Can't 'alias' in Storybook
import resourceEvents from '../../resources/resourceEvents'
import DemoLink from '../../DemoLink.component'

export default function CustomView({ localizer }) {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: {
        // month: true,
        week: HorizontalResource,
      },
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="timeViewGrouped">
        <strong>The Calendar below implements a custom 3-day week view</strong>
      </DemoLink>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={resourceEvents.events}
          resources={resourceEvents.list}
          localizer={localizer}
          views={views}
          selectable
          onSelectSlot={console.log}
          onSelectEvent={console.log}
          doShowMoreDrillDown={false}
        />
      </div>
    </Fragment>
  )
}
CustomView.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
