import React from 'react';
import { DateLocalizer } from './localizer';
interface ToolbarProps {
    view: string;
    views: string[];
    label: React.ReactNode;
    localizer: DateLocalizer;
    onNavigate: (action: string, newDate?: any) => void;
    onView: (view: string) => void;
    date: any;
}
declare class Toolbar extends React.Component<ToolbarProps> {
    render(): React.JSX.Element;
    navigate: (action: any) => void;
    view: (view: any) => void;
    viewNamesGroup(messages: any): React.JSX.Element[];
}
export default Toolbar;
