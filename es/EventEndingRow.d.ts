import React from 'react';
interface EventEndingRowProps {
    segments?: any[];
    slots?: number;
    onShowMore?: (...args: any[]) => any;
    slotMetrics: any;
    localizer: any;
    accessors: any;
    getters: any;
    components: any;
    selected?: any;
    onSelect?: (...args: any[]) => any;
    onDoubleClick?: (...args: any[]) => any;
    onKeyPress?: (...args: any[]) => any;
}
declare class EventEndingRow extends React.Component<EventEndingRowProps> {
    render(): React.JSX.Element;
    canRenderSlotEvent(slot: any, span: any): boolean;
    renderShowMore(segments: any, slot: any): false | React.JSX.Element;
    showMore(slot: any, e: any): void;
}
export default EventEndingRow;
