import React from 'react';
interface EventRowProps {
    segments?: any[];
    slotMetrics: any;
    className?: string;
    localizer: any;
    accessors: any;
    getters: any;
    components: any;
    selected?: any;
    onSelect?: (...args: any[]) => any;
    onDoubleClick?: (...args: any[]) => any;
    onKeyPress?: (...args: any[]) => any;
    resourceId?: any;
}
declare class EventRow extends React.Component<EventRowProps> {
    render(): React.JSX.Element;
}
export default EventRow;
