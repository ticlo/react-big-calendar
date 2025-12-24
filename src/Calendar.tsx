import React from 'react'
import clsx from 'clsx'
import {
  accessor,
  dateFormat,
  dateRangeFormat,
  DayLayoutAlgorithmPropType,
  views as componentViews,
} from './utils/propTypes'

import { notify } from './utils/helpers'
import { navigate, views } from './utils/constants'
import { mergeWithDefaults } from './localizer'
import message from './utils/messages'
import moveDate from './utils/move'
import VIEWS from './Views'
import Toolbar from './Toolbar'
import NoopWrapper from './NoopWrapper'
import {
  CalendarEvent,
  Components,
  Messages,
  Getters,
  Accessors,
  ViewNames,
  DayLayoutAlgorithm,
  Culture,
} from './types'
import { DateLocalizer } from './localizer'

import omit from 'lodash/omit'
import defaults from 'lodash/defaults'
import transform from 'lodash/transform'
import mapValues from 'lodash/mapValues'
import { wrapAccessor } from './utils/accessors'

function viewNames(_views) {
  if (Array.isArray(_views)) {
    return _views
  }
  const views = []
  for (const [key, value] of Object.entries(_views)) {
    if (value) {
      views.push(key)
    }
  }
  return views
}

function isValidView(view, { views: _views }) {
  let names = viewNames(_views)
  return names.indexOf(view) !== -1
}

interface CalendarProps<TEvent extends CalendarEvent = CalendarEvent, TResource extends object = object> {
  localizer: DateLocalizer;
  elementProps?: React.HTMLAttributes<HTMLDivElement>;
  date?: any;
  view?: string;
  defaultView?: string;
  events?: TEvent[];
  backgroundEvents?: TEvent[];
  titleAccessor?: keyof TEvent | ((event: TEvent) => React.ReactNode);
  tooltipAccessor?: keyof TEvent | ((event: TEvent) => string) | null;
  allDayAccessor?: keyof TEvent | ((event: TEvent) => boolean);
  startAccessor?: keyof TEvent | ((event: TEvent) => any);
  endAccessor?: keyof TEvent | ((event: TEvent) => any);
  resourceAccessor?: keyof TEvent | ((event: TEvent) => any);
  resources?: TResource[];
  resourceIdAccessor?: keyof TResource | ((resource: TResource) => any);
  resourceTitleAccessor?: keyof TResource | ((resource: TResource) => React.ReactNode);
  getNow?: () => any;
  onNavigate?: (newDate: any, view: string, action: string) => void;
  onView?: (view: string) => void;
  onDrillDown?: (date: any, view: string, drilldownView?: string | null) => void;
  onRangeChange?: (range: any[] | { start: any; end: any }, view?: string) => void;
  onSelectSlot?: (slotInfo: any) => void;
  onSelectEvent?: (event: TEvent, e: React.SyntheticEvent) => void;
  onDoubleClickEvent?: (event: TEvent, e: React.SyntheticEvent) => void;
  onKeyPressEvent?: (event: TEvent, e: React.SyntheticEvent) => void;
  onSelecting?: (range: { start: any, end: any, resourceId?: any }) => boolean | undefined | null;
  onShowMore?: (events: TEvent[], date: any) => void;
  showAllEvents?: boolean;
  selected?: any;
  views?: ViewNames;
  doShowMoreDrillDown?: boolean;
  drilldownView?: string | null;
  getDrilldownView?: (targetDate: any, currentViewName: string, configuredViewNames: string[]) => string | null;
  length?: number;
  toolbar?: boolean;
  popup?: boolean;
  popupOffset?: number | { x?: number; y?: number; };
  selectable?: true | false | "ignoreEvents";
  longPressThreshold?: number;
  step?: number;
  timeslots?: number;
  rtl?: boolean;
  eventPropGetter?: (event: TEvent, start: any, end: any, isSelected: boolean) => { className?: string; style?: React.CSSProperties };
  backgroundEventPropGetter?: (event: TEvent, start: any, end: any, isSelected: boolean) => { className?: string; style?: React.CSSProperties };
  slotPropGetter?: (date: any, resourceId?: any) => { className?: string; style?: React.CSSProperties };
  slotGroupPropGetter?: () => { style?: React.CSSProperties };
  dayPropGetter?: (date: any, resourceId?: any) => { className?: string; style?: React.CSSProperties };
  showMultiDayTimes?: boolean;
  allDayMaxRows?: number;
  min?: any;
  max?: any;
  scrollToTime?: any;
  enableAutoScroll?: boolean;
  culture?: Culture;
  formats?: any;
  components?: Components;
  messages?: Messages;
  dayLayoutAlgorithm?: DayLayoutAlgorithm;
  timezone?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CalendarState {
  context: {
    viewNames: string[];
    localizer: DateLocalizer;
    getters: Getters;
    components: Components;
    accessors: Accessors;
  };
}

export default class Calendar<
  TEvent extends CalendarEvent = CalendarEvent,
  TResource extends object = object
> extends React.Component<CalendarProps<TEvent, TResource>, CalendarState> {
  static defaultProps = {
    events: [],
    backgroundEvents: [],
    elementProps: {},
    popup: false,
    toolbar: true,
    view: views.MONTH,
    views: [views.MONTH, views.WEEK, views.DAY],
    step: 30,
    length: 30,
    allDayMaxRows: Infinity,

    doShowMoreDrillDown: true,
    drilldownView: views.DAY,

    titleAccessor: 'title',
    tooltipAccessor: 'title',
    allDayAccessor: 'allDay',
    startAccessor: 'start',
    endAccessor: 'end',
    resourceAccessor: 'resourceId',

    resourceIdAccessor: 'id',
    resourceTitleAccessor: 'title',

    longPressThreshold: 250,
    getNow: () => new Date(),
    dayLayoutAlgorithm: 'overlap',
  }

  constructor(props: CalendarProps<TEvent, TResource>) {
    super(props)

    this.state = {
      context: Calendar.getContext(this.props),
    }
  }
  static getDerivedStateFromProps(nextProps: CalendarProps) {
    return { context: Calendar.getContext(nextProps) }
  }

  static getContext({
    startAccessor = 'start',
    endAccessor = 'end',
    allDayAccessor = 'allDay',
    tooltipAccessor = 'title',
    titleAccessor = 'title',
    resourceAccessor = 'resourceId',
    resourceIdAccessor = 'id',
    resourceTitleAccessor = 'title',
    eventPropGetter,
    backgroundEventPropGetter,
    slotPropGetter,
    slotGroupPropGetter,
    dayPropGetter,
    view,
    views,
    localizer,
    culture,
    messages = {},
    components = {},
    formats = {},
    timezone,
  }: any) {
    let names = viewNames(views)
    const msgs = message(messages)
    return {
      viewNames: names,
      localizer: mergeWithDefaults(localizer, culture, formats, msgs, timezone),
      getters: {
        eventProp: (...args) =>
          (eventPropGetter && eventPropGetter(...args)) || {},
        backgroundEventProp: (...args) =>
          (backgroundEventPropGetter && backgroundEventPropGetter(...args)) ||
          {},
        slotProp: (...args) =>
          (slotPropGetter && slotPropGetter(...args)) || {},
        slotGroupProp: (...args) =>
          (slotGroupPropGetter && slotGroupPropGetter(...args)) || {},
        dayProp: (...args) => (dayPropGetter && dayPropGetter(...args)) || {},
      },
      components: defaults(components[view] || {}, omit(components, names), {
        eventWrapper: NoopWrapper,
        backgroundEventWrapper: NoopWrapper,
        eventContainerWrapper: NoopWrapper,
        dateCellWrapper: NoopWrapper,
        weekWrapper: NoopWrapper,
        timeSlotWrapper: NoopWrapper,
        timeGutterWrapper: NoopWrapper,
      }),
      accessors: {
        start: wrapAccessor(startAccessor),
        end: wrapAccessor(endAccessor),
        allDay: wrapAccessor(allDayAccessor),
        tooltip: wrapAccessor(tooltipAccessor),
        title: wrapAccessor(titleAccessor),
        resource: wrapAccessor(resourceAccessor),
        resourceId: wrapAccessor(resourceIdAccessor),
        resourceTitle: wrapAccessor(resourceTitleAccessor),
      },
    }
  }

  getViews = () => {
    const views = this.props.views

    if (Array.isArray(views)) {
      return transform(views, (obj, name) => (obj[name] = VIEWS[name]), {})
    }

    if (typeof views === 'object') {
      return mapValues(views, (value, key) => {
        if (value === true) {
          return VIEWS[key]
        }

        return value
      })
    }

    return VIEWS
  }

  getView = () => {
    const views = this.getViews()

    return views[this.props.view]
  }

  getDrilldownView = (date) => {
    const { view, drilldownView, getDrilldownView } = this.props

    if (!getDrilldownView) return drilldownView as any

    return getDrilldownView(date, view as any, Object.keys(this.getViews()))
  }

  render() {
    let {
      view,
      toolbar,
      events,
      backgroundEvents,
      style,
      className,
      elementProps,
      date: current,
      getNow,
      length,
      showMultiDayTimes,
      onShowMore,
      doShowMoreDrillDown,
      components: _0,
      formats: _1,
      messages: _2,
      culture: _3,
      ...props
    } = this.props

    const { accessors, components, getters, localizer, viewNames } =
      this.state.context as any

    const getNowWithZone = () => {
      const now = getNow()
      return localizer.timezone ? localizer.add(now, 0, 'minutes') : now
    }

    current = current || getNowWithZone()

    let View = this.getView()

    let CalToolbar = components.toolbar || Toolbar
    const label = View.title(current, { localizer, length })

    return (
      <div
        {...elementProps}
        className={clsx(className, 'rbc-calendar', props.rtl && 'rbc-rtl')}
        style={style}
      >
        {toolbar && (
          <CalToolbar
            date={current}
            view={view}
            views={viewNames}
            label={label}
            onView={this.handleViewChange}
            onNavigate={this.handleNavigate}
            localizer={localizer}
          />
        )}
        <View
          {...props}
          events={events}
          backgroundEvents={backgroundEvents}
          date={current}
          getNow={getNowWithZone}
          length={length}
          localizer={localizer}
          getters={getters}
          components={components}
          accessors={accessors}
          showMultiDayTimes={showMultiDayTimes}
          getDrilldownView={this.getDrilldownView}
          onNavigate={this.handleNavigate}
          onDrillDown={this.handleDrillDown}
          onSelectEvent={this.handleSelectEvent}
          onDoubleClickEvent={this.handleDoubleClickEvent}
          onKeyPressEvent={this.handleKeyPressEvent}
          onSelectSlot={this.handleSelectSlot}
          onShowMore={onShowMore}
          doShowMoreDrillDown={doShowMoreDrillDown}
        />
      </div>
    )
  }

  /**
   *
   * @param date
   * @param viewComponent
   * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
   * parameter. It appears when range change on view changing. It could be handy
   * when you need to have both: range and view type at once, i.e. for manage rbc
   * state via url
   */
  handleRangeChange = (date: any, viewComponent: any, view?: string) => {
    let { onRangeChange, localizer } = this.props

    if (onRangeChange) {
      if (viewComponent.range) {
        onRangeChange(viewComponent.range(date, { localizer }), view)
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.error('onRangeChange prop not supported for this view')
        }
      }
    }
  }

  handleNavigate = (action: string, newDate?: any) => {
    let { view, date, getNow, onNavigate, ...props } = this.props
    let ViewComponent = this.getView()
    let today = getNow()

    date = moveDate(ViewComponent, {
      ...props,
      action,
      date: newDate || date || today,
      today,
    })

    onNavigate(date, view, action)
    this.handleRangeChange(date, ViewComponent)
  }

  handleViewChange = (view: string) => {
    if (view !== this.props.view && isValidView(view, this.props as any)) {
      this.props.onView(view)
    }

    let views = this.getViews()
    this.handleRangeChange(
      this.props.date || this.props.getNow(),
      views[view],
      view
    )
  }

  handleSelectEvent = (event: TEvent, e: React.SyntheticEvent) => {
    notify(this.props.onSelectEvent as any, [event, e])
  }

  handleDoubleClickEvent = (event: TEvent, e: React.SyntheticEvent) => {
    notify(this.props.onDoubleClickEvent as any, [event, e])
  }

  handleKeyPressEvent = (event: TEvent, e: React.SyntheticEvent) => {
    notify(this.props.onKeyPressEvent as any, [event, e])
  }

  handleSelectSlot = (slotInfo) => {
    notify(this.props.onSelectSlot, slotInfo)
  }

  handleDrillDown = (date: any, view: string) => {
    const { onDrillDown } = this.props
    if (onDrillDown) {
      onDrillDown(date, view, this.props.drilldownView as any)
      return
    }
    if (view) this.handleViewChange(view)

    this.handleNavigate(navigate.DATE, date)
  }
}