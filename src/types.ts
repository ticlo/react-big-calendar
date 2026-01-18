import React from 'react';
import type { DateLocalizer } from './localizer'; // eslint-disable-line no-unused-vars

export type Culture = string | string[];

export type Format =
  | string
  | ((date: any, culture?: Culture, localizer?: DateLocalizer) => string);

export interface CalendarEvent {
  title?: React.ReactNode;
  allDay?: boolean;
  start?: any;
  end?: any;
  resourceId?: any;
  [key: string]: any;
}

export interface Accessors {
  title: (event: CalendarEvent) => React.ReactNode;
  allDay: (event: CalendarEvent) => boolean;
  start: (event: CalendarEvent) => any;
  end: (event: CalendarEvent) => any;
  resource: (event: CalendarEvent) => any;
  resourceId: (resource: any) => any;
  resourceTitle: (resource: any) => React.ReactNode;
  tooltip: (event: CalendarEvent) => string;
}

export interface Getters {
  eventProp: (
    event: CalendarEvent,
    start: any,
    end: any,
    isSelected: boolean
  ) => any;
  backgroundEventProp: (
    event: CalendarEvent,
    start: any,
    end: any,
    isSelected: boolean
  ) => any;
  slotProp: (date: any, resourceId?: any) => any;
  slotGroupProp: () => any;
  dayProp: (date: any, resourceId?: any) => any;
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
  [key: string]: any;
}

export interface Components {
  event?: React.ComponentType<any>;
  eventWrapper?: React.ComponentType<any>;
  backgroundEvent?: React.ComponentType<any>;
  backgroundEventWrapper?: React.ComponentType<any>;
  eventContainerWrapper?: React.ComponentType<any>;
  dateCellWrapper?: React.ComponentType<any>;
  weekWrapper?: React.ComponentType<any>;
  timeSlotWrapper?: React.ComponentType<any>;
  timeGutterWrapper?: React.ComponentType<any>;
  timeGutterHeader?: React.ComponentType<any>;
  resourceHeader?: React.ComponentType<any>;
  toolbar?: React.ComponentType<any>;
  agenda?: {
    date?: React.ComponentType<any>;
    time?: React.ComponentType<any>;
    event?: React.ComponentType<any>;
  };
  day?: {
    header?: React.ComponentType<any>;
    event?: React.ComponentType<any>;
  };
  week?: {
    header?: React.ComponentType<any>;
    event?: React.ComponentType<any>;
  };
  month?: {
    header?: React.ComponentType<any>;
    dateHeader?: React.ComponentType<any>;
    event?: React.ComponentType<any>;
  };
  [key: string]: any;
}

export type ViewNames = string[] | { [view: string]: any };

export type DayLayoutAlgorithm =
  | 'overlap'
  | 'no-overlap'
  | ((...args: any[]) => any);

export interface SlotInfo {
  start: Date;
  end: Date;
  slots: Date[];
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

export type View = 'month' | 'week' | 'work_week' | 'day';
