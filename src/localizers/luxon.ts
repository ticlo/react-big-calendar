import { DateLocalizer } from '../localizer';

function pluralizeUnit(unit) {
  return /s$/.test(unit) ? unit : unit + 's';
}

const weekRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'LLLL dd', culture) +
  ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'dd' : 'LLLL dd', culture);



const timeRangeFormat = ({ start, end }, culture, local) => {
  if (
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  ) {
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

const timeRangeStartFormat = ({ start }, culture, local) =>
  local.format(start, 't', culture) + ' – ';

const timeRangeEndFormat = ({ end }, culture, local) =>
  ' – ' + local.format(end, 't', culture);

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

function fixUnit(unit) {
  let datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit;
  if (datePart === 'FullYear') {
    datePart = 'year';
  } else if (!datePart) {
    datePart = undefined;
  }
  return datePart;
}

// Luxon does not currently have weekInfo by culture
// Luxon uses 1 based values for month and weekday
// So we default to Sunday (7)
export default function (
  DateTime,
  {
    firstDayOfWeek = 7,
    timezone: defaultTimezone = undefined,
    culture = undefined,
    messages = undefined,
    formats: formatOverrides = undefined,
  } = {} as any
) {
  const fromJSDate = (date, localizer) => {
    if (date && DateTime.isDateTime(date)) {
      if (
        localizer &&
        localizer.timezone &&
        date.zoneName !== localizer.timezone
      ) {
        return date.setZone(localizer.timezone);
      }
      return date;
    }
    return DateTime.fromJSDate(date, {
      zone: localizer ? localizer.timezone : undefined,
    });
  };

  function formatDate(value, format) {
    return fromJSDate(value, this).toFormat(format);
  }

  function formatDateWithCulture(value, culture, format) {
    return fromJSDate(value, this).setLocale(culture).toFormat(format);
  }

  /*** BEGIN localized date arithmetic methods with Luxon ***/
  function defineComparators(a, b, unit) {
    const datePart = fixUnit(unit);
    const dtA = datePart
      ? fromJSDate(a, this).startOf(datePart)
      : fromJSDate(a, this);
    const dtB = datePart
      ? fromJSDate(b, this).startOf(datePart)
      : fromJSDate(b, this);
    return [dtA, dtB, datePart];
  }

  // Since Luxon (and current Intl API) has no support
  // for culture based weekInfo, we need to handle
  // the start of the week differently
  // depending on locale, the firstDayOfWeek could also be Saturday, Sunday or Monday
  function startOfDTWeek(dtObj) {
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

  function endOfDTWeek(dtObj) {
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
  function startOfDT(date, unit) {
    if (!date) date = DateTime.now({ zone: this.timezone });
    const datePart = fixUnit(unit);
    if (datePart) {
      const dt = fromJSDate(date, this);
      return datePart.includes('week')
        ? startOfDTWeek(dt)
        : dt.startOf(datePart);
    }
    return fromJSDate(date, this);
  }

  function firstOfWeek() {
    return firstDayOfWeek;
  }

  // This returns a JS Date from a DateTime instance
  function startOf(date, unit) {
    return startOfDT.call(this, date, unit).toJSDate();
  }

  // This returns a DateTime instance
  function endOfDT(date, unit) {
    if (!date) date = DateTime.now({ zone: this.timezone });
    const datePart = fixUnit(unit);
    if (datePart) {
      const dt = fromJSDate(date, this);
      return datePart.includes('week') ? endOfDTWeek(dt) : dt.endOf(datePart);
    }
    return fromJSDate(date, this);
  }

  function endOf(date, unit) {
    return endOfDT.call(this, date, unit).toJSDate();
  }

  function eq(a, b, unit) {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA == +dtB;
  }

  function neq(a, b, unit) {
    return !eq.call(this, a, b, unit);
  }

  function gt(a, b, unit) {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA > +dtB;
  }

  function lt(a, b, unit) {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA < +dtB;
  }

  function gte(a, b, unit) {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA >= +dtB;
  }

  function lte(a, b, unit) {
    const [dtA, dtB] = defineComparators.call(this, a, b, unit);
    return +dtA <= +dtB;
  }

  function inRange(day, min, max, unit = 'day') {
    const datePart = fixUnit(unit);
    const mDay = startOfDT.call(this, day, datePart);
    const mMin = startOfDT.call(this, min, datePart);
    const mMax = startOfDT.call(this, max, datePart);
    return +mDay >= +mMin && +mDay <= +mMax;
  }

  function min(dateA, dateB) {
    const dtA = fromJSDate(dateA, this);
    const dtB = fromJSDate(dateB, this);
    return DateTime.min(dtA, dtB).toJSDate();
  }

  function max(dateA, dateB) {
    const dtA = fromJSDate(dateA, this);
    const dtB = fromJSDate(dateB, this);
    return DateTime.max(dtA, dtB).toJSDate();
  }

  function merge(date, time) {
    if (!date && !time) return null;

    const tm = fromJSDate(time, this);
    const dt = startOfDT.call(this, date, 'day');
    return dt
      .set({
        hour: tm.hour,
        minute: tm.minute,
        second: tm.second,
        millisecond: tm.millisecond,
      })
      .toJSDate();
  }

  function add(date, adder, unit) {
    const datePart = fixUnit(unit);
    return fromJSDate(date, this)
      .plus({ [datePart]: adder })
      .toJSDate();
  }

  function range(start, end, unit = 'day') {
    const datePart = fixUnit(unit);
    let current = fromJSDate(start, this);
    const days = [];

    while (lte.call(this, current, end)) {
      days.push(current.toJSDate());
      current = fromJSDate(add.call(this, current, 1, datePart), this);
    }

    return days;
  }

  function ceil(date, unit) {
    const datePart = fixUnit(unit);
    const floor = startOf.call(this, date, datePart);

    return eq.call(this, floor, date)
      ? floor
      : add.call(this, floor, 1, datePart);
  }

  function diff(a, b, unit = 'day') {
    const datePart = fixUnit(unit);
    // don't use 'defineComparators' here, as we don't want to mutate the values
    const dtA = fromJSDate(a, this);
    const dtB = fromJSDate(b, this);
    return Math.floor(
      dtB.diff(dtA, datePart, { conversionAccuracy: 'longterm' }).toObject()[
      datePart
      ]
    );
  }

  function firstVisibleDay(date) {
    const startOfMonth = startOfDT.call(this, date, 'month');
    return startOfDTWeek(startOfMonth).toJSDate();
  }

  function lastVisibleDay(date) {
    const endOfMonth = endOfDT.call(this, date, 'month');
    return endOfDTWeek(endOfMonth).toJSDate();
  }

  function visibleDays(date) {
    let current = fromJSDate(firstVisibleDay.call(this, date), this);
    const last = lastVisibleDay.call(this, date);
    const days = [];

    while (lte.call(this, current, last)) {
      days.push(current.toJSDate());
      current = fromJSDate(add.call(this, current, 1, 'day'), this);
    }

    return days;
  }
  /*** END localized date arithmetic methods with moment ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using moment to construct the js Date
   * @param {Date} dt - date to start with
   * @param {Number} minutesFromMidnight
   * @param {Number} offset
   * @returns {Date}
   */
  function getSlotDate(dt, minutesFromMidnight, offset) {
    return startOfDT
      .call(this, dt, 'day')
      .set({ minutes: minutesFromMidnight + offset })
      .toJSDate();
  }

  // Luxon will automatically handle DST differences in it's calculations
  function getTotalMin(start, end) {
    return diff.call(this, start, end, 'minutes');
  }

  function getMinutesFromMidnight(start) {
    const dayStart = startOfDT.call(this, start, 'day');
    const day = fromJSDate(start, this);
    return Math.round(
      day
        .diff(dayStart, 'minutes', { conversionAccuracy: 'longterm' })
        .toObject().minutes
    );
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(start, first) {
    return lt.call(this, start, first);
  }

  function continuesAfter(start, end, last) {
    return gte.call(this, end, last);
  }

  function daySpan(start, end) {
    const dtStart = fromJSDate(start, this);
    const dtEnd = fromJSDate(end, this);
    return dtEnd.diff(dtStart).as('days');
  }

  // These two are used by eventLevels
  function sortEvents({
    evtA: { start: aStart, end: aEnd, allDay: aAllDay },
    evtB: { start: bStart, end: bEnd, allDay: bAllDay },
  }) {
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

  function inEventRange({
    event: { start, end },
    range: { start: rangeStart, end: rangeEnd },
  }) {
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
  function isSameDate(date1, date2) {
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
  function browserTZOffset() {
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
    const mtOffset = DateTime.local({
      zone: this.timezone || defaultTimezone,
    }).offset;
    return mtOffset > comparator ? 1 : 0;
  }

  const spec = {
    timezone: defaultTimezone,
    format(value, format, culture) {
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
    getTimezoneOffset(value) {
      return -fromJSDate(value, this).offset;
    },
    getDstOffset(start, end) {
      return this.getTimezoneOffset(start) - this.getTimezoneOffset(end);
    },
  };

  return new DateLocalizer(spec);
}
