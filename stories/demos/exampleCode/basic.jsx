import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import {
  Calendar,
  Views,
  DateLocalizer,
  luxonLocalizer,
} from '../../../src'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'

const l = luxonLocalizer(DateTime)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
  localizer = l,
  showDemoLink = true,
  ...props
}) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: DateTime.fromObject({ year: 2015, month: 4, day: 1 }),
      max: DateTime.fromObject({ year: 2015, month: 4, day: 1, hour: 23 }),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )

  return (
    <Fragment>
      {showDemoLink ? <DemoLink fileName="basic" /> : null}
      <div className="height600" {...props}>
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={views}
        />
      </div>
    </Fragment>
  )
}
Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}
