import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
// import mdx from '...' 

const mLocalizer = luxonLocalizer(DateTime)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    defaultDate: { control: { type: null } },
    defaultView: { control: { type: null } },
    max: { control: { type: null } },
    showMultiDayTimes: 'boolean',
  },
  parameters: {
    docs: {
      page: null // mdx removed ,
    },
  },
}

const Template = (args) => (
  <div className="height600">
    <Calendar {...args} />
  </div>
)

export const ShowMultiDayTimes = Template.bind({})
ShowMultiDayTimes.storyName = 'showMultiDayTimes'
ShowMultiDayTimes.args = {
  defaultDate: new Date(2016, 11, 4),
  defaultView: Views.WEEK,
  events: [
    {
      title: 'start of the week',
      start: new Date(2016, 11, 4, 15),
      end: new Date(2016, 11, 5, 3),
    },
    {
      title: 'single day longer than max',
      start: new Date(2016, 11, 4, 15),
      end: new Date(2016, 11, 4, 23, 30),
    },
    {
      title: 'end of the week',
      start: new Date(2016, 11, 3),
      end: new Date(2016, 11, 3),
    },
    {
      title: 'middle',
      start: new Date(2016, 11, 6),
      end: new Date(2016, 11, 6),
    },
  ],
  localizer: mLocalizer,
  max: DateTime.now().endOf('day').minus({ hours: 1 }).toJSDate(),
  showMultiDayTimes: true,
}
