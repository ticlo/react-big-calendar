import React, { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import demoEvents from '../resources/events'
// import mdx from '...' 
import CustomToolbar from './customComponents/CustomToolbar.component'
import '../resources/customToolbar.scss'

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

export function Components() {
  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
      },
      defaultDate: new Date(2015, 3, 13),
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={mLocalizer}
        components={components}
      />
    </div>
  )
}
Components.storyName = 'components'
