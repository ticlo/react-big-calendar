import { DateTime } from 'luxon'

export default [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: DateTime.fromObject({ year: 2015, month: 3, day: 31 }).toJSDate(),
    end: DateTime.fromObject({ year: 2015, month: 4, day: 1 }).toJSDate(),
  },
  {
    id: 1,
    title: '#2 All Day Event very long title',
    allDay: true,
    start: DateTime.fromObject({ year: 2015, month: 3, day: 31 }).toJSDate(),
    end: DateTime.fromObject({ year: 2015, month: 4, day: 2 }).toJSDate(),
  },
  {
    id: 2,
    title: '#3 All Day Event very long title',
    allDay: true,
    start: DateTime.fromObject({ year: 2015, month: 3, day: 31 }).toJSDate(),
    end: DateTime.fromObject({ year: 2015, month: 4, day: 1 }).toJSDate(),
  },
  {
    id: 3,
    title: '#4 All Day Event',
    allDay: true,
    start: DateTime.fromObject({ year: 2015, month: 3, day: 31 }).toJSDate(),
    end: DateTime.fromObject({ year: 2015, month: 4, day: 1 }).toJSDate(),
  },
  {
    id: 4,
    title: '#5 All Day Event',
    allDay: true,
    start: DateTime.fromObject({ year: 2015, month: 3, day: 31 }).toJSDate(),
    end: DateTime.fromObject({ year: 2015, month: 4, day: 1 }).toJSDate(),
  },
  {
    id: 5,
    title: '#6 All Day Event',
    allDay: true,
    start: DateTime.fromObject({ year: 2015, month: 4, day: 7 }).toJSDate(),
    end: DateTime.fromObject({ year: 2015, month: 4, day: 7 }).toJSDate(),
  },
]
