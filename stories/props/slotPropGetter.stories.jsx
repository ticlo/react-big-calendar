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

export function SlotPropGetter() {
  const slotPropGetter = useCallback(
    (date) => ({
      className: 'slotDefault',
      ...(DateTime.fromJSDate(date).hour < 8 && {
        style: {
          backgroundColor: 'powderblue',
          color: 'black',
        },
      }),
      ...(DateTime.fromJSDate(date).hour > 12 && {
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
        slotPropGetter={slotPropGetter}
        events={demoEvents}
        localizer={mLocalizer}
      />
    </div>
  )
}
SlotPropGetter.storyName = 'slotPropGetter'
