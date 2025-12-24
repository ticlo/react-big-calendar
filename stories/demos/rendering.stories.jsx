import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import Rendering from './exampleCode/rendering'

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

export function Example8() {
  return <Rendering localizer={localizer} />
}
Example8.storyName = 'Customized Component Rendering'
