import React from 'react';
import { CalendarEvent, Components, Messages, Getters, Accessors, ViewNames, DayLayoutAlgorithm, Culture } from './types';
import { DateLocalizer } from './localizer';
interface CalendarProps<TEvent extends CalendarEvent = CalendarEvent, TResource extends object = object> {
    localizer: DateLocalizer;
    elementProps?: React.HTMLAttributes<HTMLDivElement>;
    date?: any;
    view?: string;
    defaultView?: string;
    events?: TEvent[];
    backgroundEvents?: TEvent[];
    titleAccessor?: keyof TEvent | ((event: TEvent) => React.ReactNode);
    tooltipAccessor?: keyof TEvent | ((event: TEvent) => string) | null;
    allDayAccessor?: keyof TEvent | ((event: TEvent) => boolean);
    startAccessor?: keyof TEvent | ((event: TEvent) => any);
    endAccessor?: keyof TEvent | ((event: TEvent) => any);
    resourceAccessor?: keyof TEvent | ((event: TEvent) => any);
    resources?: TResource[];
    resourceIdAccessor?: keyof TResource | ((resource: TResource) => any);
    resourceTitleAccessor?: keyof TResource | ((resource: TResource) => React.ReactNode);
    getNow?: () => any;
    onNavigate?: (newDate: any, view: string, action: string) => void;
    onView?: (view: string) => void;
    onDrillDown?: (date: any, view: string, drilldownView?: string | null) => void;
    onRangeChange?: (range: any[] | {
        start: any;
        end: any;
    }, view?: string) => void;
    onSelectSlot?: (slotInfo: any) => void;
    onSelectEvent?: (event: TEvent, e: React.SyntheticEvent) => void;
    onDoubleClickEvent?: (event: TEvent, e: React.SyntheticEvent) => void;
    onKeyPressEvent?: (event: TEvent, e: React.SyntheticEvent) => void;
    onSelecting?: (range: {
        start: any;
        end: any;
        resourceId?: any;
    }) => boolean | undefined | null;
    onShowMore?: (events: TEvent[], date: any) => void;
    showAllEvents?: boolean;
    selected?: any;
    views?: ViewNames;
    doShowMoreDrillDown?: boolean;
    drilldownView?: string | null;
    getDrilldownView?: (targetDate: any, currentViewName: string, configuredViewNames: string[]) => string | null;
    length?: number;
    toolbar?: boolean;
    popup?: boolean;
    popupOffset?: number | {
        x?: number;
        y?: number;
    };
    selectable?: true | false | "ignoreEvents";
    longPressThreshold?: number;
    step?: number;
    timeslots?: number;
    rtl?: boolean;
    eventPropGetter?: (event: TEvent, start: any, end: any, isSelected: boolean) => {
        className?: string;
        style?: React.CSSProperties;
    };
    backgroundEventPropGetter?: (event: TEvent, start: any, end: any, isSelected: boolean) => {
        className?: string;
        style?: React.CSSProperties;
    };
    slotPropGetter?: (date: any, resourceId?: any) => {
        className?: string;
        style?: React.CSSProperties;
    };
    slotGroupPropGetter?: () => {
        style?: React.CSSProperties;
    };
    dayPropGetter?: (date: any, resourceId?: any) => {
        className?: string;
        style?: React.CSSProperties;
    };
    showMultiDayTimes?: boolean;
    allDayMaxRows?: number;
    min?: any;
    max?: any;
    scrollToTime?: any;
    enableAutoScroll?: boolean;
    culture?: Culture;
    formats?: any;
    components?: Components;
    messages?: Messages;
    dayLayoutAlgorithm?: DayLayoutAlgorithm;
    timezone?: string;
    className?: string;
    style?: React.CSSProperties;
}
interface CalendarState {
    context: {
        viewNames: string[];
        localizer: DateLocalizer;
        getters: Getters;
        components: Components;
        accessors: Accessors;
    };
}
export default class Calendar<TEvent extends CalendarEvent = CalendarEvent, TResource extends object = object> extends React.Component<CalendarProps<TEvent, TResource>, CalendarState> {
    static defaultProps: {
        events: any[];
        backgroundEvents: any[];
        elementProps: {};
        popup: boolean;
        toolbar: boolean;
        view: string;
        views: string[];
        step: number;
        length: number;
        allDayMaxRows: number;
        doShowMoreDrillDown: boolean;
        drilldownView: string;
        titleAccessor: string;
        tooltipAccessor: string;
        allDayAccessor: string;
        startAccessor: string;
        endAccessor: string;
        resourceAccessor: string;
        resourceIdAccessor: string;
        resourceTitleAccessor: string;
        longPressThreshold: number;
        getNow: () => Date;
        dayLayoutAlgorithm: string;
    };
    constructor(props: CalendarProps<TEvent, TResource>);
    static getDerivedStateFromProps(nextProps: CalendarProps): {
        context: {
            viewNames: any[];
            localizer: any;
            getters: {
                eventProp: (...args: any[]) => any;
                backgroundEventProp: (...args: any[]) => any;
                slotProp: (...args: any[]) => any;
                slotGroupProp: (...args: any[]) => any;
                dayProp: (...args: any[]) => any;
            };
            components: any;
            accessors: {
                start: (data: any) => any;
                end: (data: any) => any;
                allDay: (data: any) => any;
                tooltip: (data: any) => any;
                title: (data: any) => any;
                resource: (data: any) => any;
                resourceId: (data: any) => any;
                resourceTitle: (data: any) => any;
            };
        };
    };
    static getContext({ startAccessor, endAccessor, allDayAccessor, tooltipAccessor, titleAccessor, resourceAccessor, resourceIdAccessor, resourceTitleAccessor, eventPropGetter, backgroundEventPropGetter, slotPropGetter, slotGroupPropGetter, dayPropGetter, view, views, localizer, culture, messages, components, formats, timezone, }: any): {
        viewNames: any[];
        localizer: any;
        getters: {
            eventProp: (...args: any[]) => any;
            backgroundEventProp: (...args: any[]) => any;
            slotProp: (...args: any[]) => any;
            slotGroupProp: (...args: any[]) => any;
            dayProp: (...args: any[]) => any;
        };
        components: any;
        accessors: {
            start: (data: any) => any;
            end: (data: any) => any;
            allDay: (data: any) => any;
            tooltip: (data: any) => any;
            title: (data: any) => any;
            resource: (data: any) => any;
            resourceId: (data: any) => any;
            resourceTitle: (data: any) => any;
        };
    };
    getViews: () => {};
    getView: () => any;
    getDrilldownView: (date: any) => any;
    render(): React.JSX.Element;
    /**
     *
     * @param date
     * @param viewComponent
     * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
     * parameter. It appears when range change on view changing. It could be handy
     * when you need to have both: range and view type at once, i.e. for manage rbc
     * state via url
     */
    handleRangeChange: (date: any, viewComponent: any, view?: string) => void;
    handleNavigate: (action: string, newDate?: any) => void;
    handleViewChange: (view: string) => void;
    handleSelectEvent: (event: TEvent, e: React.SyntheticEvent) => void;
    handleDoubleClickEvent: (event: TEvent, e: React.SyntheticEvent) => void;
    handleKeyPressEvent: (event: TEvent, e: React.SyntheticEvent) => void;
    handleSelectSlot: (slotInfo: any) => void;
    handleDrillDown: (date: any, view: string) => void;
}
export {};
