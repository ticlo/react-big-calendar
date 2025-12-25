import React, { useMemo } from 'react'
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

export function Messages() {
  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      messages: {
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Después',
        today: 'Hoy',
        agenda: 'El Diario',

        showMore: (total) => `+${total} más`,
      },
    }),
    []
  )

  const localizer = useMemo(
    () => luxonLocalizer(DateTime, { messages }),
    [messages]
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={localizer}
      />
    </div>
  )
}
Messages.storyName = 'messages'
