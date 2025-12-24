import React, { useCallback, useRef, useEffect, useMemo } from 'react'
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

function buildMessage(slotInfo) {
  return `[onSelectSlot] a date selection was made, passing 'slotInfo'
  ${JSON.stringify(slotInfo, null, 2)}`
}

export function OnSelectSlot() {
  const clickRef = useRef(null)

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectSlot = useCallback((slotInfo) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert(buildMessage(slotInfo))
    }, 250)
  }, [])

  const defaultDate = useMemo(() => new Date(2015, 3, 1), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={mLocalizer}
        onSelectSlot={onSelectSlot}
        selectable
      />
    </div>
  )
}
OnSelectSlot.storyName = 'onSelectSlot'
