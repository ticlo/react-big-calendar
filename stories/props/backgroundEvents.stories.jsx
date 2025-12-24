import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
import { backgroundEvents, events } from '../helpers'
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

export const BackGroundEvents = Template.bind({})
BackGroundEvents.storyName = 'backgroundEvents'
BackGroundEvents.args = {
  backgroundEvents,
  defaultView: Views.WEEK,
  events,
  localizer: mLocalizer,
}
