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

export function FormatsWeekdayFormat() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      formats: {
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, 'EEEE', culture),
      },
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        formats={formats}
        
      />
    </div>
  )
}
FormatsWeekdayFormat.storyName = 'formats.weekdayFormat'
