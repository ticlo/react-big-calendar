import React, { Component } from 'react';
interface TimeSlotGroupProps {
    renderSlot?: (...args: any[]) => any;
    group: any[];
    resource?: any;
    components?: any;
    getters?: any;
}
export default class TimeSlotGroup extends Component<TimeSlotGroupProps> {
    render(): React.JSX.Element;
}
export {};
