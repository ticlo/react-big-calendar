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
    drilldownView: {
      control: {
        type: 'select',
        options: ['day', 'agenda'],
        defaultValue: Views.DAY,
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

export const DrilldownView = Template.bind({})
DrilldownView.storyName = 'drilldownView'
DrilldownView.args = {
  defaultDate: new Date(2015, 3, 1),
  drilldownView: Views.AGENDA,
  events: demoEvents,
  localizer: mLocalizer,
}
