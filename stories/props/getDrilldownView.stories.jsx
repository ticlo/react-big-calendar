import React, { useCallback, useMemo } from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
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

export function GetDrilldownView() {
  const getDrilldownView = useCallback(
    (targetDate, currentViewName, configuredViewNames) => {
      if (currentViewName === 'month' && configuredViewNames.includes('week'))
        return 'week'

      return null
    },
    []
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 1), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        getDrilldownView={getDrilldownView}
        localizer={mLocalizer}
      />
    </div>
  )
}
GetDrilldownView.storyName = 'getDrilldownView'
