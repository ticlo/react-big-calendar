import React from 'react';
import { DateLocalizer } from './localizer';
interface PopOverlayProps {
    show?: boolean;
    popupOffset?: number | {
        x?: number;
        y?: number;
    };
    overlay?: {
        position?: object;
        events?: unknown[];
        date?: Date;
        end?: Date;
        target?: any;
    };
    accessors: any;
    localizer: DateLocalizer;
    components: any;
    getters: any;
    selected?: object;
    handleSelectEvent?: (...args: unknown[]) => unknown;
    handleDoubleClickEvent?: (...args: unknown[]) => unknown;
    handleKeyPressEvent?: (...args: unknown[]) => unknown;
    handleDragStart?: (...args: unknown[]) => unknown;
    onHide?: (...args: unknown[]) => unknown;
    overlayDisplay?: (...args: unknown[]) => unknown;
}
declare const PopOverlay: React.ForwardRefExoticComponent<PopOverlayProps & React.RefAttributes<HTMLElement>>;
export default PopOverlay;
