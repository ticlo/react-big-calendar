import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, Views, luxonLocalizer } from '../src'
import { uncontrollable } from 'uncontrollable'
import '../src/sass/styles.scss'

const localizer = luxonLocalizer(DateTime)

const BaseCalendar = uncontrollable(Calendar, {
    view: 'onView',
    date: 'onNavigate',
    selected: 'onSelectEvent',
})

const now = DateTime.now()

const events = [
    {
        title: 'Morning Meeting (9 AM UTC)',
        start: DateTime.fromObject({ hour: 9 }, { zone: 'UTC' }).toJSDate(),
        end: DateTime.fromObject({ hour: 10 }, { zone: 'UTC' }).toJSDate(),
    },
    {
        title: 'Afternoon Tea (3 PM UTC)',
        start: DateTime.fromObject({ hour: 15 }, { zone: 'UTC' }).toJSDate(),
        end: DateTime.fromObject({ hour: 16 }, { zone: 'UTC' }).toJSDate(),
    },
]

export default {
    title: 'Timezone Support',
    component: Calendar,
    decorators: [
        (Story) => (
            <div style={{ height: 600 }}>
                <Story />
            </div>
        ),
    ],
}

const Template = (args) => <BaseCalendar localizer={localizer} {...args} />

export const UTC = Template.bind({})
UTC.args = {
    defaultView: Views.DAY,
    defaultDate: now.toJSDate(),
    events: events,
    timezone: 'UTC',
}

export const NewYork = Template.bind({})
NewYork.args = {
    defaultView: Views.DAY,
    defaultDate: now.toJSDate(),
    events: events,
    timezone: 'America/New_York',
}

export const Tokyo = Template.bind({})
Tokyo.args = {
    defaultView: Views.DAY,
    defaultDate: now.toJSDate(),
    events: events,
    timezone: 'Asia/Tokyo',
}
