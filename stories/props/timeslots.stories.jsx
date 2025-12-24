import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
import demoEvents from '../resources/events'
// import mdx from '...' 

const mLocalizer = luxonLocalizer(DateTime)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultDate: {
      control: {
        type: null,
      },
    },
    defaultView: {
      control: {
        type: null,
      },
    },
    step: 'number',
    timeslots: 'number',
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

export const Timeslots = Template.bind({})
Timeslots.storyName = 'timeslots'
Timeslots.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.WEEK,
  events: demoEvents,
  localizer: mLocalizer,
  step: 15,
  timeslots: 4,
}
