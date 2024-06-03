import clsx from 'clsx';
import React from 'react';
import EventRowMixin from './EventRowMixin';
class EventRow extends React.Component {
    render() {
        let { segments, slotMetrics: { slots }, className, } = this.props;
        let lastEnd = 1;
        return (React.createElement("div", { className: clsx(className, 'rbc-row') }, segments.reduce((row, { event, left, right, span }, li) => {
            let key = '_lvl_' + li;
            let gap = left - lastEnd;
            let content = EventRowMixin.renderEvent(this.props, event);
            if (gap)
                row.push(EventRowMixin.renderSpan(slots, gap, `${key}_gap`));
            row.push(EventRowMixin.renderSpan(slots, span, key, content));
            lastEnd = right + 1;
            return row;
        }, [])));
    }
}
EventRow.defaultProps = {
    ...EventRowMixin.defaultProps,
};
export default EventRow;
