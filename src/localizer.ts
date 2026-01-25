import PropTypes from 'prop-types';
import invariant from 'invariant';
import type { DateTime } from 'luxon';
import {
  merge,
  inRange,
  lt,
  lte,
  gt,
  gte,
  eq,
  neq,
  startOf,
  endOf,
  add,
  range,
  diff,
  duration,
  ceil,
  min,
  max,
  firstVisibleDay,
  lastVisibleDay,
  visibleDays,
  minutes,
  isJustDate,
} from './utils/dates';
import type { Culture, Format, Messages } from './types'; // eslint-disable-line no-unused-vars

const localePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);

const defaultMessages: Messages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'All Day',
  week: 'Week',
  work_week: 'Work Week',
  day: 'Day',
  month: 'Month',
  previous: 'Back',
  next: 'Next',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',
  agenda: 'Agenda',
  noEventsInRange: 'There are no events in this range.',
  showMore: (total) => `+${total} more`,
};

function _format(localizer, formatter, value, format, culture) {
  let result =
    typeof format === 'function'
      ? format(value, culture, localizer)
      : formatter.call(localizer, value, format, culture);

  invariant(
    result == null || typeof result === 'string',
    '`localizer format(..)` must return a string, null, or undefined'
  );

  return result;
}

/**
 * This date conversion was moved out of TimeSlots.js, to
 * allow for localizer override
 * @param {Date} dt - The date to start from
 * @param {Number} minutesFromMidnight
 * @param {Number} offset
 * @returns {Date}
 */
function getSlotDate(dt, minutesFromMidnight, offset) {
  return new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    0,
    minutesFromMidnight + offset,
    0,
    0
  );
}

function getDstOffset(start, end) {
  return start.getTimezoneOffset() - end.getTimezoneOffset();
}

// if the start is on a DST-changing day but *after* the moment of DST
// transition we need to add those extra minutes to our minutesFromMidnight
function getTotalMin(start, end) {
  return diff(start, end, 'minutes') + getDstOffset(start, end);
}

function getMinutesFromMidnight(start) {
  const daystart = startOf(start, 'day');
  return diff(daystart, start, 'minutes') + getDstOffset(daystart, start);
}

// These two are used by DateSlotMetrics
function continuesPrior(start, first) {
  return lt(start, first, 'day');
}

function continuesAfter(start, end, last) {
  const singleDayDuration = eq(start, end, 'minutes');
  return singleDayDuration
    ? gte(end, last, 'minutes')
    : gt(end, last, 'minutes');
}

function daySpan(start, end) {
  return duration(start, end, 'day', 7); // Default to Sunday
}

// These two are used by eventLevels
function sortEvents({
  evtA: { start: aStart, end: aEnd, allDay: aAllDay },
  evtB: { start: bStart, end: bEnd, allDay: bAllDay },
}) {
  let startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day');

  let durA = daySpan(aStart, aEnd);

  let durB = daySpan(bStart, bEnd);

  return (
    startSort || // sort by start Day first
    durB - durA || // events spanning multiple days go first
    Number(!!bAllDay) - Number(!!aAllDay) || // then allDay single day events
    +aStart - +bStart || // then sort by start time
    +aEnd - +bEnd // then sort by end time
  );
}

function inEventRange({
  event: { start, end },
  range: { start: rangeStart, end: rangeEnd },
}) {
  let eStart = startOf(start, 'day');

  let startsBeforeEnd = lte(eStart, rangeEnd, 'day');
  // when the event is zero duration we need to handle a bit differently
  const sameMin = neq(eStart, end, 'minutes');
  let endsAfterStart = sameMin
    ? gt(end, rangeStart, 'minutes')
    : gte(end, rangeStart, 'minutes');
  return startsBeforeEnd && endsAfterStart;
}

// other localizers treats 'day' and 'date' equality very differently, so we
// abstract the change the 'localizer.eq(date1, date2, 'day') into this
// new method, where they can be treated correctly by the localizer overrides
function isSameDate(date1, date2) {
  return eq(date1, date2, 'day');
}

function startAndEndAreDateOnly(start, end) {
  return isJustDate(start) && isJustDate(end);
}

export class DateLocalizer {
  propType: typeof PropTypes.string;
  formats: { [key: string]: Format };
  format: (value: DateTime, format: Format, culture?: Culture) => string;
  startOfWeek: (culture?: Culture) => number;
  merge: (date: DateTime, time: DateTime) => DateTime;
  inRange: (
    date: DateTime,
    min: DateTime,
    max: DateTime,
    unit?: string
  ) => boolean;
  lt: (date: DateTime, b: DateTime, unit?: string) => boolean;
  lte: (date: DateTime, b: DateTime, unit?: string) => boolean;
  gt: (date: DateTime, b: DateTime, unit?: string) => boolean;
  gte: (date: DateTime, b: DateTime, unit?: string) => boolean;
  eq: (date: DateTime, b: DateTime, unit?: string) => boolean;
  neq: (date: DateTime, b: DateTime, unit?: string) => boolean;
  startOf: (date: DateTime, unit?: string, firstOfWeek?: number) => DateTime;
  endOf: (date: DateTime, unit?: string, firstOfWeek?: number) => DateTime;
  add: (date: DateTime, amount: number, unit?: string) => DateTime;
  range: (start: DateTime, end: DateTime, unit?: string) => DateTime[];
  diff: (a: DateTime, b: DateTime, unit?: string) => number;
  ceil: (date: DateTime, unit: string) => DateTime;
  min: (a: DateTime, b: DateTime) => DateTime;
  max: (a: DateTime, b: DateTime) => DateTime;
  minutes: (date: DateTime) => number;
  daySpan: (start: DateTime, end: DateTime) => number;
  firstVisibleDay: (date: DateTime, culture?: Culture) => DateTime;
  lastVisibleDay: (date: DateTime, culture?: Culture) => DateTime;
  visibleDays: (date: DateTime, culture?: Culture) => DateTime[];
  getSlotDate: (
    dt: DateTime,
    minutesFromMidnight: number,
    offset: number
  ) => DateTime;
  getTimezoneOffset: (value: DateTime) => number;
  getDstOffset: (start: DateTime, end: DateTime) => number;
  getTotalMin: (start: DateTime, end: DateTime) => number;
  getMinutesFromMidnight: (start: DateTime) => number;
  continuesPrior: (start: DateTime, first: DateTime) => boolean;
  continuesAfter: (start: DateTime, end: DateTime, last: DateTime) => boolean;
  sortEvents: (args: {
    evtA: { start: DateTime; end: DateTime; allDay?: boolean };
    evtB: { start: DateTime; end: DateTime; allDay?: boolean };
  }) => number;
  inEventRange: (args: {
    event: { start: DateTime; end: DateTime };
    range: { start: DateTime; end: DateTime };
  }) => boolean;
  isSameDate: (date1: DateTime, date2: DateTime) => boolean;
  startAndEndAreDateOnly: (start: DateTime, end: DateTime) => boolean;
  segmentOffset: number;
  timezone?: string;
  culture?: string;
  messages: Messages;

  constructor(spec: any) {
    invariant(
      typeof spec.format === 'function',
      'date localizer `format(..)` must be a function'
    );
    invariant(
      typeof spec.firstOfWeek === 'function',
      'date localizer `firstOfWeek(..)` must be a function'
    );

    this.propType = spec.propType || localePropType;

    this.formats = spec.formats;
    this.format = function (value: any, format: Format, culture?: Culture) {
      return _format(
        this,
        spec.format,
        value,
        this.formats[format as string] || format,
        culture || this.culture
      );
    };
    // These date arithmetic methods can be overriden by the localizer
    this.startOfWeek = () => {
      const culture = this.culture;
      return spec.firstOfWeek(culture);
    };
    this.merge = spec.merge || merge;
    this.inRange = spec.inRange || inRange;
    this.lt = spec.lt || lt;
    this.lte = spec.lte || lte;
    this.gt = spec.gt || gt;
    this.gte = spec.gte || gte;
    this.eq = spec.eq || eq;
    this.neq = spec.neq || neq;
    this.startOf = spec.startOf || startOf;
    this.endOf = spec.endOf || endOf;
    this.add = spec.add || add;
    this.range = spec.range || range;
    this.diff = spec.diff || diff;
    this.ceil = spec.ceil || ceil;
    this.min = spec.min || min;
    this.max = spec.max || max;
    this.minutes = spec.minutes || minutes;
    this.daySpan = spec.daySpan || daySpan;
    this.firstVisibleDay = spec.firstVisibleDay || firstVisibleDay;
    this.lastVisibleDay = spec.lastVisibleDay || lastVisibleDay;
    this.visibleDays = spec.visibleDays || visibleDays;

    this.getSlotDate = spec.getSlotDate || getSlotDate;
    this.getTimezoneOffset =
      spec.getTimezoneOffset || ((value: any) => value.getTimezoneOffset());
    this.getDstOffset = spec.getDstOffset || getDstOffset;
    this.getTotalMin = spec.getTotalMin || getTotalMin;
    this.getMinutesFromMidnight =
      spec.getMinutesFromMidnight || getMinutesFromMidnight;
    this.continuesPrior = spec.continuesPrior || continuesPrior;
    this.continuesAfter = spec.continuesAfter || continuesAfter;
    this.sortEvents = spec.sortEvents || sortEvents;
    this.inEventRange = spec.inEventRange || inEventRange;
    this.isSameDate = spec.isSameDate || isSameDate;
    this.startAndEndAreDateOnly =
      spec.startAndEndAreDateOnly || startAndEndAreDateOnly;
    this.segmentOffset = spec.browserTZOffset ? spec.browserTZOffset() : 0;
    this.timezone = spec.timezone;
    this.culture = spec.culture;
    this.messages = { ...defaultMessages, ...spec.messages };
  }
}
