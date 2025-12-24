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
    defaultDate: { control: { type: null } },
    defaultView: { control: { type: null } },
    events: { control: { type: null } },
    max: { control: { type: 'date' } },
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

export const Max = Template.bind({})
Max.storyName = 'max'
Max.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.WEEK,
  events: demoEvents,
  localizer: mLocalizer,
  max: new Date(1972, 0, 1, 20, 59, 59),
}
