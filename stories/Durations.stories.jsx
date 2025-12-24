import React from 'react'
import {
  Calendar,
  Views,
  globalizeLocalizer,
  luxonLocalizer,
} from '../src'

import { DateTime } from 'luxon'
import globalize from 'globalize'

const localizers = {
  globalize: globalizeLocalizer(globalize),
  luxon: luxonLocalizer(DateTime, { firstDayOfWeek: 7 }),
}

const DraggableCalendar = Calendar

export default {
  title: 'Additional Examples/Event Durations',
  component: Calendar,
  decorators: [
    (Story) => (
      <div className="height600">
        <Story />
      </div>
    ),
  ],
}

const Template = ({ localizer: loc = 'luxon', ...args }) => {
  const localizer = localizers[loc]
  return <DraggableCalendar localizer={localizer} {...args} />
}

export const DaylightSavingsStarts = Template.bind({})
DaylightSavingsStarts.argTypes = {
  localizer: {
    options: ['globalize', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsStarts.args = {
  defaultView: Views.DAY,
  localizer: 'luxon',
  min: DateTime.fromObject({ hour: 0, minute: 0 }).toJSDate(),
  max: DateTime.fromObject({ hour: 23, minute: 59 }).toJSDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 2, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2022, 2, 13, 7),
      end: new Date(2022, 2, 13, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 2, 13),
}

export const DaylightSavingsStartsAfter2Am = Template.bind({})
DaylightSavingsStartsAfter2Am.argTypes = {
  localizer: {
    options: ['globalize', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsStartsAfter2Am.args = {
  defaultView: Views.DAY,
  localizer: 'luxon',
  min: DateTime.fromObject({ hour: 3, minute: 0 }).toJSDate(),
  max: DateTime.fromObject({ hour: 23, minute: 59 }).toJSDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 2, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2022, 2, 13, 7),
      end: new Date(2022, 2, 13, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 2, 13),
}

export const DaylightSavingsEnds = Template.bind({})
DaylightSavingsEnds.argTypes = {
  localizer: {
    options: ['globalize', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsEnds.args = {
  defaultView: Views.DAY,
  localizer: 'luxon',
  min: DateTime.fromObject({ hour: 0, minute: 0 }).toJSDate(),
  max: DateTime.fromObject({ hour: 23, minute: 59 }).toJSDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2022, 10, 6, 1),
      end: new Date(2022, 10, 6, 3, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2022, 10, 6, 1),
      end: new Date(2022, 10, 6, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2022, 10, 6, 7),
      end: new Date(2022, 10, 6, 7, 45),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 10, 6),
}

export const DaylightSavingsEndsAfter2Am = Template.bind({})
DaylightSavingsEndsAfter2Am.argTypes = {
  localizer: {
    options: ['globalize', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsEndsAfter2Am.args = {
  defaultView: Views.DAY,
  localizer: 'luxon',
  min: DateTime.fromObject({ hour: 3, minute: 0 }).toJSDate(),
  max: DateTime.fromObject({ hour: 23, minute: 59 }).toJSDate(),
  events: [
    {
      title: 'After DST',
      start: new Date(2022, 10, 6, 7),
      end: new Date(2022, 10, 6, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 10, 6),
}
