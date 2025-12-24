import React from 'react';
import { DateLocalizer } from './localizer';
interface MonthViewProps {
    events: any[];
    date: any;
    culture?: any;
    min?: Date;
    max?: Date;
    step?: number;
    getNow: (...args: any[]) => any;
    scrollToTime?: Date;
    enableAutoScroll?: boolean;
    rtl?: boolean;
    resizable?: boolean;
    width?: number;
    accessors: any;
    components: any;
    getters: any;
    localizer: DateLocalizer;
    selected?: any;
    selectable?: true | false | 'ignoreEvents';
    longPressThreshold?: number;
    onNavigate?: (...args: any[]) => any;
    onSelectSlot?: (...args: any[]) => any;
    onSelectEvent?: (...args: any[]) => any;
    onDoubleClickEvent?: (...args: any[]) => any;
    onKeyPressEvent?: (...args: any[]) => any;
    onShowMore?: (...args: any[]) => any;
    showAllEvents?: boolean;
    doShowMoreDrillDown?: boolean;
    onDrillDown?: (...args: any[]) => any;
    getDrilldownView: (...args: any[]) => any;
    popup?: boolean;
    handleDragStart?: (...args: any[]) => any;
    popupOffset?: number | {
        x?: number;
        y?: number;
    };
    className?: string;
}
interface MonthViewState {
    rowLimit: number;
    needLimitMeasure: boolean;
    date: any;
    overlay?: any;
}
declare class MonthView extends React.Component<MonthViewProps, MonthViewState> {
    static range: any;
    static navigate: any;
    static title: any;
    private containerRef;
    private slotRowRef;
    private _bgRows;
    private _pendingSelection;
    private _selectTimer;
    private _resizeListener;
    private _weekCount;
    constructor(props: MonthViewProps);
    static getDerivedStateFromProps({ date, localizer }: {
        date: any;
        localizer: any;
    }, state: any): {
        date: any;
        needLimitMeasure: any;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getContainer: () => HTMLDivElement;
    render(): React.JSX.Element;
    renderWeek: (week: any, weekIdx: any) => React.JSX.Element;
    readerDateHeading: ({ date, className, ...props }: {
        [x: string]: any;
        date: any;
        className: any;
    }) => React.JSX.Element;
    renderHeaders(row: any): React.JSX.Element[];
    renderOverlay(): React.JSX.Element;
    measureRowLimit(): void;
    handleSelectSlot: (range: any, slotInfo: any) => void;
    handleHeadingClick: (date: any, view: any, e: any) => void;
    handleSelectEvent: (...args: any[]) => void;
    handleDoubleClickEvent: (...args: any[]) => void;
    handleKeyPressEvent: (...args: any[]) => void;
    handleShowMore: (events: any, date: any, cell: any, slot: any, target: any) => void;
    overlayDisplay: () => void;
    selectDates(slotInfo: any): void;
    clearSelection(): void;
}
export default MonthView;
