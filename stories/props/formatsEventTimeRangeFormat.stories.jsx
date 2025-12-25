import React, { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Views } from '../../src'
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

export function FormatsEventTimeRangeFormat() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'hh:mm a', culture) +
          ' - ' +
          localizer.format(end, 'hh:mm a', culture),
      },
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={demoEvents}
        formats={formats}
        
      />
    </div>
  )
}
FormatsEventTimeRangeFormat.storyName = 'formats.eventTimeRangeFormat'
