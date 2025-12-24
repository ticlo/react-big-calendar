import React, { useState, useCallback } from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
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

export function OnNavigate() {
  const [date, setDate] = useState(new Date(2015, 3, 1))

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])

  return (
    <div className="height600">
      <Calendar
        date={date}
        events={demoEvents}
        localizer={mLocalizer}
        onNavigate={onNavigate}
      />
    </div>
  )
}
OnNavigate.storyName = 'onNavigate'
