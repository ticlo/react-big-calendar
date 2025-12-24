export declare function endOfRange({ dateRange, unit, localizer }: {
    dateRange: any;
    unit?: string;
    localizer: any;
}): {
    first: any;
    last: any;
};
export declare function eventSegments(event: any, range: any, accessors: any, localizer: any): {
    event: any;
    span: any;
    left: number;
    right: number;
};
export declare function eventLevels(rowSegments: any, limit?: number): {
    levels: any[];
    extra: any[];
};
export declare function inRange(e: any, start: any, end: any, accessors: any, localizer: any): any;
export declare function segsOverlap(seg: any, otherSegs: any): any;
export declare function sortWeekEvents(events: any, accessors: any, localizer: any): any[];
export declare function sortEvents(eventA: any, eventB: any, accessors: any, localizer: any): any;
