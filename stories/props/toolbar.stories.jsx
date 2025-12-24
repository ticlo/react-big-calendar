import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
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
    toolbar: 'boolean',
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

export const Toolbar = Template.bind({})
Toolbar.storyName = 'toolbar'
Toolbar.args = {
  defaultDate: new Date(2015, 3, 13),
  events: demoEvents,
  localizer: mLocalizer,
  toolbar: true,
}
