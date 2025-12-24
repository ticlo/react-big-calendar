import React from 'react';
interface DateHeaderProps {
    label?: React.ReactNode;
    date?: Date;
    drilldownView?: string;
    onDrillDown?: (...args: unknown[]) => unknown;
    isOffRange?: boolean;
}
declare const DateHeader: ({ label, drilldownView, onDrillDown }: DateHeaderProps) => React.JSX.Element;
export default DateHeader;
