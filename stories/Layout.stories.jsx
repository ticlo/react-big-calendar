import React from 'react'
import { action } from '@storybook/addon-actions'

import { DateTime } from 'luxon'

import { events, Calendar, Views, DragAndDropCalendar } from './helpers'
import createEvents from './helpers/createEvents'

// Helper to create DateTime objects - note: Luxon uses 1-indexed months
const d = (year, month, day, hour = 0, minute = 0, second = 0) =>
  DateTime.fromObject({ year, month, day, hour, minute, second })

export default {
  title: 'Additional Examples/Layout',
  component: Calendar,
  decorators: [
    (Story) => (
      <div className="height600">
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Calendar {...args} />

const defaultDate = DateTime.now()

export const EventLayout = Template.bind({})
EventLayout.args = {
  defaultView: Views.DAY,
  defaultDate,
  timeslots: 4,
  events: createEvents(1),
}

export const FirstOfWeekAllDay = Template.bind({})
FirstOfWeekAllDay.storyName = 'first of the week all-day event'
FirstOfWeekAllDay.args = {
  defaultDate: d(2016, 12, 4),
  events: [
    {
      allDay: true,
      title: 'All Day Event',
      start: d(2016, 12, 4),
      end: d(2016, 12, 4),
    },
  ],
}

export const EndOfWeekAllDay = Template.bind({})
EndOfWeekAllDay.storyName = 'end of the week all-day event'
EndOfWeekAllDay.args = {
  defaultDate: d(2016, 12, 3),
  events: [
    {
      allDay: true,
      title: 'All Day Event',
      start: d(2016, 12, 3),
      end: d(2016, 12, 3),
    },
  ],
}

export const EventAtStartOfWeek = Template.bind({})
EventAtStartOfWeek.args = {
  defaultDate: d(2016, 12, 4),
  events: [
    {
      title: 'has time',
      start: d(2016, 12, 4).plus({ days: 1 }).minus({ hours: 5 }),
      end: d(2016, 12, 4).plus({ days: 1 }).minus({ hours: 4 }),
    },
  ],
}

export const EventAtEndOfWeek = Template.bind({})
EventAtEndOfWeek.args = {
  defaultDate: d(2016, 12, 3),
  events: [
    {
      title: 'has time',
      start: d(2016, 12, 3).plus({ days: 1 }).minus({ hours: 5 }),
      end: d(2016, 12, 3).plus({ days: 1 }).minus({ hours: 4 }),
    },
  ],
}

export const EventsOnAConstrainedDayColumn = Template.bind({})
EventsOnAConstrainedDayColumn.args = {
  defaultView: Views.DAY,
  min: DateTime.fromObject({ hour: 8 }),
  max: DateTime.fromObject({ hour: 17 }),
  events,
}

export const NoDuration = Template.bind({})
NoDuration.args = {
  defaultDate: d(2016, 12, 4),
  events: [
    {
      title: 'start of the week',
      start: d(2016, 12, 4),
      end: d(2016, 12, 4),
    },
    {
      title: 'end of the week',
      start: d(2016, 12, 3),
      end: d(2016, 12, 3),
    },
    {
      title: 'middle',
      start: d(2016, 12, 6),
      end: d(2016, 12, 6),
    },
  ],
}

export const DaySpan = Template.bind({})
DaySpan.storyName = 'Single days should only span one slot, multi-days multiple'
DaySpan.args = {
  defaultDate: d(2015, 4, 1),
  events: [
    {
      title: 'SingleDay 1',
      start: d(2015, 4, 10),
      end: d(2015, 4, 11),
    },
    {
      title: 'SingleDay 2',
      start: d(2015, 4, 11),
      end: d(2015, 4, 12),
    },
    {
      title: 'SingleDay 3',
      start: d(2015, 4, 12),
      end: d(2015, 4, 13),
    },
    {
      title: 'SingleDay 4',
      start: d(2015, 4, 13),
      end: d(2015, 4, 14),
    },
    {
      title: 'MultiDay 1',
      start: d(2015, 4, 24),
      end: d(2015, 4, 25, 1),
    },
    {
      title: 'MultiDay 2',
      start: d(2015, 4, 25),
      end: d(2015, 4, 26, 1),
    },
  ],
}

export const ZeroDurationOddities = () => {
  return (
    <DragAndDropCalendar
      defaultDate={d(2015, 4, 1)}
      events={[
        {
          id: 4,
          title: '0 day duration',
          start: d(2015, 4, 8),
          end: d(2015, 4, 8),
        },
        {
          id: 4,
          title: '1 day duration',
          start: d(2015, 4, 9),
          end: d(2015, 4, 10),
        },
      ]}
    />
  )
}

export const ZeroDurationOverlap = () => {
  return (
    <DragAndDropCalendar
      defaultDate={defaultDate}
      events={[
        {
          title: 'event a',
          start: defaultDate,
          end: defaultDate,
        },
        {
          title: 'event b',
          start: defaultDate,
          end: defaultDate,
        },
      ]}
      dayLayoutAlgorithm={'no-overlap'}
      scrollToTime={defaultDate}
      defaultView={Views.WEEK}
    />
  )
}

export const OverlappingBackgroundEventsOverlap = Template.bind({})
OverlappingBackgroundEventsOverlap.storyName =
  "Overlapping Background Events - 'overlap'"
OverlappingBackgroundEventsOverlap.args = {
  defaultDate: d(2016, 12, 3),
  dayLayoutAlgorithm: 'overlap',
  defaultView: Views.WEEK,
  scrollToTime: d(2016, 12, 1, 7),
  backgroundEvents: [
    {
      title: 'First Event',
      start: d(2016, 11, 28, 10, 30),
      end: d(2016, 11, 28, 18),
    },
    {
      title: 'Second Event',
      start: d(2016, 11, 28, 12),
      end: d(2016, 11, 28, 16, 30),
    },
    {
      title: 'Third Event',
      start: d(2016, 11, 29, 8),
      end: d(2016, 11, 29, 21),
    },
    {
      title: 'Fourth Event',
      start: d(2016, 11, 29, 9, 30),
      end: d(2016, 11, 29, 19, 30),
    },
    {
      title: 'Fifth Event',
      start: d(2016, 11, 29, 11),
      end: d(2016, 11, 29, 18),
    },
    {
      title: 'Sixth Event',
      start: d(2016, 12, 1, 9),
      end: d(2016, 12, 1, 14),
    },
    {
      title: 'Seventh Event',
      start: d(2016, 12, 1, 11),
      end: d(2016, 12, 1, 16),
    },
    {
      title: 'Eighth Event',
      start: d(2016, 12, 1, 13),
      end: d(2016, 12, 1, 18),
    },
  ],
}

export const OverlappingBackgroundEventsNoOverlap = Template.bind({})
OverlappingBackgroundEventsNoOverlap.storyName =
  "Overlapping Background Events - 'no-overlap'"
OverlappingBackgroundEventsNoOverlap.args = {
  defaultDate: d(2016, 12, 3),
  dayLayoutAlgorithm: 'no-overlap',
  defaultView: Views.WEEK,
  scrollToTime: d(2016, 12, 1, 7),
  backgroundEvents: [
    {
      title: 'First Event',
      start: d(2016, 11, 28, 10, 30),
      end: d(2016, 11, 28, 18),
    },
    {
      title: 'Second Event',
      start: d(2016, 11, 28, 12),
      end: d(2016, 11, 28, 16, 30),
    },
    {
      title: 'Third Event',
      start: d(2016, 11, 29, 8),
      end: d(2016, 11, 29, 21),
    },
    {
      title: 'Fourth Event',
      start: d(2016, 11, 29, 9, 30),
      end: d(2016, 11, 29, 19, 30),
    },
    {
      title: 'Fifth Event',
      start: d(2016, 11, 29, 11),
      end: d(2016, 11, 29, 18),
    },
    {
      title: 'Sixth Event',
      start: d(2016, 12, 1, 9),
      end: d(2016, 12, 1, 14),
    },
    {
      title: 'Seventh Event',
      start: d(2016, 12, 1, 11),
      end: d(2016, 12, 1, 16),
    },
    {
      title: 'Eighth Event',
      start: d(2016, 12, 1, 13),
      end: d(2016, 12, 1, 18),
    },
  ],
}

