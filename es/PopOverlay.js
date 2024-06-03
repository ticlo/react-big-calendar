import React, { useRef } from 'react';
import { Overlay } from 'react-overlays';
import Popup from './Popup';
function CalOverlay({ containerRef, popupOffset = 5, overlay, accessors, localizer, components, getters, selected, handleSelectEvent, handleDoubleClickEvent, handleKeyPressEvent, handleDragStart, onHide, overlayDisplay, }) {
    const popperRef = useRef(null);
    if (!overlay.position)
        return null;
    let offset = popupOffset;
    if (!isNaN(popupOffset)) {
        offset = { x: popupOffset, y: popupOffset };
    }
    const { position, events, date, end } = overlay;
    return (React.createElement(Overlay, { rootClose: true, flip: true, show: true, placement: "bottom", onHide: onHide, target: overlay.target }, ({ props }) => (React.createElement(Popup, { ...props, containerRef: containerRef, ref: popperRef, target: overlay.target, offset: offset, accessors: accessors, getters: getters, selected: selected, components: components, localizer: localizer, position: position, show: overlayDisplay, events: events, slotStart: date, slotEnd: end, onSelect: handleSelectEvent, onDoubleClick: handleDoubleClickEvent, onKeyPress: handleKeyPressEvent, handleDragStart: handleDragStart }))));
}
const PopOverlay = React.forwardRef((props, ref) => (React.createElement(CalOverlay, { ...props, containerRef: ref })));
export default PopOverlay;
