import React, { useCallback, useMemo } from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
import demoEvents from '../resources/events'
// import mdx from '...' 
import '../resources/propGetter.scss'

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

export function DayPropGetter() {
  const dayPropGetter = useCallback(
    (date) => ({
      ...(DateTime.fromJSDate(date).weekday === 2 && {
        className: 'tuesday',
      }),
      ...(DateTime.fromJSDate(date).weekday === 4 && {
        style: {
          backgroundColor: 'darkgreen',
          color: 'white',
        },
      }),
    }),
    []
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 13), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        dayPropGetter={dayPropGetter}
        events={demoEvents}
        localizer={mLocalizer}
      />
    </div>
  )
}
DayPropGetter.storyName = 'dayPropGetter'
