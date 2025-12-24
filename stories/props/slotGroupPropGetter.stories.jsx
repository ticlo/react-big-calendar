import React, { useCallback, useMemo } from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
import demoEvents from '../resources/events'
// import mdx from '...' 
import '../resources/propGetter.scss'

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

export function SlotGroupPropGetter() {
  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 60,
      },
    }),
    []
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 13), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        slotGroupPropGetter={slotGroupPropGetter}
        events={demoEvents}
        localizer={mLocalizer}
      />
    </div>
  )
}
SlotGroupPropGetter.storyName = 'slotGroupPropGetter'
