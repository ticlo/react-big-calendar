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

export function FormatsEventTimeRangeStartFormat() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        eventTimeRangeStartFormat: (date, culture, localizer) =>
          localizer.format(date, 'hh:mm A', culture) + ' >> ',
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
        localizer={mLocalizer}
        showMultiDayTimes
      />
    </div>
  )
}
FormatsEventTimeRangeStartFormat.storyName = 'formats.eventTimeRangeStartFormat'
