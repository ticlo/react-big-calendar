import React, { useLayoutEffect } from 'react';
import getOffset from 'dom-helpers/offset';
import useClickOutside from './hooks/useClickOutside';
import EventCell from './EventCell';
import { isSelected } from './utils/selection';
/**
 * Changes to react-overlays cause issue with auto positioning,
 * so we need to manually calculate the position of the popper,
 * and constrain it to the Month container.
 */
function getPosition({ target, offset, container, box }) {
    const { top, left, width, height } = getOffset(target);
    const { top: cTop, left: cLeft, width: cWidth, height: cHeight, } = getOffset(container);
    const { width: bWidth, height: bHeight } = getOffset(box);
    const viewBottom = cTop + cHeight;
    const viewRight = cLeft + cWidth;
    const bottom = top + bHeight;
    const right = left + bWidth;
    const { x, y } = offset;
    const topOffset = bottom > viewBottom ? top - bHeight - y : top + y + height;
    const leftOffset = right > viewRight ? left + x - bWidth + width : left + x;
    return {
        topOffset,
        leftOffset,
    };
}
function Pop({ containerRef, accessors, getters, selected, components, localizer, position, show, events, slotStart, slotEnd, onSelect, onDoubleClick, onKeyPress, handleDragStart, popperRef, target, offset, }) {
    useClickOutside({ ref: popperRef, callback: show });
    useLayoutEffect(() => {
        const { topOffset, leftOffset } = getPosition({
            target,
            offset,
            container: containerRef.current,
            box: popperRef.current,
        });
        popperRef.current.style.top = `${topOffset}px`;
        popperRef.current.style.left = `${leftOffset}px`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset.x, offset.y, target]);
    const { width } = position;
    const style = {
        minWidth: width + width / 2,
    };
    return (React.createElement("div", { style: style, className: "rbc-overlay", ref: popperRef },
        React.createElement("div", { className: "rbc-overlay-header" }, localizer.format(slotStart, 'dayHeaderFormat')),
        events.map((event, idx) => (React.createElement(EventCell, { key: idx, type: "popup", localizer: localizer, event: event, getters: getters, onSelect: onSelect, accessors: accessors, components: components, onDoubleClick: onDoubleClick, onKeyPress: onKeyPress, continuesPrior: localizer.lt(accessors.end(event), slotStart, 'day'), continuesAfter: localizer.gte(accessors.start(event), slotEnd, 'day'), slotStart: slotStart, slotEnd: slotEnd, selected: isSelected(event, selected), draggable: true, onDragStart: () => handleDragStart(event), onDragEnd: () => show() })))));
}
const Popup = React.forwardRef((props, ref) => (React.createElement(Pop, { ...props, popperRef: ref })));
export default Popup;
