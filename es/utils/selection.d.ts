export declare function isSelected(event: any, selected: any): boolean;
export declare function slotWidth(rowBox: any, slots: any): number;
export declare function getSlotAtX(rowBox: any, x: any, rtl: any, slots: any): number;
export declare function pointInBox(box: any, { x, y }: {
    x: any;
    y: any;
}): boolean;
export declare function dateCellSelection(start: any, rowBox: any, box: any, slots: any, rtl: any): {
    startIdx: number;
    endIdx: number;
};
