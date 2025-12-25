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

export function FormatsAgendaTimeRangeFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'hh:mm A', culture) +
          ' - ' +
          localizer.format(end, 'hh:mm A', culture),
      },
      views: [Views.WEEK, Views.DAY, Views.AGENDA],
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.AGENDA}
        events={demoEvents}
        formats={formats}
        
        views={views}
      />
    </div>
  )
}
FormatsAgendaTimeRangeFormat.storyName = 'formats.agendaTimeRangeFormat'
