"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.formats = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _localizer = require("../localizer");
function pluralizeUnit(unit) {
  return /s$/.test(unit) ? unit : unit + 's';
}
var weekRangeFormat = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end;
  return local.format(start, 'LLLL dd', culture) + ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'dd' : 'LLLL dd', culture);
};
var dateRangeFormat = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end;
  return local.format(start, 'D', culture) + ' – ' + local.format(end, 'D', culture);
};
var timeRangeFormat = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
    end = _ref3.end;
  if (start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
    return local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture);
  }
  return local.format(start, 'ff', culture) + ' – ' + local.format(end, 'ff', culture);
};
var timeRangeStartFormat = function timeRangeStartFormat(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, 't', culture) + ' – ';
};
var timeRangeEndFormat = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end;
  return ' – ' + local.format(end, 't', culture);
};
var formats = exports.formats = {
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
  dayRangeHeaderFormat: weekRangeFormat
};
function fixUnit(unit) {
  var datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit;
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
function _default(DateTime) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref6$firstDayOfWeek = _ref6.firstDayOfWeek,
    firstDayOfWeek = _ref6$firstDayOfWeek === void 0 ? 7 : _ref6$firstDayOfWeek,
    _ref6$timezone = _ref6.timezone,
    defaultTimezone = _ref6$timezone === void 0 ? undefined : _ref6$timezone,
    _ref6$culture = _ref6.culture,
    culture = _ref6$culture === void 0 ? undefined : _ref6$culture,
    _ref6$messages = _ref6.messages,
    messages = _ref6$messages === void 0 ? undefined : _ref6$messages,
    _ref6$formats = _ref6.formats,
    formatOverrides = _ref6$formats === void 0 ? undefined : _ref6$formats;
  var fromJSDate = function fromJSDate(date, localizer) {
    if (date && DateTime.isDateTime(date)) {
      if (localizer && localizer.timezone && date.zoneName !== localizer.timezone) {
        return date.setZone(localizer.timezone);
      }
      return date;
    }
    return DateTime.fromJSDate(date, {
      zone: localizer ? localizer.timezone : undefined
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
    var datePart = fixUnit(unit);
    var dtA = datePart ? fromJSDate(a, this).startOf(datePart) : fromJSDate(a, this);
    var dtB = datePart ? fromJSDate(b, this).startOf(datePart) : fromJSDate(b, this);
    return [dtA, dtB, datePart];
  }

  // Since Luxon (and current Intl API) has no support
  // for culture based weekInfo, we need to handle
  // the start of the week differently
  // depending on locale, the firstDayOfWeek could also be Saturday, Sunday or Monday
  function startOfDTWeek(dtObj) {
    var weekday = dtObj.weekday;
    if (weekday === firstDayOfWeek) {
      return dtObj.startOf('day'); // already beginning of week
    } else if (firstDayOfWeek === 1) {
      return dtObj.startOf('week'); // fow is Monday, which is Luxon default
    }
    var diff = firstDayOfWeek === 7 ? weekday : weekday + (7 - firstDayOfWeek);
    return dtObj.minus({
      day: diff
    }).startOf('day');
  }
  function endOfDTWeek(dtObj) {
    var weekday = dtObj.weekday;
    var eow = firstDayOfWeek === 1 ? 7 : firstDayOfWeek - 1;
    if (weekday === eow) {
      return dtObj.endOf('day'); // already last day of the week
    } else if (firstDayOfWeek === 1) {
      return dtObj.endOf('week'); // use Luxon default (Sunday)
    }
    var fromDate = firstDayOfWeek > eow ? dtObj.plus({
      day: firstDayOfWeek - eow
    }) : dtObj;
    return fromDate.set({
      weekday: eow
    }).endOf('day');
  }

  // This returns a DateTime instance
  function startOfDT(date, unit) {
    if (!date) date = DateTime.now({
      zone: this.timezone
    });
    var datePart = fixUnit(unit);
    if (datePart) {
      var dt = fromJSDate(date, this);
      return datePart.includes('week') ? startOfDTWeek(dt) : dt.startOf(datePart);
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
    if (!date) date = DateTime.now({
      zone: this.timezone
    });
    var datePart = fixUnit(unit);
    if (datePart) {
      var dt = fromJSDate(date, this);
      return datePart.includes('week') ? endOfDTWeek(dt) : dt.endOf(datePart);
    }
    return fromJSDate(date, this);
  }
  function endOf(date, unit) {
    return endOfDT.call(this, date, unit).toJSDate();
  }
  function eq(a, b, unit) {
    var _defineComparators$ca = defineComparators.call(this, a, b, unit),
      _defineComparators$ca2 = (0, _slicedToArray2.default)(_defineComparators$ca, 2),
      dtA = _defineComparators$ca2[0],
      dtB = _defineComparators$ca2[1];
    return +dtA == +dtB;
  }
  function neq(a, b, unit) {
    return !eq.call(this, a, b, unit);
  }
  function gt(a, b, unit) {
    var _defineComparators$ca3 = defineComparators.call(this, a, b, unit),
      _defineComparators$ca4 = (0, _slicedToArray2.default)(_defineComparators$ca3, 2),
      dtA = _defineComparators$ca4[0],
      dtB = _defineComparators$ca4[1];
    return +dtA > +dtB;
  }
  function lt(a, b, unit) {
    var _defineComparators$ca5 = defineComparators.call(this, a, b, unit),
      _defineComparators$ca6 = (0, _slicedToArray2.default)(_defineComparators$ca5, 2),
      dtA = _defineComparators$ca6[0],
      dtB = _defineComparators$ca6[1];
    return +dtA < +dtB;
  }
  function gte(a, b, unit) {
    var _defineComparators$ca7 = defineComparators.call(this, a, b, unit),
      _defineComparators$ca8 = (0, _slicedToArray2.default)(_defineComparators$ca7, 2),
      dtA = _defineComparators$ca8[0],
      dtB = _defineComparators$ca8[1];
    return +dtA >= +dtB;
  }
  function lte(a, b, unit) {
    var _defineComparators$ca9 = defineComparators.call(this, a, b, unit),
      _defineComparators$ca10 = (0, _slicedToArray2.default)(_defineComparators$ca9, 2),
      dtA = _defineComparators$ca10[0],
      dtB = _defineComparators$ca10[1];
    return +dtA <= +dtB;
  }
  function inRange(day, min, max) {
    var unit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'day';
    var datePart = fixUnit(unit);
    var mDay = startOfDT.call(this, day, datePart);
    var mMin = startOfDT.call(this, min, datePart);
    var mMax = startOfDT.call(this, max, datePart);
    return +mDay >= +mMin && +mDay <= +mMax;
  }
  function min(dateA, dateB) {
    var dtA = fromJSDate(dateA, this);
    var dtB = fromJSDate(dateB, this);
    return DateTime.min(dtA, dtB).toJSDate();
  }
  function max(dateA, dateB) {
    var dtA = fromJSDate(dateA, this);
    var dtB = fromJSDate(dateB, this);
    return DateTime.max(dtA, dtB).toJSDate();
  }
  function merge(date, time) {
    if (!date && !time) return null;
    var tm = fromJSDate(time, this);
    var dt = startOfDT.call(this, date, 'day');
    return dt.set({
      hour: tm.hour,
      minute: tm.minute,
      second: tm.second,
      millisecond: tm.millisecond
    }).toJSDate();
  }
  function add(date, adder, unit) {
    var datePart = fixUnit(unit);
    return fromJSDate(date, this).plus((0, _defineProperty2.default)({}, datePart, adder)).toJSDate();
  }
  function range(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit(unit);
    var current = fromJSDate(start, this);
    var days = [];
    while (lte.call(this, current, end)) {
      days.push(current.toJSDate());
      current = fromJSDate(add.call(this, current, 1, datePart), this);
    }
    return days;
  }
  function ceil(date, unit) {
    var datePart = fixUnit(unit);
    var floor = startOf.call(this, date, datePart);
    return eq.call(this, floor, date) ? floor : add.call(this, floor, 1, datePart);
  }
  function diff(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit(unit);
    // don't use 'defineComparators' here, as we don't want to mutate the values
    var dtA = fromJSDate(a, this);
    var dtB = fromJSDate(b, this);
    return Math.floor(dtB.diff(dtA, datePart, {
      conversionAccuracy: 'longterm'
    }).toObject()[datePart]);
  }
  function firstVisibleDay(date) {
    var startOfMonth = startOfDT.call(this, date, 'month');
    return startOfDTWeek(startOfMonth).toJSDate();
  }
  function lastVisibleDay(date) {
    var endOfMonth = endOfDT.call(this, date, 'month');
    return endOfDTWeek(endOfMonth).toJSDate();
  }
  function visibleDays(date) {
    var current = fromJSDate(firstVisibleDay.call(this, date), this);
    var last = lastVisibleDay.call(this, date);
    var days = [];
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
    return startOfDT.call(this, dt, 'day').set({
      minutes: minutesFromMidnight + offset
    }).toJSDate();
  }

  // Luxon will automatically handle DST differences in it's calculations
  function getTotalMin(start, end) {
    return diff.call(this, start, end, 'minutes');
  }
  function getMinutesFromMidnight(start) {
    var dayStart = startOfDT.call(this, start, 'day');
    var day = fromJSDate(start, this);
    return Math.round(day.diff(dayStart, 'minutes', {
      conversionAccuracy: 'longterm'
    }).toObject().minutes);
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(start, first) {
    return lt.call(this, start, first);
  }
  function continuesAfter(start, end, last) {
    return gte.call(this, end, last);
  }
  function daySpan(start, end) {
    var dtStart = fromJSDate(start, this);
    var dtEnd = fromJSDate(end, this);
    return dtEnd.diff(dtStart).as('days');
  }

  // These two are used by eventLevels
  function sortEvents(_ref7) {
    var _ref7$evtA = _ref7.evtA,
      aStart = _ref7$evtA.start,
      aEnd = _ref7$evtA.end,
      aAllDay = _ref7$evtA.allDay,
      _ref7$evtB = _ref7.evtB,
      bStart = _ref7$evtB.start,
      bEnd = _ref7$evtB.end,
      bAllDay = _ref7$evtB.allDay;
    var startSort = Number(startOf.call(this, aStart, 'day')) - Number(startOf.call(this, bStart, 'day'));
    var durA = daySpan.call(this, aStart, aEnd);
    var durB = daySpan.call(this, bStart, bEnd);
    return startSort ||
    // sort by start Day first
    durB - durA ||
    // events spanning multiple days go first
    Number(!!bAllDay) - Number(!!aAllDay) ||
    // then allDay single day events
    Number(aStart) - Number(bStart) ||
    // then sort by start time *don't need moment conversion here
    Number(aEnd) - Number(bEnd) // then sort by end time *don't need moment conversion here either
    ;
  }
  function inEventRange(_ref8) {
    var _ref8$event = _ref8.event,
      start = _ref8$event.start,
      end = _ref8$event.end,
      _ref8$range = _ref8.range,
      rangeStart = _ref8$range.start,
      rangeEnd = _ref8$range.end;
    var eStart = startOf.call(this, start, 'day');
    var startsBeforeEnd = lte.call(this, eStart, rangeEnd, 'day');
    // when the event is zero duration we need to handle a bit differently
    var sameMin = neq.call(this, eStart, end, 'minutes');
    var endsAfterStart = sameMin ? gt.call(this, end, rangeStart, 'minutes') : gte.call(this, end, rangeStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  }

  // moment treats 'day' and 'date' equality very different
  // moment(date1).isSame(date2, 'day') would test that they were both the same day of the week
  // moment(date1).isSame(date2, 'date') would test that they were both the same date of the month of the year
  function isSameDate(date1, date2) {
    var dt = fromJSDate(date1, this);
    var dt2 = fromJSDate(date2, this);
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
    var dt = new Date();
    var neg = /-/.test(dt.toString()) ? '-' : '';
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset)));
    // moment correctly provides positive/negative offset, as expected
    var mtOffset = DateTime.local({
      zone: this.timezone || defaultTimezone
    }).offset;
    return mtOffset > comparator ? 1 : 0;
  }
  var spec = {
    timezone: defaultTimezone,
    format: function format(value, _format, culture) {
      if (culture) {
        return formatDateWithCulture.call(this, value, culture, _format);
      }
      return formatDate.call(this, value, _format);
    },
    formats: formats,
    firstOfWeek: firstOfWeek,
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
    getTimezoneOffset: function getTimezoneOffset(value) {
      return -fromJSDate(value, this).offset;
    },
    getDstOffset: function getDstOffset(start, end) {
      return this.getTimezoneOffset(start) - this.getTimezoneOffset(end);
    }
  };
  return new _localizer.DateLocalizer(spec);
}