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
    defaultView: {
      control: {
        type: null,
      },
    },
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

export const DefaultDate = Template.bind({})
DefaultDate.storyName = 'defaultDate'
DefaultDate.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.DAY,
  events: demoEvents,
  localizer: mLocalizer,
}
