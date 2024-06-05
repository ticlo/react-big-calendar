import React from 'react'
import { DateTime } from 'luxon'


import { navigate } from './utils/constants'
import { DayLayoutAlgorithmPropType } from './utils/propTypes'

import TimeGrid from './TimeGrid'

interface DayProps {
  date: DateTime;
  events: unknown[];
  backgroundEvents: unknown[];
  resources?: unknown[];
  step?: number;
  timeslots?: number;
  range?: DateTime[];
  min?: DateTime;
  max?: DateTime;
  getNow: (...args: unknown[]) => unknown;
  scrollToTime?: DateTime;
  enableAutoScroll?: boolean;
  showMultiDayTimes?: boolean;
  rtl?: boolean;
  resizable?: boolean;
  width?: number;
  accessors: object;
  components: object;
  getters: object;
  localizer: object;
  allDayMaxRows?: number;
  selected?: object;
  selectable?: true | false | "ignoreEvents";
  longPressThreshold?: number;
  onNavigate?: (...args: unknown[]) => unknown;
  onSelectSlot?: (...args: unknown[]) => unknown;
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
  popupOffset?: number | {
    x?: number;
    y?: number;
  };
}

class Day extends React.Component<DayProps> {
  render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TODO: TimeGrid is converted to a functional component.
     */
    let {
      date,
      localizer,
      min = DateTime.now().startOf('day'),
      max = DateTime.now().endOf('day'),
      scrollToTime = DateTime.now().startOf('day'),
      enableAutoScroll = true,
      ...props
    } = this.props
    let range = Day.range(date, { localizer: localizer })

    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={10}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
        enableAutoScroll={enableAutoScroll}
      />
    )
  }
}

Day.range = (date, { localizer }) => {
  let r = [localizer.startOf(date, 'day')]
  r.start = r[0];
  r.end = localizer.endOf(date, 'day')
  return r;
}

Day.navigate = (date, action, { localizer }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'day')

    case navigate.NEXT:
      return localizer.add(date, 1, 'day')

    default:
      return date
  }
}

Day.title = (date, { localizer }) => localizer.format(date, 'dayHeaderFormat')

export default Day
