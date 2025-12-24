import React from 'react';
import { DateLocalizer } from './localizer';
import { Accessors, Components, Getters } from './types';
interface TimeGridHeaderProps {
    range: any[];
    events: any[];
    backgroundEvents?: any[];
    resources?: any;
    getNow: (...args: any[]) => any;
    isOverflowing?: boolean;
    rtl?: boolean;
    resizable?: boolean;
    width?: number;
    localizer: DateLocalizer;
    accessors: Accessors;
    components: Components;
    getters: Getters;
    selected?: any;
    selectable?: true | false | 'ignoreEvents';
    longPressThreshold?: number;
    allDayMaxRows?: number;
    onSelectSlot?: (...args: any[]) => any;
    onSelectEvent?: (...args: any[]) => any;
    onDoubleClickEvent?: (...args: any[]) => any;
    onKeyPressEvent?: (...args: any[]) => any;
    onDrillDown?: (...args: any[]) => any;
    onShowMore?: (...args: any[]) => any;
    getDrilldownView: (...args: any[]) => any;
    scrollRef?: any;
}
declare class TimeGridHeader extends React.Component<TimeGridHeaderProps> {
    handleHeaderClick: (date: any, view: any, e: any) => void;
    renderHeaderCells(range: any): any;
    renderRow: (resource: any) => React.JSX.Element;
    render(): React.JSX.Element;
}
export default TimeGridHeader;
