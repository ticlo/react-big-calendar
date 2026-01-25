import { DateTime } from 'luxon';
import { DateLocalizer } from '../localizer';
import type { Culture, DateRange, Formats, Messages } from '../types';

type DateUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds';

function pluralizeUnit(unit: string): string {
  return /s$/.test(unit) ? unit : unit + 's';
}

const weekRangeFormat = (
  { start, end }: DateRange,
  culture: Culture | undefined,
  local: DateLocalizer
): string =>
  local.format(start, 'LLLL dd', culture) +
  ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'dd' : 'LLLL dd', culture);

const timeRangeFormat = (
  { start, end }: DateRange,
  culture: Culture | undefined,
  local: DateLocalizer
): string => {
  if (start.month === end.month && start.day === end.day) {
    return (
      local.format(start, 't', culture) +
      ' – ' +
      local.format(end, 't', culture)
    );
  }
  return (
    local.format(start, 'ff', culture) +
    ' – ' +
    local.format(end, 'ff', culture)
  );
};

const timeRangeStartFormat = (
  { start }: { start: DateTime },
  culture: Culture | undefined,
  local: DateLocalizer
): string => local.format(start, 't', culture) + ' – ';

const timeRangeEndFormat = (
  { end }: { end: DateTime },
  culture: Culture | undefined,
  local: DateLocalizer
): string => ' – ' + local.format(end, 't', culture);

export const formats = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'EEE',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 't',

  monthHeaderFormat: 'LLLL yyyy',
  dayHeaderFormat: 'EEEE LLL dd',
  dayRangeHeaderFormat: weekRangeFormat,
};

function fixUnit(unit: string | undefined): string | undefined {
  let datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit;
  if (datePart === 'FullYear') {
    datePart = 'year';
  } else if (!datePart) {
    datePart = undefined;
  }
  return datePart;
}

interface LuxonLocalizerOptions {
  firstDayOfWeek?: number;
  timezone?: string;
  culture?: string;
  messages?: Messages;
  formats?: Partial<Formats>;
}

// Luxon does not currently have weekInfo by culture
// Luxon uses 1 based values for month and weekday
// So we default to Sunday (7)
export default function luxonLocalizer(
  DateTimeClass: typeof DateTime,
  {
    firstDayOfWeek = 7,
    timezone: defaultTimezone = undefined,
    culture = undefined,
    messages = undefined,
    formats: formatOverrides = undefined,
  }: LuxonLocalizerOptions = {}
): DateLocalizer {
  const validatedTimezone: string | undefined =
    defaultTimezone && !DateTimeClass.now().setZone(defaultTimezone).isValid
      ? 'Factory'
      : defaultTimezone;

  const fromJSDate = (
    date: DateTime | Date | null | undefined,
    localizer?: DateLocalizer
  ): DateTime => {
    if (date && DateTimeClass.isDateTime(date)) {
      if (
        localizer &&
        localizer.timezone &&
        date.zoneName !== localizer.timezone
      ) {
        return date.setZone(localizer.timezone);
      }
      return date;
    }
    return DateTimeClass.fromJSDate(date as Date, {
      zone: localizer ? localizer.timezone : undefined,
    });
  };

  function formatDate(
    this: DateLocalizer,
    value: DateTime,
    format: string
  ): string {
    return fromJSDate(value, this).toFormat(format);
  }

  function formatDateWithCulture(
    this: DateLocalizer,
    value: DateTime,
    culture: string,
    format: string
  ): string {
    return fromJSDate(value, this).setLocale(culture).toFormat(format);
  }

  /*** BEGIN localized date arithmetic methods with Luxon ***/
  function defineComparators(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit?: string
  ): [DateTime, DateTime, string | undefined] {
    const datePart = fixUnit(unit);
    const dtA = datePart
      ? fromJSDate(a, this).startOf(datePart as keyof DateTime)
      : fromJSDate(a, this);
    const dtB = datePart
      ? fromJSDate(b, this).startOf(datePart as keyof DateTime)
      : fromJSDate(b, this);
    return [dtA, dtB, datePart];
  }

  // Since Luxon (and current Intl API) has no support
  // for culture based weekInfo, we need to handle
  // the start of the week differently
  // depending on locale, the firstDayOfWeek could also be Saturday, Sunday or Monday
  function startOfDTWeek(dtObj: DateTime): DateTime {
    const weekday = dtObj.weekday;
    if (weekday === firstDayOfWeek) {
      return dtObj.startOf('day'); // already beginning of week
    } else if (firstDayOfWeek === 1) {
      return dtObj.startOf('week'); // fow is Monday, which is Luxon default
    }
    const diff =
      firstDayOfWeek === 7 ? weekday : weekday + (7 - firstDayOfWeek);
    return dtObj.minus({ day: diff }).startOf('day');
  }

  function endOfDTWeek(dtObj: DateTime): DateTime {
    const weekday = dtObj.weekday;
    const eow = firstDayOfWeek === 1 ? 7 : firstDayOfWeek - 1;
    if (weekday === eow) {
      return dtObj.endOf('day'); // already last day of the week
    } else if (firstDayOfWeek === 1) {
      return dtObj.endOf('week'); // use Luxon default (Sunday)
    }
    const fromDate =
      firstDayOfWeek > eow ? dtObj.plus({ day: firstDayOfWeek - eow }) : dtObj;
    return fromDate.set({ weekday: eow }).endOf('day');
  }

  // This returns a DateTime instance
  function startOfDT(
    this: DateLocalizer,
    date: DateTime | undefined,
    unit?: string
  ): DateTime {
    if (!date) date = DateTimeClass.now().setZone(this.timezone);
    const datePart = fixUnit(unit);
    if (datePart) {
      const dt = fromJSDate(date, this);
      return datePart.includes('week')
        ? startOfDTWeek(dt)
        : dt.startOf(datePart as keyof DateTime);
    }
    return fromJSDate(date, this);
  }

  function firstOfWeek(): number {
    return firstDayOfWeek;
  }

  // This returns a DateTime from a DateTime instance
  function startOf(
    this: DateLocalizer,
    date: DateTime,
    unit?: string
  ): DateTime {
    return startOfDT.call(this, date, unit);
  }

  // This returns a DateTime instance
  function endOfDT(
    this: DateLocalizer,
    date: DateTime | undefined,
    unit?: string
  ): DateTime {
    if (!date) date = DateTimeClass.now().setZone(this.timezone);
    const datePart = fixUnit(unit);
    if (datePart) {
      const dt = fromJSDate(date, this);
      return datePart.includes('week')
        ? endOfDTWeek(dt)
        : dt.endOf(datePart as keyof DateTime);
    }
    return fromJSDate(date, this);
  }

  function endOf(this: DateLocalizer, date: DateTime, unit?: string): DateTime {
    return endOfDT.call(this, date, unit);
  }

  function eq(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit?: string
  ): boolean {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA == +dtB;
  }

  function neq(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit?: string
  ): boolean {
    return !eq.call(this, a, b, unit);
  }

  function gt(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit?: string
  ): boolean {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA > +dtB;
  }

  function lt(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit?: string
  ): boolean {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA < +dtB;
  }

  function gte(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit?: string
  ): boolean {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA >= +dtB;
  }

  function lte(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit?: string
  ): boolean {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA <= +dtB;
  }

  function inRange(
    this: DateLocalizer,
    day: DateTime,
    min: DateTime,
    max: DateTime,
    unit: string = 'day'
  ): boolean {
    const datePart = fixUnit(unit);
    const mDay = startOfDT.call(this, day, datePart);
    const mMin = startOfDT.call(this, min, datePart);
    const mMax = startOfDT.call(this, max, datePart);
    return +mDay >= +mMin && +mDay <= +mMax;
  }

  function min(
    this: DateLocalizer,
    dateA: DateTime,
    dateB: DateTime
  ): DateTime {
    const dtA = fromJSDate(dateA, this);
    const dtB = fromJSDate(dateB, this);
    return DateTimeClass.min(dtA, dtB);
  }

  function max(
    this: DateLocalizer,
    dateA: DateTime,
    dateB: DateTime
  ): DateTime {
    const dtA = fromJSDate(dateA, this);
    const dtB = fromJSDate(dateB, this);
    return DateTimeClass.max(dtA, dtB);
  }

  function merge(
    this: DateLocalizer,
    date: DateTime,
    time: DateTime
  ): DateTime {
    const tm = fromJSDate(time, this);
    const dt = startOfDT.call(this, date, 'day');
    return dt.set({
      hour: tm.hour,
      minute: tm.minute,
      second: tm.second,
      millisecond: tm.millisecond,
    });
  }

  function add(
    this: DateLocalizer,
    date: DateTime,
    adder: number,
    unit?: string
  ): DateTime {
    const datePart = fixUnit(unit);
    return fromJSDate(date, this).plus({ [datePart as string]: adder });
  }

  function range(
    this: DateLocalizer,
    start: DateTime,
    end: DateTime,
    unit: string = 'day'
  ): DateTime[] {
    const datePart = fixUnit(unit);
    let current = fromJSDate(start, this);
    const days: DateTime[] = [];

    while (lte.call(this, current, end)) {
      days.push(current);
      current = add.call(this, current, 1, datePart);
    }

    return days;
  }

  function ceil(this: DateLocalizer, date: DateTime, unit: string): DateTime {
    const datePart = fixUnit(unit);
    const floor = startOf.call(this, date, datePart);

    return eq.call(this, floor, date)
      ? floor
      : add.call(this, floor, 1, datePart);
  }

  function diff(
    this: DateLocalizer,
    a: DateTime,
    b: DateTime,
    unit: string = 'day'
  ): number {
    const datePart = fixUnit(unit);
    // don't use 'defineComparators' here, as we don't want to mutate the values
    const dtA = fromJSDate(a, this);
    const dtB = fromJSDate(b, this);
    return Math.floor(
      dtB
        .diff(dtA, datePart as keyof DateTime, {
          conversionAccuracy: 'longterm',
        })
        .toObject()[datePart as string] as number
    );
  }

  function firstVisibleDay(this: DateLocalizer, date: DateTime): DateTime {
    const startOfMonth = startOfDT.call(this, date, 'month');
    return startOfDTWeek(startOfMonth);
  }

  function lastVisibleDay(this: DateLocalizer, date: DateTime): DateTime {
    const endOfMonth = endOfDT.call(this, date, 'month');
    return endOfDTWeek(endOfMonth);
  }

  function visibleDays(this: DateLocalizer, date: DateTime): DateTime[] {
    let current = fromJSDate(firstVisibleDay.call(this, date), this);
    const last = lastVisibleDay.call(this, date);
    const days: DateTime[] = [];

    while (lte.call(this, current, last)) {
      days.push(current);
      current = add.call(this, current, 1, 'day');
    }

    return days;
  }
  /*** END localized date arithmetic methods with moment ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using moment to construct the DateTime
   * @param dt - date to start with
   * @param minutesFromMidnight
   * @param offset
   * @returns DateTime
   */
  function getSlotDate(
    this: DateLocalizer,
    dt: DateTime,
    minutesFromMidnight: number,
    offset: number
  ): DateTime {
    return startOfDT
      .call(this, dt, 'day')
      .set({ minute: minutesFromMidnight + offset });
  }

  // Luxon will automatically handle DST differences in it's calculations
  function getTotalMin(
    this: DateLocalizer,
    start: DateTime,
    end: DateTime
  ): number {
    return diff.call(this, start, end, 'minutes');
  }

  function getMinutesFromMidnight(
    this: DateLocalizer,
    start: DateTime
  ): number {
    const dayStart = startOfDT.call(this, start, 'day');
    const day = fromJSDate(start, this);
    return Math.round(
      day
        .diff(dayStart, 'minutes', { conversionAccuracy: 'longterm' })
        .toObject().minutes as number
    );
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(
    this: DateLocalizer,
    start: DateTime,
    first: DateTime
  ): boolean {
    return lt.call(this, start, first);
  }

  function continuesAfter(
    this: DateLocalizer,
    start: DateTime,
    end: DateTime,
    last: DateTime
  ): boolean {
    return gte.call(this, end, last);
  }

  function daySpan(
    this: DateLocalizer,
    start: DateTime,
    end: DateTime
  ): number {
    const dtStart = fromJSDate(start, this);
    const dtEnd = fromJSDate(end, this);
    return dtEnd.diff(dtStart).as('days');
  }

  // These two are used by eventLevels
  interface EventForSort {
    start: DateTime;
    end: DateTime;
    allDay?: boolean;
  }

  function sortEvents(
    this: DateLocalizer,
    { evtA, evtB }: { evtA: EventForSort; evtB: EventForSort }
  ): number {
    const { start: aStart, end: aEnd, allDay: aAllDay } = evtA;
    const { start: bStart, end: bEnd, allDay: bAllDay } = evtB;
    const startSort =
      Number(startOf.call(this, aStart, 'day')) -
      Number(startOf.call(this, bStart, 'day'));

    const durA = daySpan.call(this, aStart, aEnd);

    const durB = daySpan.call(this, bStart, bEnd);

    return (
      startSort || // sort by start Day first
      durB - durA || // events spanning multiple days go first
      Number(!!bAllDay) - Number(!!aAllDay) || // then allDay single day events
      Number(aStart) - Number(bStart) || // then sort by start time *don't need moment conversion here
      Number(aEnd) - Number(bEnd) // then sort by end time *don't need moment conversion here either
    );
  }

  function inEventRange(
    this: DateLocalizer,
    {
      event,
      range,
    }: {
      event: { start: DateTime; end: DateTime };
      range: { start: DateTime; end: DateTime };
    }
  ): boolean {
    const { start, end } = event;
    const { start: rangeStart, end: rangeEnd } = range;
    const eStart = startOf.call(this, start, 'day');

    const startsBeforeEnd = lte.call(this, eStart, rangeEnd, 'day');
    // when the event is zero duration we need to handle a bit differently
    const sameMin = neq.call(this, eStart, end, 'minutes');
    const endsAfterStart = sameMin
      ? gt.call(this, end, rangeStart, 'minutes')
      : gte.call(this, end, rangeStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  }

  // moment treats 'day' and 'date' equality very different
  // moment(date1).isSame(date2, 'day') would test that they were both the same day of the week
  // moment(date1).isSame(date2, 'date') would test that they were both the same date of the month of the year
  function isSameDate(
    this: DateLocalizer,
    date1: DateTime,
    date2: DateTime
  ): boolean {
    const dt = fromJSDate(date1, this);
    const dt2 = fromJSDate(date2, this);
    return dt.hasSame(dt2, 'day');
  }

  /**
   * This method, called once in the localizer constructor, is used by eventLevels
   * 'eventSegments()' to assist in determining the 'span' of the event in the display,
   * specifically when using a timezone that is greater than the browser native timezone.
   * @returns number
   */
  function browserTZOffset(this: DateLocalizer): number {
    /**
     * Date.prototype.getTimezoneOffset horrifically flips the positive/negative from
     * what you see in it's string, so we have to jump through some hoops to get a value
     * we can actually compare.
     */
    const dt = new Date();
    const neg = /-/.test(dt.toString()) ? '-' : '';
    const dtOffset = dt.getTimezoneOffset();
    const comparator = Number(`${neg}${Math.abs(dtOffset)}`);
    // moment correctly provides positive/negative offset, as expected
    const mtOffset = DateTimeClass.local().setZone(
      this.timezone || defaultTimezone
    ).offset;
    return mtOffset > comparator ? 1 : 0;
  }

  const spec = {
    timezone: validatedTimezone,
    format(
      this: DateLocalizer,
      value: DateTime,
      format: string,
      culture?: string
    ): string {
      if (culture) {
        return formatDateWithCulture.call(this, value, culture, format);
      }
      return formatDate.call(this, value, format);
    },

    formats: {
      ...formats,
      ...formatOverrides,
    },
    culture,
    messages,

    firstOfWeek,
    firstVisibleDay: firstVisibleDay,
    lastVisibleDay: lastVisibleDay,
    visibleDays: visibleDays,

    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    eq: eq,
    neq: neq,
    merge: merge,
    inRange: inRange,
    startOf: startOf,
    endOf: endOf,
    range: range,
    add: add,
    diff: diff,
    ceil: ceil,
    min: min,
    max: max,

    getSlotDate: getSlotDate,
    getTotalMin: getTotalMin,
    getMinutesFromMidnight: getMinutesFromMidnight,
    continuesPrior: continuesPrior,
    continuesAfter: continuesAfter,
    sortEvents: sortEvents,
    inEventRange: inEventRange,
    isSameDate: isSameDate,
    daySpan: daySpan,
    browserTZOffset: browserTZOffset,
    getTimezoneOffset(this: DateLocalizer, value: DateTime): number {
      return -fromJSDate(value, this).offset;
    },
    getDstOffset(this: DateLocalizer, start: DateTime, end: DateTime): number {
      return this.getTimezoneOffset(start) - this.getTimezoneOffset(end);
    },
  };

  return new DateLocalizer(spec);
}
