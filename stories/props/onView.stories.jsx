import React, { useState, useCallback } from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
import demoEvents from '../resources/events'
// import mdx from '...' 

const mLocalizer = luxonLocalizer(DateTime)

export default {
  title: 'props',
  component: Calendar,
  parameters: {
    docs: {
      page: null // mdx removed ,
    },
  },
}

export function OnView() {
  const [date, setDate] = useState(new Date(2015, 3, 1))
  const [view, setView] = useState(Views.WEEK)

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  const onView = useCallback((newView) => setView(newView), [setView])

  return (
    <div className="height600">
      <Calendar
        date={date}
        events={demoEvents}
        localizer={mLocalizer}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
      />
    </div>
  )
}
OnView.storyName = 'onView'
