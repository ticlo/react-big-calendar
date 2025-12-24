import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import CustomView from './exampleCode/customView'

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

export function Example9() {
  return <CustomView localizer={localizer} />
}
Example9.storyName = 'Custom Calendar Views'
