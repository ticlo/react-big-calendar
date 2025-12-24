import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../../src'
import allDayEvents from '../resources/allDayEvents'
// import mdx from '...' 

const mLocalizer = luxonLocalizer(DateTime)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultDate: { control: { type: null } },
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

export const AllDayMaxRows = Template.bind({})
AllDayMaxRows.storyName = 'allDayMaxRows'
AllDayMaxRows.args = {
  defaultDate: new Date(2015, 3, 1),
  defaultView: Views.WEEK,
  events: allDayEvents,
  localizer: mLocalizer,
  allDayMaxRows: 2,
  popup: true,
}
