import React, { createRef } from 'react'
import { DateTime } from 'luxon'
import clsx from 'clsx'

import Selection, { getBoundsForNode, isEvent } from './Selection'
import * as TimeSlotUtils from './utils/TimeSlots'
import { isSelected } from './utils/selection'

import { notify } from './utils/helpers'
import * as DayEventLayout from './utils/DayEventLayout'
import TimeSlotGroup from './TimeSlotGroup'
import TimeGridEvent from './TimeGridEvent'
import { DayLayoutAlgorithmPropType } from './utils/propTypes'

import DayColumnWrapper from './DayColumnWrapper'
import { DateLocalizer } from './localizer'

interface DayColumnProps {
  events: unknown[];
  backgroundEvents: unknown[];
  step: number;
  date: DateTime;
  min: DateTime;
  max: DateTime;
  getNow: (...args: unknown[]) => unknown;
  isNow?: boolean;
  rtl?: boolean;
  resizable?: boolean;
  accessors: object;
  components: object;
  getters: object;
  localizer: DateLocalizer;
  showMultiDayTimes?: boolean;
  culture?: string;
  timeslots?: number;
  selected?: object;
  selectable?: true | false | "ignoreEvents";
  eventOffset?: number;
  longPressThreshold?: number;
  onSelecting?: (...args: unknown[]) => unknown;
  onSelectSlot: (...args: unknown[]) => unknown;
  onSelectEvent: (...args: unknown[]) => unknown;
  onDoubleClickEvent: (...args: unknown[]) => unknown;
  onKeyPressEvent?: (...args: unknown[]) => unknown;
  className?: string;
  dragThroughEvents?: boolean;
  resource?: any;
  dayLayoutAlgorithm?: unknown;
}

class DayColumn extends React.Component<DayColumnProps> {
  state = { selecting: false, timeIndicatorPosition: null }
  intervalTriggered = false

  constructor(...args) {
    super(...args)

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props)
    this.containerRef = createRef()
  }

  componentDidMount() {
    this.props.selectable && this._selectable()

    if (this.props.isNow) {
      this.setTimeIndicatorPositionUpdateInterval()
    }
  }

  componentWillUnmount() {
    this._teardownSelectable()
    this.clearTimeIndicatorInterval()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectable && !prevProps.selectable) this._selectable()
    if (!this.props.selectable && prevProps.selectable)
      this._teardownSelectable()

    const { getNow, isNow, localizer, date, min, max } = this.props
    const getNowChanged = localizer.neq(prevProps.getNow(), getNow(), 'minutes')

    if (prevProps.isNow !== isNow || getNowChanged) {
      this.clearTimeIndicatorInterval()

      if (isNow) {
        const tail =
          !getNowChanged &&
          localizer.eq(prevProps.date, date, 'minutes') &&
          prevState.timeIndicatorPosition === this.state.timeIndicatorPosition

        this.setTimeIndicatorPositionUpdateInterval(tail)
      }
    } else if (
      isNow &&
      (localizer.neq(prevProps.min, min, 'minutes') ||
        localizer.neq(prevProps.max, max, 'minutes'))
    ) {
      this.positionTimeIndicator()
    }
  }

  /**
   * @param tail {Boolean} - whether `positionTimeIndicator` call should be
   *   deferred or called upon setting interval (`true` - if deferred);
   */
  setTimeIndicatorPositionUpdateInterval(tail = false) {
    if (!this.intervalTriggered && !tail) {
      this.positionTimeIndicator()
    }

    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.intervalTriggered = true
      this.positionTimeIndicator()
      this.setTimeIndicatorPositionUpdateInterval()
    }, 60000)
  }

  clearTimeIndicatorInterval() {
    this.intervalTriggered = false
    window.clearTimeout(this._timeIndicatorTimeout)
  }

  positionTimeIndicator() {
    const { min, max, getNow } = this.props
    const current = getNow()

    if (current >= min && current <= max) {
      const top = this.slotMetrics.getCurrentTimePosition(current)
      this.intervalTriggered = true
      this.setState({ timeIndicatorPosition: top })
    } else {
      this.clearTimeIndicatorInterval()
    }
  }

  render() {
    const {
      date,
      max,
      rtl,
      isNow,
      resource,
      accessors,
      localizer,
      getters: { dayProp, ...getters },
      components: { eventContainerWrapper: EventContainer, ...components },
    } = this.props

    this.slotMetrics = this.slotMetrics.update(this.props)

    let { slotMetrics } = this
    let { selecting, top, height, startDate, endDate } = this.state

    let selectDates = { start: startDate, end: endDate }

    const { className, style } = dayProp(max)

    const DayColumnWrapperComponent =
      components.dayColumnWrapper || DayColumnWrapper

    return (
      <DayColumnWrapperComponent
        ref={this.containerRef}
        date={date}
        style={style}
        className={clsx(
          className,
          'rbc-day-slot',
          'rbc-time-column',
          isNow && 'rbc-now',
          isNow && 'rbc-today', // WHY
          selecting && 'rbc-slot-selecting'
        )}
        slotMetrics={slotMetrics}
      >
        {slotMetrics.groups.map((grp, idx) => (
          <TimeSlotGroup
            key={idx}
            group={grp}
            resource={resource}
            getters={getters}
            components={components}
          />
        ))}
        <EventContainer
          localizer={localizer}
          resource={resource}
          accessors={accessors}
          getters={getters}
          components={components}
          slotMetrics={slotMetrics}
        >
          <div className={clsx('rbc-events-container', rtl && 'rtl')}>
            {this.renderEvents({
              events: this.props.backgroundEvents,
              isBackgroundEvent: true,
            })}
            {this.renderEvents({ events: this.props.events })}
          </div>
        </EventContainer>

        {selecting && (
          <div className="rbc-slot-selection" style={{ top, height }}>
            <span>{localizer.format(selectDates, 'selectRangeFormat')}</span>
          </div>
        )}
        {isNow && this.intervalTriggered && (
          <div
            className="rbc-current-time-indicator"
            style={{ top: `${this.state.timeIndicatorPosition}%` }}
          />
        )}
      </DayColumnWrapperComponent>
    )
  }

  renderEvents = ({ events, isBackgroundEvent }) => {
    let {
      rtl,
      selected,
      accessors,
      localizer,
      getters,
      components,
      step,
      timeslots,
      dayLayoutAlgorithm,
      resizable,
    } = this.props

    const { slotMetrics } = this
    const { messages } = localizer

    let styledEvents = DayEventLayout.getStyledEvents({
      events,
      accessors,
      slotMetrics,
      minimumStartDifference: Math.ceil((step * timeslots) / 2),
      dayLayoutAlgorithm,
    })

    return styledEvents.map(({ event, style }, idx) => {
      let end = accessors.end(event)
      let start = accessors.start(event)
      let format = 'eventTimeRangeFormat'
      let label

      const startsBeforeDay = slotMetrics.startsBeforeDay(start)
      const startsAfterDay = slotMetrics.startsAfterDay(end)

      if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
      else if (startsAfterDay) format = 'eventTimeRangeStartFormat'

      if (startsBeforeDay && startsAfterDay) label = messages.allDay
      else label = localizer.format({ start, end }, format)

      let continuesPrior = startsBeforeDay || slotMetrics.startsBefore(start)
      let continuesAfter = startsAfterDay || slotMetrics.startsAfter(end)

      return (
        <TimeGridEvent
          style={style}
          event={event}
          label={label}
          key={'evt_' + idx}
          getters={getters}
          rtl={rtl}
          components={components}
          continuesPrior={continuesPrior}
          continuesAfter={continuesAfter}
          accessors={accessors}
          resource={this.props.resource}
          selected={isSelected(event, selected)}
          onClick={(e) =>
            this._select(
              {
                ...event,
                ...(this.props.resource && {
                  sourceResource: this.props.resource,
                }),
                ...(isBackgroundEvent && { isBackgroundEvent: true }),
              },
              e
            )
          }
          onDoubleClick={(e) => this._doubleClick(event, e)}
          isBackgroundEvent={isBackgroundEvent}
          onKeyPress={(e) => this._keyPress(event, e)}
          resizable={resizable}
        />
      )
    })
  }

  _selectable = () => {
    let node = this.containerRef.current
    const { longPressThreshold, localizer } = this.props
    let selector = (this._selector = new Selection(() => node, {
      longPressThreshold: longPressThreshold,
    }))

    let maybeSelect = (box) => {
      let onSelecting = this.props.onSelecting
      let current = this.state || {}
      let state = selectionState(box)
      let { startDate: start, endDate: end } = state

      if (onSelecting) {
        if (
          (localizer.eq(current.startDate, start, 'minutes') &&
            localizer.eq(current.endDate, end, 'minutes')) ||
          onSelecting({ start, end, resourceId: this.props.resource }) === false
        )
          return
      }

      if (
        this.state.start !== state.start ||
        this.state.end !== state.end ||
        this.state.selecting !== state.selecting
      ) {
        this.setState(state)
      }
    }

    let selectionState = (point) => {
      let currentSlot = this.slotMetrics.closestSlotFromPoint(
        point,
        getBoundsForNode(node)
      )

      if (!this.state.selecting) {
        this._initialSlot = currentSlot
      }

      let initialSlot = this._initialSlot
      if (localizer.lte(initialSlot, currentSlot)) {
        currentSlot = this.slotMetrics.nextSlot(currentSlot)
      } else if (localizer.gt(initialSlot, currentSlot)) {
        initialSlot = this.slotMetrics.nextSlot(initialSlot)
      }

      const selectRange = this.slotMetrics.getRange(
        localizer.min(initialSlot, currentSlot),
        localizer.max(initialSlot, currentSlot)
      )

      return {
        ...selectRange,
        selecting: true,

        top: `${selectRange.top}%`,
        height: `${selectRange.height}%`,
      }
    }

    let selectorClicksHandler = (box, actionType) => {
      if (!isEvent(this.containerRef.current, box)) {
        const { startDate, endDate } = selectionState(box)
        this._selectSlot({
          startDate,
          endDate,
          action: actionType,
          box,
        })
      }
      this.setState({ selecting: false })
    }

    selector.on('selecting', maybeSelect)
    selector.on('selectStart', maybeSelect)

    selector.on('beforeSelect', (box) => {
      if (this.props.selectable !== 'ignoreEvents') return

      return !isEvent(this.containerRef.current, box)
    })

    selector.on('click', (box) => selectorClicksHandler(box, 'click'))

    selector.on('doubleClick', (box) =>
      selectorClicksHandler(box, 'doubleClick')
    )

    selector.on('select', (bounds) => {
      if (this.state.selecting) {
        this._selectSlot({ ...this.state, action: 'select', bounds })
        this.setState({ selecting: false })
      }
    })

    selector.on('reset', () => {
      if (this.state.selecting) {
        this.setState({ selecting: false })
      }
    })
  }

  _teardownSelectable = () => {
    if (!this._selector) return
    this._selector.teardown()
    this._selector = null
  }

  _selectSlot = ({ startDate, endDate, action, bounds, box }:{startDate:DateTime, endDate:DateTime}) => {
    let current = startDate,
      slots = []

    while (this.props.localizer.lte(current, endDate)) {
      slots.push(current)
      current = current.plus({millisecond:this.props.step * 60 * 1000 }) ;
    }

    notify(this.props.onSelectSlot, {
      slots,
      start: startDate,
      end: endDate,
      resourceId: this.props.resource,
      action,
      bounds,
      box,
    })
  }

  _select = (...args) => {
    notify(this.props.onSelectEvent, args)
  }

  _doubleClick = (...args) => {
    notify(this.props.onDoubleClickEvent, args)
  }

  _keyPress = (...args) => {
    notify(this.props.onKeyPressEvent, args)
  }
}

DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2,
}

export default DayColumn
