import React from 'react';
import { DateLocalizer } from './localizer';
interface WeekProps {
    date: Date;
    events: unknown[];
    backgroundEvents: unknown[];
    resources?: unknown[];
    step?: number;
    timeslots?: number;
    range?: Date[];
    min?: Date;
    max?: Date;
    getNow: (...args: unknown[]) => unknown;
    scrollToTime?: Date;
    enableAutoScroll?: boolean;
    showMultiDayTimes?: boolean;
    rtl?: boolean;
    resizable?: boolean;
    width?: number;
    accessors: any;
    components: any;
    getters: any;
    localizer: DateLocalizer;
    allDayMaxRows?: number;
    selected?: object;
    selectable?: true | false | "ignoreEvents";
    longPressThreshold?: number;
    onNavigate?: (...args: unknown[]) => unknown;
    onSelectSlot?: (...args: unknown[]) => unknown;
    onSelectEnd?: (...args: unknown[]) => unknown;
    onSelectStart?: (...args: unknown[]) => unknown;
    onSelectEvent?: (...args: unknown[]) => unknown;
    onDoubleClickEvent?: (...args: unknown[]) => unknown;
    onKeyPressEvent?: (...args: unknown[]) => unknown;
    onShowMore?: (...args: unknown[]) => unknown;
    onDrillDown?: (...args: unknown[]) => unknown;
    getDrilldownView: (...args: unknown[]) => unknown;
    dayLayoutAlgorithm?: unknown;
    showAllEvents?: boolean;
    doShowMoreDrillDown?: boolean;
    popup?: boolean;
    handleDragStart?: (...args: unknown[]) => unknown;
    popupOffset?: number | {
        x?: number;
        y?: number;
    };
}
declare class Week extends React.Component<WeekProps> {
    static defaultProps: {
        step: number;
        timeslots: number;
    };
    static navigate: (date: any, action: string, { localizer }: {
        localizer: DateLocalizer;
    }) => any;
    static range: (date: any, { localizer }: {
        localizer: DateLocalizer;
    }) => any;
    static title: (date: any, { localizer }: {
        localizer: DateLocalizer;
    }) => string;
    render(): React.JSX.Element;
}
export default Week;
