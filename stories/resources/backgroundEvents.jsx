import { DateTime } from 'luxon'

export default [
  {
    id: 0,
    title: 'Available for Clients',
    start: DateTime.fromObject({
      year: 2015,
      month: 4,
      day: 13,
      hour: 6,
    }).toJSDate(),
    end: DateTime.fromObject({
      year: 2015,
      month: 4,
      day: 13,
      hour: 18,
    }).toJSDate(),
  },
]
