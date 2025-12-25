import React, { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Calendar } from '../helpers'
import demoEvents from '../resources/events'
// import mdx from '...' 


export default {
  title: 'props',
  component: Calendar,
  parameters: {
    docs: {
      page: null // mdx removed ,
    },
  },
}

export function Formats() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      formats: {
        // the 'date' on each day cell of the 'month' view
        dateFormat: 'D',
        // the day of the week header in the 'month' view
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, 'EEEE', culture),
        // the day header in the 'week' and 'day' (Time Grid) views
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, 'EEEE d', culture),
        // the time in the gutter in the Time Grid views
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, 'hh:mm a', culture),
      },
    }),
    []
  )

  const localizer = useMemo(
    () => luxonLocalizer(DateTime, { formats }),
    [formats]
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={localizer}
      />
    </div>
  )
}
Formats.storyName = 'formats'
