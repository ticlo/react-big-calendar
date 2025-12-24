import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import PopupDemo from './exampleCode/popup'

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

export function Example6() {
  return <PopupDemo localizer={localizer} />
}
Example6.storyName = 'Show more via a popup'
