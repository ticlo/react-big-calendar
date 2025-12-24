import { DateTime } from 'luxon'

export default function createEvents(idx = 0, date = new Date()) {
  const dt = DateTime.fromJSDate(date)
  const y = dt.year
  const m = dt.month
  const d = dt.day

  const dateGen = (hour, minute = 0) =>
    DateTime.fromObject({ year: y, month: m, day: d, hour, minute }).toJSDate()

  const sets = [
    [
      {
        title: 'Event 1',
        start: dateGen(10, 30),
        end: dateGen(13, 30),
      },
      {
        title: 'Event 2',
        start: dateGen(10, 30),
        end: dateGen(13, 30),
      },
      {
        title: 'Event 3',
        start: dateGen(10, 30),
        end: dateGen(12, 30),
      },
      {
        title: 'Event 4',
        start: dateGen(8, 30),
        end: dateGen(18, 0),
      },
      {
        title: 'Event 5',
        start: dateGen(15, 30),
        end: dateGen(16, 0),
      },
      {
        title: 'Event 6',
        start: dateGen(11, 0),
        end: dateGen(12, 0),
      },
      {
        title: 'Event 7',
        start: dateGen(1, 0),
        end: dateGen(2, 0),
      },
    ],
    [
      {
        title: 'Event 1',
        start: dateGen(9, 30),
        end: dateGen(15, 30),
      },
      {
        title: 'Event 2',
        start: dateGen(11, 0),
        end: dateGen(13, 0),
      },
      {
        title: 'Event 3',
        start: dateGen(9, 30),
        end: dateGen(11, 30),
      },
      {
        title: 'Event 4',
        start: dateGen(9, 30),
        end: dateGen(10, 30),
      },
      {
        title: 'Event 5',
        start: dateGen(10, 0),
        end: dateGen(11, 0),
      },
      {
        title: 'Event 6',
        start: dateGen(10, 0),
        end: dateGen(11, 0),
      },
      {
        title: 'Event 7',
        start: dateGen(9, 30),
        end: dateGen(10, 30),
      },
      {
        title: 'Event 8',
        start: dateGen(9, 30),
        end: dateGen(10, 30),
      },
      {
        title: 'Event 9',
        start: dateGen(9, 30),
        end: dateGen(10, 30),
      },
      {
        title: 'Event 10',
        start: dateGen(10, 30),
        end: dateGen(12, 30),
      },
      {
        title: 'Event 11',
        start: dateGen(12, 0),
        end: dateGen(13, 0),
      },
      {
        title: 'Event 12',
        start: dateGen(12, 0),
        end: dateGen(13, 0),
      },
      {
        title: 'Event 13',
        start: dateGen(12, 0),
        end: dateGen(13, 0),
      },
      {
        title: 'Event 14',
        start: dateGen(12, 0),
        end: dateGen(13, 0),
      },
      {
        title: 'Event 15',
        start: dateGen(6, 30),
        end: dateGen(8, 0),
      },
      {
        title: 'Event 16',
        start: dateGen(16, 0),
        end: dateGen(17, 30),
      },
    ],
    [
      {
        title: 'Event 1',
        start: dateGen(2, 30),
        end: dateGen(4, 30),
      },
      {
        title: 'Event 2',
        start: dateGen(2, 30),
        end: dateGen(3, 30),
      },
      {
        title: 'Event 3',
        start: dateGen(3, 0),
        end: dateGen(4, 0),
      },
    ],
    [
      {
        title: 'Event 1',
        start: dateGen(6, 30),
        end: dateGen(7, 0),
      },
      {
        title: 'Event 2',
        start: dateGen(8, 0),
        end: dateGen(17, 0),
      },
      {
        title: 'Event 3',
        start: dateGen(8, 0),
        end: dateGen(11, 0),
      },
      {
        title: 'Event 4',
        start: dateGen(8, 0),
        end: dateGen(12, 0),
      },
      {
        title: 'Event 5',
        start: dateGen(10, 0),
        end: dateGen(13, 0),
      },
      {
        title: 'Event 6',
        start: dateGen(10, 0),
        end: dateGen(13, 0),
      },
      {
        title: 'Event 7',
        start: dateGen(10, 0),
        end: dateGen(13, 0),
      },
    ],
    [
      {
        title: 'Event 1',
        start: dateGen(19, 0),
        end: dateGen(20, 55),
      },
      {
        title: 'Event 2',
        start: dateGen(19, 15),
        end: dateGen(20, 15),
      },
      {
        title: 'Event 3',
        start: dateGen(19, 45),
        end: dateGen(22, 30),
      },
      {
        title: 'Event 4',
        start: dateGen(20, 45),
        end: dateGen(22, 5),
      },
      {
        title: 'Event 5',
        start: dateGen(10, 0),
        end: dateGen(11, 0),
      },
      {
        title: 'Event 6',
        start: dateGen(10, 30),
        end: dateGen(11, 30),
      },
    ],
  ]

  return sets[idx]
}
