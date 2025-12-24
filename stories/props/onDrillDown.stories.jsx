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

export function OnDrillDown() {
  const [view, setView] = useState(Views.MONTH)
  const [date, setDate] = useState(new Date(2015, 3, 13))
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  const onView = useCallback((newView) => setView(newView), [setView])
  const onDrillDown = useCallback(
    (newDate) => {
      setDate(newDate)
      setView(Views.AGENDA)
    },
    [setDate, setView]
  )
  return (
    <div className="height600">
      <Calendar
        date={date}
        events={demoEvents}
        localizer={mLocalizer}
        onDrillDown={onDrillDown}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
      />
    </div>
  )
}
OnDrillDown.storyName = 'onDrillDown'
