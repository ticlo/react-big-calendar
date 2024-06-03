import React, { createRef } from 'react';
import clsx from 'clsx';
import getHeight from 'dom-helpers/height';
import qsa from 'dom-helpers/querySelectorAll';
import BackgroundCells from './BackgroundCells';
import EventRow from './EventRow';
import EventEndingRow from './EventEndingRow';
import NoopWrapper from './NoopWrapper';
import ScrollableWeekWrapper from './ScrollableWeekWrapper';
import * as DateSlotMetrics from './utils/DateSlotMetrics';
class DateContentRow extends React.Component {
    constructor(...args) {
        super(...args);
        this.containerRef = createRef();
        this.headingRowRef = createRef();
        this.eventRowRef = createRef();
        this.slotMetrics = DateSlotMetrics.getSlotMetrics();
    }
    handleSelectSlot = (slot) => {
        const { range, onSelectSlot } = this.props;
        onSelectSlot(range.slice(slot.start, slot.end + 1), slot);
    };
    handleShowMore = (slot, target) => {
        const { range, onShowMore } = this.props;
        let metrics = this.slotMetrics(this.props);
        let row = qsa(this.containerRef.current, '.rbc-row-bg')[0];
        let cell;
        if (row)
            cell = row.children[slot - 1];
        let events = metrics.getEventsForSlot(slot);
        onShowMore(events, range[slot - 1], cell, slot, target);
    };
    getContainer = () => {
        const { container } = this.props;
        return container ? container() : this.containerRef.current;
    };
    getRowLimit() {
        /* Guessing this only gets called on the dummyRow */
        const eventHeight = getHeight(this.eventRowRef.current);
        const headingHeight = this.headingRowRef?.current
            ? getHeight(this.headingRowRef.current)
            : 0;
        const eventSpace = getHeight(this.containerRef.current) - headingHeight;
        return Math.max(Math.floor(eventSpace / eventHeight), 1);
    }
    renderHeadingCell = (date, index) => {
        let { renderHeader, getNow, localizer } = this.props;
        return renderHeader({
            date,
            key: `header_${index}`,
            className: clsx('rbc-date-cell', localizer.isSameDate(date, getNow()) && 'rbc-now'),
        });
    };
    renderDummy = () => {
        let { className, range, renderHeader, showAllEvents } = this.props;
        return (React.createElement("div", { className: className, ref: this.containerRef },
            React.createElement("div", { className: clsx('rbc-row-content', showAllEvents && 'rbc-row-content-scrollable') },
                renderHeader && (React.createElement("div", { className: "rbc-row", ref: this.headingRowRef }, range.map(this.renderHeadingCell))),
                React.createElement("div", { className: "rbc-row", ref: this.eventRowRef },
                    React.createElement("div", { className: "rbc-row-segment" },
                        React.createElement("div", { className: "rbc-event" },
                            React.createElement("div", { className: "rbc-event-content" }, "\u00A0")))))));
    };
    render() {
        const { date, rtl, range, className, selected, selectable, renderForMeasure, accessors, getters, components, getNow, renderHeader, onSelect, localizer, onSelectStart, onSelectEnd, onDoubleClick, onKeyPress, resourceId, longPressThreshold, isAllDay, resizable, showAllEvents, } = this.props;
        if (renderForMeasure)
            return this.renderDummy();
        let metrics = this.slotMetrics(this.props);
        let { levels, extra } = metrics;
        let ScrollableWeekComponent = showAllEvents
            ? ScrollableWeekWrapper
            : NoopWrapper;
        let WeekWrapper = components.weekWrapper;
        const eventRowProps = {
            selected,
            accessors,
            getters,
            localizer,
            components,
            onSelect,
            onDoubleClick,
            onKeyPress,
            resourceId,
            slotMetrics: metrics,
            resizable,
        };
        return (React.createElement("div", { className: className, role: "rowgroup", ref: this.containerRef },
            React.createElement(BackgroundCells, { localizer: localizer, date: date, getNow: getNow, rtl: rtl, range: range, selectable: selectable, container: this.getContainer, getters: getters, onSelectStart: onSelectStart, onSelectEnd: onSelectEnd, onSelectSlot: this.handleSelectSlot, components: components, longPressThreshold: longPressThreshold, resourceId: resourceId }),
            React.createElement("div", { className: clsx('rbc-row-content', showAllEvents && 'rbc-row-content-scrollable'), role: "row" },
                renderHeader && (React.createElement("div", { className: "rbc-row ", ref: this.headingRowRef }, range.map(this.renderHeadingCell))),
                React.createElement(ScrollableWeekComponent, null,
                    React.createElement(WeekWrapper, { isAllDay: isAllDay, ...eventRowProps, rtl: this.props.rtl },
                        levels.map((segs, idx) => (React.createElement(EventRow, { key: idx, segments: segs, ...eventRowProps }))),
                        !!extra.length && (React.createElement(EventEndingRow, { segments: extra, onShowMore: this.handleShowMore, ...eventRowProps })))))));
    }
}
DateContentRow.defaultProps = {
    minRows: 0,
    maxRows: Infinity,
};
export default DateContentRow;
