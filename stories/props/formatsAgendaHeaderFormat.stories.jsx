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

export function FormatsAgendHeaderFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        agendaHeaderFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'EEEE MMMM d, YYYY', culture) +
          ' - ' +
          localizer.format(end, 'EEEE MMMM d, YYYY', culture),
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
FormatsAgendHeaderFormat.storyName = 'formats.agendaHeaderFormat'
