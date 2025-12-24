import React from 'react';
import { DateLocalizer } from './localizer';
interface DateContentRowProps {
    date?: any;
    events: any[];
    range: any[];
    rtl?: boolean;
    resizable?: boolean;
    resourceId?: any;
    renderForMeasure?: boolean;
    renderHeader?: (...args: any[]) => any;
    container?: (...args: any[]) => any;
    selected?: any;
    selectable?: true | false | 'ignoreEvents';
    longPressThreshold?: number;
    onShowMore?: (...args: any[]) => any;
    showAllEvents?: boolean;
    onSelectSlot?: (...args: any[]) => any;
    onSelect?: (...args: any[]) => any;
    onSelectEnd?: (...args: any[]) => any;
    onSelectStart?: (...args: any[]) => any;
    onDoubleClick?: (...args: any[]) => any;
    onKeyPress?: (...args: any[]) => any;
    dayPropGetter?: (...args: any[]) => any;
    getNow: (...args: any[]) => any;
    isAllDay?: boolean;
    accessors: any;
    components: any;
    getters: any;
    localizer: DateLocalizer;
    minRows?: number;
    maxRows?: number;
    className?: string;
}
declare class DateContentRow extends React.Component<DateContentRowProps> {
    static defaultProps: {
        minRows: number;
        maxRows: number;
    };
    containerRef: React.RefObject<HTMLDivElement>;
    headingRowRef: React.RefObject<HTMLDivElement>;
    eventRowRef: React.RefObject<HTMLDivElement>;
    slotMetrics: any;
    constructor(props: DateContentRowProps);
    handleSelectSlot: (slot: any) => void;
    handleShowMore: (slot: any, target: any) => void;
    getContainer: () => any;
    getRowLimit(): number;
    renderHeadingCell: (date: any, index: any) => any;
    renderDummy: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default DateContentRow;
