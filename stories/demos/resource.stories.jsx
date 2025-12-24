import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import Resource from './exampleCode/resource'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const localizer = luxonLocalizer(DateTime)

export function Example11() {
  return <Resource localizer={localizer} />
}
Example11.storyName = 'Resource Scheduling'
