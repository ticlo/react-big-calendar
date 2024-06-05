import React from 'react'
import { DateTime } from 'luxon'


import { navigate } from './utils/constants'
import { DayLayoutAlgorithmPropType } from './utils/propTypes'

import TimeGrid from './TimeGrid'
import { DateLocalizer } from './types'

interface WeekProps {
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

class Week extends React.Component<WeekProps> {
  render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TimeGrid is converted to a functional component.
     */
    let {
      date,
      localizer,
      min = localizer.startOf(new Date(), 'day'),
      max = localizer.endOf(new Date(), 'day'),
      scrollToTime = localizer.startOf(new Date(), 'day'),
      enableAutoScroll = true,
      ...props
    } = this.props
    let range = Week.range(date, this.props)

    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={15}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
        enableAutoScroll={enableAutoScroll}
      />
    )
  }
}

Week.defaultProps = TimeGrid.defaultProps

Week.navigate = (date, action, { localizer }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'week')

    case navigate.NEXT:
      return localizer.add(date, 1, 'week')

    default:
      return date
  }
}

Week.range = (date, { localizer }:{localizer:DateLocalizer}) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = localizer.startOf(date, 'week', firstOfWeek)
  let end = localizer.endOf(date, 'week', firstOfWeek)

  let r = localizer.range(start, end)
  r.start = start;
  r.end = end;
  return r;
}

Week.title = (date, { localizer }) => {
  let [start, ...rest] = Week.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default Week
