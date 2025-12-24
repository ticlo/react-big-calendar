import { DateTime } from 'luxon'
import { luxonLocalizer, Views } from '../../src'
import demoEvents from '../resources/events'
import resourceData from '../resources/resourceEvents'

const { events: resourceEvents, list: resources } = resourceData

const lLocalizer = luxonLocalizer(DateTime)

/** Specific to event key accessors */
const adjusted = demoEvents.map((event) => {
  const {
    start: startDate,
    end: endDate,
    title: label,
    allDay: allDayEvent,
    ...other
  } = event
  return { ...other, startDate, endDate, label, allDayEvent }
})

export const accessorStoryArgs = {
  allDayAccessor: 'allDayEvent',
  defaultDate: DateTime.fromObject({ year: 2015, month: 4, day: 13 }).toJSDate(),
  endAccessor: 'endDate',
  events: adjusted,
  localizer: lLocalizer,
  titleAccessor: 'label',
  tooltipAccessor: 'label',
  startAccessor: 'startDate',
}
/** END Specific to event key accessors */

/** Specific to resource key accessors */
const adjustedResources = resources.map(({ id: Id, title: Title }) => ({
  Id,
  Title,
}))

export const resourceAccessorStoryArgs = {
  defaultDate: DateTime.fromObject({ year: 2015, month: 4, day: 4 }).toJSDate(),
  defaultView: Views.DAY,
  events: resourceEvents,
  localizer: lLocalizer,
  resourceIdAccessor: 'Id',
  resources: adjustedResources,
  resourceTitleAccessor: 'Title',
}
/** ENDSpecific to resource key accessors */
