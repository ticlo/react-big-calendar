import React from 'react';
import { DateLocalizer } from './localizer';
interface EventCellProps {
    event: any;
    slotStart?: any;
    slotEnd?: any;
    resizable?: boolean;
    selected?: boolean;
    isAllDay?: boolean;
    continuesPrior?: boolean;
    continuesAfter?: boolean;
    accessors: any;
    components: any;
    getters: any;
    localizer: DateLocalizer;
    onSelect?: (...args: any[]) => any;
    onDoubleClick?: (...args: any[]) => any;
    onKeyPress?: (...args: any[]) => any;
    type?: string;
    draggable?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onDragStart?: (...args: any[]) => any;
    onDragEnd?: (...args: any[]) => any;
    children?: any;
}
declare class EventCell extends React.Component<EventCellProps> {
    render(): React.JSX.Element;
}
export default EventCell;
