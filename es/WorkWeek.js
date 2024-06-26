import React from 'react';
import Week from './Week';
import TimeGrid from './TimeGrid';
function workWeekRange(date, options) {
    let r = Week.range(date, options).filter((d) => [6, 0].indexOf(d.getDay()) === -1);
    r.start = r[0];
    r.end = r.at(-1).setHours(23, 59, 59, 999);
    return r;
}
class WorkWeek extends React.Component {
    render() {
        /**
         * This allows us to default min, max, and scrollToTime
         * using our localizer. This is necessary until such time
         * as TimeGrid is converted to a functional component.
         */
        let { date, localizer, min = localizer.startOf(new Date(), 'day'), max = localizer.endOf(new Date(), 'day'), scrollToTime = localizer.startOf(new Date(), 'day'), enableAutoScroll = true, ...props } = this.props;
        let range = workWeekRange(date, this.props);
        return (React.createElement(TimeGrid, { ...props, range: range, eventOffset: 15, localizer: localizer, min: min, max: max, scrollToTime: scrollToTime, enableAutoScroll: enableAutoScroll }));
    }
}
WorkWeek.defaultProps = TimeGrid.defaultProps;
WorkWeek.range = workWeekRange;
WorkWeek.navigate = Week.navigate;
WorkWeek.title = (date, { localizer }) => {
    let [start, ...rest] = workWeekRange(date, { localizer });
    return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
};
export default WorkWeek;
