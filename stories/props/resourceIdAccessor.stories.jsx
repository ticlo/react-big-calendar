import React from 'react'
import { Calendar } from '../../src'
import { resourceAccessorStoryArgs } from './storyDefaults'
// import mdx from '...' 

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

export const ResourceIdAccessor = Template.bind({})
ResourceIdAccessor.storyName = 'resourceIdAccessor'
ResourceIdAccessor.args = resourceAccessorStoryArgs
