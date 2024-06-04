import { action } from '@storybook/addon-actions'

import { DateTime } from 'luxon'
import React from 'react'
import { uncontrollable } from 'uncontrollable'
import { Calendar as ControledCalendar, luxonLocalizer } from '../../src'

// For Testing SASS styling
import '../../src/sass/styles.scss'


export { Views } from '../../src'

const now = DateTime.now();


const BaseCalendar = uncontrollable(ControledCalendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent',
})

// uncomment for timezone testing in Storybook
//moment.tz.setDefault('America/Los_Angeles')

const localizer = luxonLocalizer(DateTime)

export const date = (...args) => moment(...args).toDate()

export const Calendar = (props) => (
  <div style={{ height: 650 }}>
    <BaseCalendar localizer={localizer} {...props} />
  </div>
)

export const DragableCalendar = (props) => {
  return (
    <Calendar
      popup
      selectable
      localizer={localizer}
      onEventDrop={action('event dropped')}
      onSelectEvent={action('event selected')}
      onSelectSlot={action('slot selected')}
      {...props}
    />
  )
}

export const events = [
  {
    title: 'test',
    start: now.plus({hour:19}).toJSDate(),
    end:now.plus({hour:20}).toJSDate(),
    allDay: false,
  },
  {
    title: 'test larger',
    start: now.startOf('day').plus({hour:5}).toJSDate(),
    end:now.startOf('day').plus({hour:10}).toJSDate(),
    allDay: false,
  },

  {
    title: 'test larger',
    start: now.startOf('day').plus({hour:15}).toJSDate(),
    end:now.startOf('day').plus({hour:23}).toJSDate(),
    allDay: false,
  },
  {
    title: 'test all day',
    start: now.startOf('day').toJSDate(),
    end: now.endOf('day').toJSDate(),
    allDay: true,
  },
  {
    title: 'test 2 days',
    start: now.startOf('day').toJSDate(),
    end: now.startOf('day').plus({day:2}).toJSDate(),
    allDay: true,
  },
  {
    title: 'test multi-day',
    start: now.startOf('day').toJSDate(),
    end: now.startOf('day').plus({day:3}).toJSDate(),
    allDay: false,
  },
]

export const backgroundEvents = [
  {
    title: 'test background event',
    start: now.startOf('day').plus({hour:2}).toJSDate(),
    end:now.startOf('day').plus({hour:12}).toJSDate(),
    allDay: false,
  },
]

export const resourceEvents = [
  {
    title: 'event 1',
    start: now.startOf('day').plus({hour:1}).toJSDate(),
    end:now.startOf('day').plus({hour:2}).toJSDate(),
    allDay: false,
    resourceId: 1,
  },
  {
    title: 'event 2',
    start: now.startOf('day').plus({hour:3}).toJSDate(),
    end:now.startOf('day').plus({hour:4}).toJSDate(),
    allDay: false,
    resourceId: [1, 2],
  },
  {
    title: 'event 3',
    start: now.startOf('day').plus({hour:1}).toJSDate(),
    end:now.startOf('day').plus({hour:3}).toJSDate(),
    allDay: false,
    resourceId: 3,
  },
]

export const resources = [
  {
    id: 1,
    name: 'Resource One',
  },
  {
    id: 2,
    name: 'Resource Two',
  },
  {
    id: 3,
    name: 'Resource Three',
  },
]
