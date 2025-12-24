import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import Basic from './exampleCode/basic'

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

export function Example1() {
  return <Basic localizer={localizer} />
}
Example1.storyName = 'Basic Demo'
