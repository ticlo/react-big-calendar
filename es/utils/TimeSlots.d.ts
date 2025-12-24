export declare function getSlotMetrics({ min: start, max: end, step, timeslots, localizer, }: {
    min: any;
    max: any;
    step: any;
    timeslots: any;
    localizer: any;
}): {
    groups: any[];
    update(args: any): any;
    dateIsInGroup(date: any, groupIndex: any): any;
    nextSlot(slot: any): any;
    closestSlotToPosition(percent: any): any;
    closestSlotFromPoint(point: any, boundaryRect: any): any;
    closestSlotFromDate(date: any, offset?: number): any;
    startsBeforeDay(date: any): any;
    startsAfterDay(date: any): any;
    startsBefore(date: any): any;
    startsAfter(date: any): any;
    getRange(rangeStart: any, rangeEnd: any, ignoreMin: any, ignoreMax: any): {
        top: number;
        height: number;
        start: number;
        startDate: any;
        end: number;
        endDate: any;
    };
    getCurrentTimePosition(rangeStart: any): number;
};
