import React from 'react'
import { Calendar } from '../../src'
import { accessorStoryArgs } from './storyDefaults'
// import mdx from '...' 

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

export const AllDayAccessor = Template.bind({})
AllDayAccessor.storyName = 'allDayAccessor'
AllDayAccessor.args = accessorStoryArgs
