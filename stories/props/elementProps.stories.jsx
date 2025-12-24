import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import demoEvents from '../resources/events'
// import mdx from '...' 
import '../resources/propGetter.scss'

const mLocalizer = luxonLocalizer(DateTime)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
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

export const ElementProps = Template.bind({})
ElementProps.storyName = 'elementProps'
ElementProps.args = {
  defaultDate: new Date(2015, 3, 13),
  elementProps: { id: 'my_scheduler' },
  events: demoEvents,
  localizer: mLocalizer,
}
