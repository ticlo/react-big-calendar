import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
import resourceData from '../resources/resourceEvents'
// import mdx from '...' 

const { events: resourceEvents, list: resources } = resourceData

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

export const Resources = Template.bind({})
Resources.storyName = 'resources'
Resources.args = {
  defaultDate: new Date(2015, 3, 4),
  defaultView: Views.DAY,
  events: resourceEvents,
  localizer: mLocalizer,
  resources,
}
