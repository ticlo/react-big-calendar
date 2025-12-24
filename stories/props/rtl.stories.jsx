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
    rtl: 'boolean',
  },
  parameters: {
    docs: {
      page: null // mdx removed ,
    },
  },
}

// TODO: localize example for Arabic
const Template = (args) => (
  <div className="height600">
    <Calendar {...args} />
  </div>
)

export const RightToLeft = Template.bind({})
RightToLeft.storyName = 'rtl'
RightToLeft.args = {
  defaultDate: new Date(2015, 3, 13),
  events: demoEvents,
  localizer: mLocalizer,
  rtl: true,
  messages: {
    week: 'أسبوع',
    work_week: 'أسبوع العمل',
    day: 'يوم',
    month: 'شهر',
    previous: 'سابق',
    next: 'التالي',
    today: 'اليوم',
    agenda: 'جدول أعمال',

    showMore: (total) => `+${total} إضافي`,
  },
}
