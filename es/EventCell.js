import React from 'react';
import clsx from 'clsx';
class EventCell extends React.Component {
    render() {
        let { style, className, event, selected, isAllDay, onSelect, onDoubleClick, onKeyPress, localizer, continuesPrior, continuesAfter, accessors, getters, children, components: { event: Event, eventWrapper: EventWrapper }, slotStart, slotEnd, ...props } = this.props;
        delete props.resizable;
        let title = accessors.title(event);
        let tooltip = accessors.tooltip(event);
        let end = accessors.end(event);
        let start = accessors.start(event);
        let allDay = accessors.allDay(event);
        let showAsAllDay = isAllDay ||
            allDay ||
            localizer.diff(start, localizer.ceil(end, 'day'), 'day') > 1;
        let userProps = getters.eventProp(event, start, end, selected);
        const content = (React.createElement("div", { className: "rbc-event-content", title: `${localizer.format({ start, end }, 'eventTimeRangeFormat')}\n${tooltip}` }, Event ? (React.createElement(Event, { event: event, continuesPrior: continuesPrior, continuesAfter: continuesAfter, title: title, isAllDay: allDay, localizer: localizer, slotStart: slotStart, slotEnd: slotEnd })) : (title)));
        return (React.createElement(EventWrapper, { ...this.props, type: "date" },
            React.createElement("div", { ...props, style: { ...userProps.style, ...style }, className: clsx('rbc-event', className, userProps.className, {
                    'rbc-selected': selected,
                    'rbc-event-allday': showAsAllDay,
                    'rbc-event-continues-prior': continuesPrior,
                    'rbc-event-continues-after': continuesAfter,
                }), onClick: (e) => onSelect && onSelect(event, e), onDoubleClick: (e) => onDoubleClick && onDoubleClick(event, e), onKeyDown: (e) => onKeyPress && onKeyPress(event, e) }, typeof children === 'function' ? children(content) : content)));
    }
}
export default EventCell;
