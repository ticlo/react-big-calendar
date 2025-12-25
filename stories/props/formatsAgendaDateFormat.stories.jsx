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

export function FormatsAgendDateFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        agendaDateFormat: (date, culture, localizer) =>
          localizer.format(date, 'EEEE MMMM d', culture),
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
FormatsAgendDateFormat.storyName = 'formats.agendaDateFormat'
