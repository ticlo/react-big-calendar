import { DateTime } from 'luxon'

export default {
  events: [
    {
      title: 'Rencontre',
      resourceId: 'a',
      start: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 2,
        hour: 5,
        minute: 30,
      }).toJSDate(),
      end: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 2,
        hour: 10,
        minute: 30,
      }).toJSDate(),
    },
    {
      title: 'Another Meeting',
      resourceId: 'b',
      start: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 1,
        hour: 2,
        minute: 30,
      }).toJSDate(),
      end: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 1,
        hour: 4,
        minute: 30,
      }).toJSDate(),
    },
    {
      title: 'A',
      resourceId: 'a',
      start: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 4,
        hour: 5,
        minute: 30,
      }).toJSDate(),
      end: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 4,
        hour: 10,
        minute: 30,
      }).toJSDate(),
    },
    {
      title: 'B',
      resourceId: 'b',
      start: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 4,
        hour: 5,
        minute: 30,
      }).toJSDate(),
      end: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 4,
        hour: 10,
        minute: 30,
      }).toJSDate(),
    },
    {
      title: 'C',
      resourceId: 'c',
      start: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 4,
        hour: 5,
        minute: 30,
      }).toJSDate(),
      end: DateTime.fromObject({
        year: 2015,
        month: 4,
        day: 4,
        hour: 10,
        minute: 30,
      }).toJSDate(),
    },
  ],

  list: [
    {
      id: 'a',
      title: 'Room A',
    },
    {
      id: 'b',
      title: 'Room B',
    },
    {
      id: 'c',
      title: 'Room C',
    },
  ],
}
