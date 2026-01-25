import { action } from '@storybook/addon-actions';

import { DateTime } from 'luxon';
import React from 'react';
import { uncontrollable } from 'uncontrollable';
import { Calendar as ControledCalendar, luxonLocalizer } from '../../src';

// For Testing SASS styling
import '../../src/sass/styles.scss';

export { Views } from '../../src';

const now = DateTime.now();

const BaseCalendar = uncontrollable(ControledCalendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent',
});

export const date = (year, month, day, hour = 0, minute = 0, second = 0) =>
  DateTime.fromObject({ year, month, day, hour, minute, second });

export const getNow = () => DateTime.now();

export const Calendar = ({
  culture,
  messages,
  formats,
  localizer,
  ...props
}) => {
  const memoizedLocalizer = React.useMemo(
    () => localizer || luxonLocalizer(DateTime, { culture, messages, formats }),
    [localizer, culture, messages, formats]
  );
  return (
    <div style={{ height: 650 }}>
      <BaseCalendar localizer={memoizedLocalizer} {...props} />
    </div>
  );
};

export const DragAndDropCalendar = (props) => {
  return (
    <Calendar
      popup
      selectable
      onEventDrop={action('event dropped')}
      onSelectEvent={action('event selected')}
      onSelectSlot={action('slot selected')}
      {...props}
    />
  );
};
export const DragableCalendar = DragAndDropCalendar;

export const events = [
  {
    title: 'test',
    start: now.plus({ hour: 19 }),
    end: now.plus({ hour: 20 }),
    allDay: false,
  },
  {
    title: 'test larger',
    start: now.startOf('day').plus({ hour: 5 }),
    end: now.startOf('day').plus({ hour: 10 }),
    allDay: false,
  },

  {
    title: 'test larger',
    start: now.startOf('day').plus({ hour: 15 }),
    end: now.startOf('day').plus({ hour: 23 }),
    allDay: false,
  },
  {
    title: 'test all day',
    start: now.startOf('day'),
    end: now.endOf('day'),
    allDay: true,
  },
  {
    title: 'test 2 days',
    start: now.startOf('day'),
    end: now.startOf('day').plus({ day: 2 }),
    allDay: true,
  },
  {
    title: 'test multi-day',
    start: now.startOf('day'),
    end: now.startOf('day').plus({ day: 3 }),
    allDay: false,
  },
];

export const backgroundEvents = [
  {
    title: 'test background event',
    start: now.startOf('day').plus({ hour: 2 }),
    end: now.startOf('day').plus({ hour: 12 }),
    allDay: false,
  },
];

export const resourceEvents = [
  {
    title: 'event 1',
    start: now.startOf('day').plus({ hour: 1 }),
    end: now.startOf('day').plus({ hour: 2 }),
    allDay: false,
    resourceId: 1,
  },
  {
    title: 'event 2',
    start: now.startOf('day').plus({ hour: 3 }),
    end: now.startOf('day').plus({ hour: 4 }),
    allDay: false,
    resourceId: [1, 2],
  },
  {
    title: 'event 3',
    start: now.startOf('day').plus({ hour: 1 }),
    end: now.startOf('day').plus({ hour: 3 }),
    allDay: false,
    resourceId: 3,
  },
];

export const resources = [
  {
    id: 1,
    name: 'Resource One',
  },
  {
    id: 2,
    name: 'Resource Two',
  },
  {
    id: 3,
    name: 'Resource Three',
  },
];
