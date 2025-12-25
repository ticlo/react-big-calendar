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
    events: { control: { type: null } },
    culture: {
      options: ['es', 'fr', 'en-us', 'en-gb'],
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    docs: {
      page: null // mdx removed ,
    },
  },
}

const Template = ({ culture, ...args }) => {
  const localizer = React.useMemo(
    () => luxonLocalizer(DateTime, { culture }),
    [culture]
  )
  return (
    <div className="height600">
      <Calendar {...args} localizer={localizer} />
    </div>
  )
}

export const Culture = Template.bind({})
Culture.storyName = 'culture'
Culture.args = {
  defaultDate: new Date(2015, 3, 13),
  events: demoEvents,
  localizer: mLocalizer,
  culture: 'es',
}
