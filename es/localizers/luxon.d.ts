import { DateLocalizer } from '../localizer';
export declare const formats: {
    dateFormat: string;
    dayFormat: string;
    weekdayFormat: string;
    selectRangeFormat: ({ start, end }: {
        start: any;
        end: any;
    }, culture: any, local: any) => string;
    eventTimeRangeFormat: ({ start, end }: {
        start: any;
        end: any;
    }, culture: any, local: any) => string;
    eventTimeRangeStartFormat: ({ start }: {
        start: any;
    }, culture: any, local: any) => string;
    eventTimeRangeEndFormat: ({ end }: {
        end: any;
    }, culture: any, local: any) => string;
    timeGutterFormat: string;
    monthHeaderFormat: string;
    dayHeaderFormat: string;
    dayRangeHeaderFormat: ({ start, end }: {
        start: any;
        end: any;
    }, culture: any, local: any) => string;
};
export default function (DateTime: any, { firstDayOfWeek, timezone: defaultTimezone, culture, messages, formats: formatOverrides, }?: any): DateLocalizer;
