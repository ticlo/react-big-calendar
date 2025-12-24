import React from 'react'
import { DateLocalizer } from './localizer'

import { navigate } from './utils/constants'
import { DayLayoutAlgorithmPropType } from './utils/propTypes'

import TimeGrid from './TimeGrid'

interface DayProps {
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
  static range = (date: any, { localizer }: { localizer: DateLocalizer }) => {
    let r: any = [localizer.startOf(date, 'day')]
    r.start = r[0]
    r.end = localizer.endOf(date, 'day')
    return r
  }

  static navigate = (
    date: any,
    action: string,
    { localizer }: { localizer: DateLocalizer }
  ) => {
    switch (action) {
      case navigate.PREVIOUS:
        return localizer.add(date, -1, 'day')

      case navigate.NEXT:
        return localizer.add(date, 1, 'day')

      default:
        return date
    }
  }

  static title = (date: any, { localizer }: { localizer: DateLocalizer }) =>
    localizer.format(date, 'dayHeaderFormat')

  render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TODO: TimeGrid is converted to a functional component.
     */
    let {
      date,
      localizer,
      min = localizer.startOf(undefined, 'day'),
      max = localizer.endOf(undefined, 'day'),
      scrollToTime = localizer.startOf(undefined, 'day'),
      enableAutoScroll = true,
      ...props
    } = this.props
    let range = Day.range(date, { localizer: localizer })

    return (
      <TimeGrid
        {...(props as any)}
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


export default Day
