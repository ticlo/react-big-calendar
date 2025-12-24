import React from 'react';
import { DateLocalizer } from './localizer';
interface DayColumnProps {
    events: any[];
    backgroundEvents: any[];
    step: number;
    date: any;
    min: any;
    max: any;
    getNow: (...args: any[]) => any;
    isNow?: boolean;
    rtl?: boolean;
    resizable?: boolean;
    accessors: any;
    components: any;
    getters: any;
    localizer: DateLocalizer;
    showMultiDayTimes?: boolean;
    culture?: string;
    timeslots?: number;
    selected?: any;
    selectable?: true | false | 'ignoreEvents';
    eventOffset?: number;
    longPressThreshold?: number;
    onSelecting?: (...args: any[]) => any;
    onSelectSlot: (...args: any[]) => any;
    onSelectEvent: (...args: any[]) => any;
    onDoubleClickEvent: (...args: any[]) => any;
    onKeyPressEvent?: (...args: any[]) => any;
    className?: string;
    dragThroughEvents?: boolean;
    resource?: any;
    dayLayoutAlgorithm?: any;
}
interface DayColumnState {
    selecting: boolean;
    timeIndicatorPosition: any;
    top?: string;
    height?: string;
    startDate?: any;
    endDate?: any;
}
declare class DayColumn extends React.Component<DayColumnProps, DayColumnState> {
    private slotMetrics;
    private containerRef;
    private _selectTimer;
    private _pendingSelection;
    private _resizeListener;
    private _scrollRatio;
    private _updatingOverflow;
    private _selectableDelete;
    private _selectRect;
    private _isTouch;
    private _initialEventData;
    private _lastClickData;
    private _selector;
    private _initialSlot;
    private _timeIndicatorTimeout;
    static defaultProps: {
        dragThroughEvents: boolean;
        timeslots: number;
    };
    state: DayColumnState;
    intervalTriggered: boolean;
    constructor(props: DayColumnProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    /**
     * @param tail {Boolean} - whether `positionTimeIndicator` call should be
     *   deferred or called upon setting interval (`true` - if deferred);
     */
    setTimeIndicatorPositionUpdateInterval(tail?: boolean): void;
    clearTimeIndicatorInterval(): void;
    positionTimeIndicator(): void;
    render(): React.JSX.Element;
    renderEvents: ({ events, isBackgroundEvent }: {
        events: any;
        isBackgroundEvent: any;
    }) => any;
    _selectable: () => void;
    _teardownSelectable: () => void;
    _selectSlot: ({ startDate, endDate, action, bounds, box }: {
        startDate: any;
        endDate: any;
        action: any;
        bounds: any;
        box: any;
    }) => void;
    _select: (...args: any[]) => void;
    _doubleClick: (...args: any[]) => void;
    _keyPress: (...args: any[]) => void;
}
export default DayColumn;
