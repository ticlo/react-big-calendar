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

export function FormatsMonthHeaderFormat() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      formats: {
        monthHeaderFormat: (date, culture, localizer) =>
          localizer.format(date, `MMMM [']YY`, culture),
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
FormatsMonthHeaderFormat.storyName = 'formats.monthHeaderFormat'
