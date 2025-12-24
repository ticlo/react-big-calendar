import React, { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
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
  decorators: [
    (Story) => (
      <div style={{ height: 800 }}>
        <Story />
      </div>
    ),
  ],
}

export function Localizer() {
  const localizer = useMemo(() => luxonLocalizer(DateTime), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={new Date(2015, 3, 13)}
        events={demoEvents}
        localizer={localizer}
      />
    </div>
  )
}
Localizer.storyName = 'localizer *'
