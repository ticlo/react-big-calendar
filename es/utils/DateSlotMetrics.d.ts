export declare function getSlotMetrics(): import("memoize-one").MemoizedFn<(this: any, options: any) => {
    first: any;
    last: any;
    levels: any[];
    extra: any[];
    range: any;
    slots: any;
    clone(args: any): any;
    getDateForSlot(slotNumber: any): any;
    getSlotForDate(date: any): any;
    getEventsForSlot(slot: any): any;
    continuesPrior(event: any): any;
    continuesAfter(event: any): any;
}>;
