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

function buildMessage(calEvents, date) {
  return `[onShowMore] received ${
    calEvents.length
  } for ${date.toLocaleDateString()}`
}

export function OnShowMore() {
  const onShowMore = useCallback(
    (events, date) => window.alert(buildMessage(events, date)),
    []
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 1), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={mLocalizer}
        onShowMore={onShowMore}
      />
    </div>
  )
}
OnShowMore.storyName = 'onShowMore'
