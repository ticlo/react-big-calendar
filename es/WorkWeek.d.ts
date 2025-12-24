import React from 'react';
import { DateLocalizer } from './localizer';
interface WorkWeekProps {
    date: Date;
    localizer: DateLocalizer;
    min?: Date;
    max?: Date;
    scrollToTime?: Date;
    enableAutoScroll?: boolean;
}
declare class WorkWeek extends React.Component<WorkWeekProps> {
    static defaultProps: {
        step: number;
        timeslots: number;
    };
    static range: (date: any, options: {
        localizer: DateLocalizer;
    }) => any;
    static navigate: (date: any, action: string, { localizer }: {
        localizer: DateLocalizer;
    }) => any;
    static title: (date: any, { localizer }: {
        localizer: DateLocalizer;
    }) => string;
    render(): React.JSX.Element;
}
export default WorkWeek;
