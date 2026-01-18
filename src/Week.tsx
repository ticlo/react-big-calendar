import React from 'react';
import { DateLocalizer } from './localizer';

import { navigate } from './utils/constants';

import { SlotInfo } from './types';
import TimeGrid from './TimeGrid';

interface WeekProps {
  date: Date;
  events: unknown[];
  backgroundEvents: unknown[];
  resources?: unknown[];
  step?: number;
  timeslots?: number;
  range?: Date[];
  min?: Date;
  max?: Date;
  getNow: (...args: unknown[]) => unknown;
  scrollToTime?: Date;
  enableAutoScroll?: boolean;
  showMultiDayTimes?: boolean;
  rtl?: boolean;
  resizable?: boolean;
  width?: number;
  accessors: any;
  components: any;
  getters: any;
  localizer: DateLocalizer;
  allDayMaxRows?: number;
  selected?: object;
  selectable?: true | false | 'ignoreEvents';
  longPressThreshold?: number;
  onNavigate?: (...args: unknown[]) => unknown;
  onSelectSlot?: (slotInfo: SlotInfo) => unknown;
  onSelectEnd?: (...args: unknown[]) => unknown;
  onSelectStart?: (...args: unknown[]) => unknown;
  onSelectEvent?: (...args: unknown[]) => unknown;
  onDoubleClickEvent?: (...args: unknown[]) => unknown;
  onKeyPressEvent?: (...args: unknown[]) => unknown;
  onShowMore?: (...args: unknown[]) => unknown;
  onDrillDown?: (...args: unknown[]) => unknown;
  getDrilldownView: (...args: unknown[]) => unknown;
  dayLayoutAlgorithm?: unknown;
  showAllEvents?: boolean;
  doShowMoreDrillDown?: boolean;
  popup?: boolean;
  handleDragStart?: (...args: unknown[]) => unknown;
  popupOffset?:
    | number
    | {
        x?: number;
        y?: number;
      };
}

class Week extends React.Component<WeekProps> {
  static defaultProps = TimeGrid.defaultProps;

  static navigate = (
    date: any,
    action: string,
    { localizer }: { localizer: DateLocalizer }
  ) => {
    switch (action) {
      case navigate.PREVIOUS:
        return localizer.add(date, -1, 'week');

      case navigate.NEXT:
        return localizer.add(date, 1, 'week');

      default:
        return date;
    }
  };

  static range = (date: any, { localizer }: { localizer: DateLocalizer }) => {
    let firstOfWeek = localizer.startOfWeek();
    let start = localizer.startOf(date, 'week', firstOfWeek);
    let end = localizer.endOf(date, 'week', firstOfWeek);

    let r: any = localizer.range(start, end);
    r.start = start;
    r.end = end;
    return r;
  };

  static title = (date: any, { localizer }: { localizer: DateLocalizer }) => {
    let [start, ...rest] = Week.range(date, { localizer });
    return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
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
    let range = Week.range(date, this.props);

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

export default Week;
