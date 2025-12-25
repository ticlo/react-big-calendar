import React from 'react';
interface BackgroundCellsProps {
    date?: Date;
    getNow: (...args: any[]) => any;
    getters: any;
    components: any;
    container?: (...args: any[]) => any;
    dayPropGetter?: (...args: any[]) => any;
    selectable?: true | false | 'ignoreEvents';
    longPressThreshold?: number;
    onSelectSlot: (args: {
        start: any;
        end: any;
        action: any;
        bounds: any;
        box: any;
        resourceId: any;
    }) => any;
    onSelectEnd?: (...args: any[]) => any;
    onSelectStart?: (...args: any[]) => any;
    range?: any[];
    rtl?: boolean;
    type?: string;
    resourceId?: any;
    localizer?: any;
}
interface BackgroundCellsState {
    selecting: boolean;
    startIdx?: number;
    endIdx?: number;
}
declare class BackgroundCells extends React.Component<BackgroundCellsProps, BackgroundCellsState> {
    private containerRef;
    private _selector;
    private _initial;
    constructor(props: any, context: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any): void;
    render(): React.JSX.Element;
    _selectable(): void;
    _teardownSelectable(): void;
    _selectSlot({ endIdx, startIdx, action, bounds, box }: {
        endIdx: any;
        startIdx: any;
        action: any;
        bounds: any;
        box: any;
    }): void;
}
export default BackgroundCells;
