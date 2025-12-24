import React, { useMemo } from 'react'
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

export function FormatsDayHeaderFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        dayHeaderFormat: (date, culture, localizer) =>
          localizer.format(date, 'dddd MMMM Do', culture),
      },
      views: [Views.WEEK, Views.DAY],
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.DAY}
        events={demoEvents}
        formats={formats}
        localizer={mLocalizer}
        views={views}
      />
    </div>
  )
}
FormatsDayHeaderFormat.storyName = 'formats.dayHeaderFormat'
