import React, { Fragment, useState, useMemo } from 'react'
import { Calendar, luxonLocalizer, Views } from '../../../src'
import { DateTime } from 'luxon'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import TimezoneSelect from '../TimezoneSelect'

const defaultTZ = DateTime.local().zoneName
const defaultDateStr = '2015-04-13'

export default function Timezones() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      return {
        defaultDate: DateTime.fromISO(defaultDateStr).toJSDate(),
        getNow: () => DateTime.now().setZone(timezone).toJSDate(),
        localizer: luxonLocalizer(DateTime, { timezone }),
        myEvents: [...events],
        scrollToTime: DateTime.now().setZone(timezone).toJSDate(),
      }
    }, [timezone])

  return (
    <Fragment>
      <DemoLink fileName="timezones">
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={setTimezone}
          timezone={timezone}
        />
      </DemoLink>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          getNow={getNow}
          localizer={localizer}
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}
