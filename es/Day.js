import React from 'react';
import { navigate } from './utils/constants';
import TimeGrid from './TimeGrid';
class Day extends React.Component {
    render() {
        /**
         * This allows us to default min, max, and scrollToTime
         * using our localizer. This is necessary until such time
         * as TODO: TimeGrid is converted to a functional component.
         */
        let { date, localizer, min = localizer.startOf(new Date(), 'day'), max = localizer.endOf(new Date(), 'day'), scrollToTime = localizer.startOf(new Date(), 'day'), enableAutoScroll = true, ...props } = this.props;
        let range = Day.range(date, { localizer: localizer });
        return (React.createElement(TimeGrid, { ...props, range: range, eventOffset: 10, localizer: localizer, min: min, max: max, scrollToTime: scrollToTime, enableAutoScroll: enableAutoScroll }));
    }
}
Day.range = (date, { localizer }) => {
    let r = [localizer.startOf(date, 'day')];
    r.start = r[0];
    r.end = localizer.endOf(date, 'day');
    return r;
};
Day.navigate = (date, action, { localizer }) => {
    switch (action) {
        case navigate.PREVIOUS:
            return localizer.add(date, -1, 'day');
        case navigate.NEXT:
            return localizer.add(date, 1, 'day');
        default:
            return date;
    }
};
Day.title = (date, { localizer }) => localizer.format(date, 'dayHeaderFormat');
export default Day;
