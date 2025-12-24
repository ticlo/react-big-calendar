import React, { useCallback } from 'react'
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

export function EventPropGetter() {
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: '#000',
        },
      }),
      ...(DateTime.fromJSDate(start).hour < 12 && {
        className: 'powderBlue',
      }),
      ...(event.title.includes('Meeting') && {
        className: 'darkGreen',
      }),
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={new Date(2015, 3, 13)}
        defaultView={Views.WEEK}
        eventPropGetter={eventPropGetter}
        events={demoEvents}
        localizer={mLocalizer}
      />
    </div>
  )
}
EventPropGetter.storyName = 'eventPropGetter'
