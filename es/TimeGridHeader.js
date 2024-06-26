import clsx from 'clsx';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import React from 'react';
import DateContentRow from './DateContentRow';
import Header from './Header';
import ResourceHeader from './ResourceHeader';
import { notify } from './utils/helpers';
class TimeGridHeader extends React.Component {
    handleHeaderClick = (date, view, e) => {
        e.preventDefault();
        notify(this.props.onDrillDown, [date, view]);
    };
    renderHeaderCells(range) {
        let { localizer, getDrilldownView, getNow, getters: { dayProp }, components: { header: HeaderComponent = Header }, } = this.props;
        const today = getNow();
        return range.map((date, i) => {
            let drilldownView = getDrilldownView(date);
            let label = localizer.format(date, 'dayFormat');
            const { className, style } = dayProp(date);
            let header = (React.createElement(HeaderComponent, { date: date, label: label, localizer: localizer }));
            return (React.createElement("div", { key: i, style: style, className: clsx('rbc-header', className, localizer.isSameDate(date, today) && 'rbc-today') }, drilldownView ? (React.createElement("button", { type: "button", className: "rbc-button-link", onClick: (e) => this.handleHeaderClick(date, drilldownView, e) }, header)) : (React.createElement("span", null, header))));
        });
    }
    renderRow = (resource) => {
        let { events, rtl, selectable, getNow, range, getters, localizer, accessors, components, resizable, } = this.props;
        const resourceId = accessors.resourceId(resource);
        let eventsToDisplay = resource
            ? events.filter((event) => accessors.resource(event) === resourceId)
            : events;
        return (React.createElement(DateContentRow, { isAllDay: true, rtl: rtl, getNow: getNow, minRows: 2, 
            // Add +1 to include showMore button row in the row limit
            maxRows: this.props.allDayMaxRows + 1, range: range, events: eventsToDisplay, resourceId: resourceId, className: "rbc-allday-cell", selectable: selectable, selected: this.props.selected, components: components, accessors: accessors, getters: getters, localizer: localizer, onSelect: this.props.onSelectEvent, onShowMore: this.props.onShowMore, onDoubleClick: this.props.onDoubleClickEvent, onKeyPress: this.props.onKeyPressEvent, onSelectSlot: this.props.onSelectSlot, longPressThreshold: this.props.longPressThreshold, resizable: resizable }));
    };
    render() {
        let { width, rtl, resources, range, events, getNow, accessors, selectable, components, getters, scrollRef, localizer, isOverflowing, components: { timeGutterHeader: TimeGutterHeader, resourceHeader: ResourceHeaderComponent = ResourceHeader, }, resizable, } = this.props;
        let style = {};
        if (isOverflowing) {
            style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize() - 1}px`;
        }
        const groupedEvents = resources.groupEvents(events);
        return (React.createElement("div", { style: style, ref: scrollRef, className: clsx('rbc-time-header', isOverflowing && 'rbc-overflowing') },
            React.createElement("div", { className: "rbc-label rbc-time-header-gutter", style: { width, minWidth: width, maxWidth: width } }, TimeGutterHeader && React.createElement(TimeGutterHeader, null)),
            resources.map(([id, resource], idx) => (React.createElement("div", { className: "rbc-time-header-content", key: id || idx },
                resource && (React.createElement("div", { className: "rbc-row rbc-row-resource", key: `resource_${idx}` },
                    React.createElement("div", { className: "rbc-header" },
                        React.createElement(ResourceHeaderComponent, { index: idx, label: accessors.resourceTitle(resource), resource: resource })))),
                React.createElement("div", { className: `rbc-row rbc-time-header-cell${range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''}` }, this.renderHeaderCells(range)),
                React.createElement(DateContentRow, { isAllDay: true, rtl: rtl, getNow: getNow, minRows: 2, 
                    // Add +1 to include showMore button row in the row limit
                    maxRows: this.props.allDayMaxRows + 1, range: range, events: groupedEvents.get(id) || [], resourceId: resource && id, className: "rbc-allday-cell", selectable: selectable, selected: this.props.selected, components: components, accessors: accessors, getters: getters, localizer: localizer, onSelect: this.props.onSelectEvent, onShowMore: this.props.onShowMore, onDoubleClick: this.props.onDoubleClickEvent, onKeyDown: this.props.onKeyPressEvent, onSelectSlot: this.props.onSelectSlot, longPressThreshold: this.props.longPressThreshold, resizable: resizable }))))));
    }
}
export default TimeGridHeader;
