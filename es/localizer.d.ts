import { Culture, Format, Messages } from './types';
export declare class DateLocalizer {
    propType: any;
    formats: {
        [key: string]: Format;
    };
    format: (value: any, format: Format, culture?: Culture) => string;
    startOfWeek: (culture?: Culture) => number;
    merge: (date: any, time: any) => any;
    inRange: (date: any, min: any, max: any, unit?: string) => boolean;
    lt: (date: any, b: any, unit?: string) => boolean;
    lte: (date: any, b: any, unit?: string) => boolean;
    gt: (date: any, b: any, unit?: string) => boolean;
    gte: (date: any, b: any, unit?: string) => boolean;
    eq: (date: any, b: any, unit?: string) => boolean;
    neq: (date: any, b: any, unit?: string) => boolean;
    startOf: (date: any, unit?: string, firstOfWeek?: number) => any;
    endOf: (date: any, unit?: string, firstOfWeek?: number) => any;
    add: (date: any, amount: number, unit?: string) => any;
    range: (start: any, end: any, unit?: string) => any[];
    diff: (a: any, b: any, unit?: string) => number;
    ceil: (date: any, unit: string) => any;
    min: (...args: any[]) => any;
    max: (...args: any[]) => any;
    minutes: (date: any) => number;
    daySpan: (start: any, end: any) => number;
    firstVisibleDay: (date: any, culture?: Culture) => any;
    lastVisibleDay: (date: any, culture?: Culture) => any;
    visibleDays: (date: any, culture?: Culture) => any[];
    getSlotDate: (dt: any, minutesFromMidnight: number, offset: number) => any;
    getTimezoneOffset: (value: any) => number;
    getDstOffset: (start: any, end: any) => number;
    getTotalMin: (start: any, end: any) => number;
    getMinutesFromMidnight: (start: any) => number;
    continuesPrior: (start: any, first: any) => boolean;
    continuesAfter: (start: any, end: any, last: any) => boolean;
    sortEvents: (args: {
        evtA: any;
        evtB: any;
    }) => number;
    inEventRange: (args: {
        event: any;
        range: any;
    }) => boolean;
    isSameDate: (date1: any, date2: any) => boolean;
    startAndEndAreDateOnly: (start: any, end: any) => boolean;
    segmentOffset: number;
    timezone?: string;
    culture?: string;
    messages: Messages;
    constructor(spec: any);
}
