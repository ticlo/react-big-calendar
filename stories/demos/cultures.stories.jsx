import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../es'
import CultureDemo from './exampleCode/cultures'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const localizer = momentLocalizer(moment)

export function Example5() {
  return <CultureDemo localizer={localizer} />
}
Example5.storyName = 'Localization'
