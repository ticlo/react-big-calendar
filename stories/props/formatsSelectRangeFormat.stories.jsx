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

export function FormatsSelectRangeFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        selectRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'hh:mm a', culture) +
          ' - ' +
          localizer.format(end, 'hh:mm a', culture),
      },
      views: [Views.WEEK, Views.DAY],
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
        
        selectable
        views={views}
      />
    </div>
  )
}
FormatsSelectRangeFormat.storyName = 'formats.selectRangeFormat'
