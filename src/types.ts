import React from 'react';
import type { DateTime } from 'luxon';
import type { DateLocalizer } from './localizer'; // eslint-disable-line no-unused-vars

export type Culture = string | string[];

export type DateRange = {
  start: DateTime;
  end: DateTime;
};

export type DateFormatFunction = (
  date: DateTime,
  culture?: Culture,
  localizer?: DateLocalizer
) => string;
export type DateRangeFormatFunction = (
  range: DateRange,
  culture?: Culture,
  localizer?: DateLocalizer
) => string;
export type DateFormat = string | DateFormatFunction;
// Alias for backward compatibility if needed, but DateFormat is preferred
export type Format = DateFormat;

export type DayPropGetter = (
  date: DateTime,
  resourceId?: number | string
) => React.HTMLAttributes<HTMLDivElement>;
export type EventPropGetter<T> = (
  event: T,
  start: DateTime,
  end: DateTime,
  isSelected: boolean
) => { className?: string | undefined; style?: React.CSSProperties };
export type SlotPropGetter = (
  date: DateTime,
  resourceId?: number | string
) => React.HTMLAttributes<HTMLDivElement>;
export type SlotGroupPropGetter = () => React.HTMLAttributes<HTMLDivElement>;

export interface CalendarEvent {
  title?: React.ReactNode;
  allDay?: boolean;
  start?: DateTime;
  end?: DateTime;
  resourceId?: number | string;
  [key: string]: unknown;
}

export interface Accessors {
  title: (event: CalendarEvent) => React.ReactNode;
  allDay: (event: CalendarEvent) => boolean;
  start: (event: CalendarEvent) => DateTime;
  end: (event: CalendarEvent) => DateTime;
  resource: (event: CalendarEvent) => number | string | undefined;
  resourceId: (resource: object) => number | string;
  resourceTitle: (resource: object) => React.ReactNode;
  tooltip: (event: CalendarEvent) => string;
}

export interface Getters {
  eventProp: (
    event: CalendarEvent,
    start: DateTime,
    end: DateTime,
    isSelected: boolean
  ) => { className?: string; style?: React.CSSProperties };
  backgroundEventProp: (
    event: CalendarEvent,
    start: DateTime,
    end: DateTime,
    isSelected: boolean
  ) => { className?: string; style?: React.CSSProperties };
  slotProp: (
    date: DateTime,
    resourceId?: number | string
  ) => React.HTMLAttributes<HTMLDivElement>;
  slotGroupProp: () => React.HTMLAttributes<HTMLDivElement>;
  dayProp: (
    date: DateTime,
    resourceId?: number | string
  ) => React.HTMLAttributes<HTMLDivElement>;
}

export interface Messages {
  date?: string;
  time?: string;
  event?: string;
  allDay?: string;
  week?: string;
  work_week?: string;
  day?: string;
  month?: string;
  previous?: string;
  next?: string;
  yesterday?: string;
  tomorrow?: string;
  today?: string;
  agenda?: string;
  noEventsInRange?: string;
  showMore?: (count: number) => string;
  [key: string]: string | ((count: number) => string) | undefined;
}

export interface Components<
  TEvent extends object = CalendarEvent,
  TResource extends object = object
> {
  event?: React.ComponentType<EventProps<TEvent>>;
  eventWrapper?: React.ComponentType<EventWrapperProps<TEvent>>;
  eventContainerWrapper?: React.ComponentType;
  dateCellWrapper?: React.ComponentType<DateCellWrapperProps>;
  timeSlotWrapper?: React.ComponentType;
  timeGutterHeader?: React.ComponentType;
  timeGutterWrapper?: React.ComponentType;
  toolbar?: React.ComponentType<ToolbarProps>;
  agenda?: {
    date?: React.ComponentType;
    time?: React.ComponentType;
    event?: React.ComponentType;
  };
  day?: {
    header?: React.ComponentType<HeaderProps>;
    event?: React.ComponentType<EventProps<TEvent>>;
  };
  week?: {
    header?: React.ComponentType<HeaderProps>;
    event?: React.ComponentType<EventProps<TEvent>>;
  };
  work_week?: {
    header?: React.ComponentType<HeaderProps>;
    event?: React.ComponentType<EventProps<TEvent>>;
  };
  month?: {
    header?: React.ComponentType<HeaderProps>;
    dateHeader?: React.ComponentType<DateHeaderProps>;
    event?: React.ComponentType<EventProps<TEvent>>;
  };
  /**
   * component used as a header for each column in the TimeGridHeader
   */
  header?: React.ComponentType<HeaderProps>;
  resourceHeader?: React.ComponentType<ResourceHeaderProps<TResource>>;
}

export interface HeaderProps {
  date: DateTime;
  label: string;
  localizer: DateLocalizer;
}

export interface DateHeaderProps {
  date: DateTime;
  drilldownView: string;
  isOffRange: boolean;
  label: string;
  onDrillDown: () => void;
}

export interface ResourceHeaderProps<TResource extends object = object> {
  label: React.ReactNode;
  index: number;
  resource: TResource;
}

export interface DateCellWrapperProps {
  range: DateTime[];
  value: DateTime;
  children: React.JSX.Element;
}

export interface EventProps<TEvent extends object = CalendarEvent> {
  event: TEvent;
  title: string;
  continuesPrior: boolean;
  continuesAfter: boolean;
  isAllDay?: boolean;
  localizer: DateLocalizer;
  slotStart: DateTime;
  slotEnd: DateTime;
}

export interface EventWrapperProps<TEvent extends object = CalendarEvent> {
  style?: (React.CSSProperties & { xOffset: number }) | undefined;
  className: string;
  event: TEvent;
  isRtl: boolean;
  getters: {
    eventProp?: EventPropGetter<TEvent> | undefined;
    slotProp?: SlotPropGetter | undefined;
    dayProp?: DayPropGetter | undefined;
  };
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onDoubleClick: (e: React.MouseEvent<HTMLElement>) => void;
  accessors: {
    title?: ((event: TEvent) => string) | undefined;
    tooltip?: ((event: TEvent) => string) | undefined;
    end?: ((event: TEvent) => DateTime) | undefined;
    start?: ((event: TEvent) => DateTime) | undefined;
  };
  selected: boolean;
  label: string;
  continuesEarlier: boolean;
  continuesLater: boolean;
}

export interface ToolbarProps {
  date: DateTime;
  view: View;
  views: View[];
  label: React.ReactNode;
  localizer: DateLocalizer;
  onNavigate: (navigate: NavigateAction, date?: DateTime) => void;
  onView: (view: View) => void;
  children?: React.ReactNode;
}

export type ViewNames = string[] | { [view: string]: any };

export type DayLayoutAlgorithm =
  | 'overlap'
  | 'no-overlap'
  | ((...args: any[]) => any);

export interface SlotInfo {
  start: DateTime;
  end: DateTime;
  slots: DateTime[];
  action: 'select' | 'click' | 'doubleClick';
  /** For "TimeGrid" views */
  resourceId?: number | string | undefined;
  /** For "select" action */
  bounds?:
    | {
        x: number;
        y: number;
        top: number;
        bottom: number;
        left: number;
        right: number;
      }
    | undefined;
  /** For "click" or "doubleClick" actions */
  box?:
    | {
        x: number;
        y: number;
        clientX: number;
        clientY: number;
      }
    | undefined;
}

export type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

export type NavigateAction = 'PREV' | 'NEXT' | 'TODAY' | 'DATE';

export interface Formats {
  /**
   * Format for the day of the month heading in the Month view.
   * e.g. "01", "02", "03", etc
   */
  dateFormat?: DateFormat;

  /**
   * A day of the week format for Week and Day headings,
   * e.g. "Wed 01/04"
   */
  dayFormat?: DateFormat;

  /**
   * Week day name format for the Month week day headings,
   * e.g: "Sun", "Mon", "Tue", etc
   */
  weekdayFormat?: DateFormat;

  /**
   * The timestamp cell formats in Week and Time views, e.g. "4:00 AM"
   */
  timeGutterFormat?: DateFormat;

  /**
   * Toolbar header format for the Month view, e.g "2015 April"
   */
  monthHeaderFormat?: DateFormat;

  /**
   * Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"
   */
  dayRangeHeaderFormat?: DateRangeFormatFunction;

  /**
   * Toolbar header format for the Day view, e.g. "Wednesday Apr 01"
   */
  dayHeaderFormat?: DateFormat;

  /**
   * A time range format for selecting time slots, e.g "8:00am — 2:00pm"
   */
  selectRangeFormat?: DateRangeFormatFunction;

  /**
   * Time range displayed on events.
   */
  eventTimeRangeFormat?: DateRangeFormatFunction;

  /**
   * An optional event time range for events that continue onto another day
   */
  eventTimeRangeStartFormat?: DateRangeFormatFunction;

  /**
   * An optional event time range for events that continue from another day
   */
  eventTimeRangeEndFormat?: DateRangeFormatFunction;
}

export interface TitleOptions {
  formats: DateFormat[];
  culture?: Culture;
  localizer?: DateLocalizer;
}

export interface ViewStatic {
  navigate(
    date: DateTime,
    action: NavigateAction,
    props: { localizer: DateLocalizer }
  ): DateTime;
  title(date: DateTime, options: TitleOptions): string;
}

export type ViewsProps =
  | View[]
  | {
      work_week?: boolean | (React.ComponentType<any> & ViewStatic);
      day?: boolean | (React.ComponentType<any> & ViewStatic);
      month?: boolean | (React.ComponentType<any> & ViewStatic);
      week?: boolean | (React.ComponentType<any> & ViewStatic);
      agenda?: boolean | (React.ComponentType<any> & ViewStatic);
    };
