import React from 'react';
import type { DateTime } from 'luxon';
import { DateLocalizer } from './localizer';

import Week from './Week';
import TimeGrid from './TimeGrid';

interface WorkWeekProps {
  date: DateTime;
  localizer: DateLocalizer;
  min?: DateTime;
  max?: DateTime;
  scrollToTime?: DateTime;
  enableAutoScroll?: boolean;
}

class WorkWeek extends React.Component<WorkWeekProps> {
  static defaultProps = TimeGrid.defaultProps;

  static range = (date: DateTime, options: { localizer: DateLocalizer }) => {
    const { localizer } = options;
    let r: DateTime[] & { start?: DateTime; end?: DateTime } = Week.range(
      date,
      options
    ).filter((d: DateTime) => {
      const weekday = localizer.add(d, 0, 'minutes').weekday;
      return [6, 7].indexOf(weekday) === -1;
    });
    r.start = r[0];
    r.end = localizer.endOf(r[r.length - 1], 'day');
    return r;
  };

  static navigate = Week.navigate;

  static title = (
    date: DateTime,
    { localizer }: { localizer: DateLocalizer }
  ): string => {
    let [start, ...rest] = WorkWeek.range(date, { localizer });

    return localizer.format(
      { start, end: rest.pop()! },
      'dayRangeHeaderFormat'
    );
  };

  render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TimeGrid is converted to a functional component.
     */
    let {
      date,
      localizer,
      min = localizer.startOf(undefined, 'day'),
      max = localizer.endOf(undefined, 'day'),
      scrollToTime = localizer.startOf(undefined, 'day'),
      enableAutoScroll = true,
      ...props
    } = this.props;
    let range = WorkWeek.range(date, this.props);
    return (
      <TimeGrid
        {...(props as any)}
        range={range}
        eventOffset={15}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
        enableAutoScroll={enableAutoScroll}
      />
    );
  }
}

export default WorkWeek;
