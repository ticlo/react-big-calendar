import React from 'react';
import clsx from 'clsx';
import { notify } from './utils/helpers';
import { navigate, views } from './utils/constants';
import { mergeWithDefaults } from './localizer';
import message from './utils/messages';
import moveDate from './utils/move';
import VIEWS from './Views';
import Toolbar from './Toolbar';
import NoopWrapper from './NoopWrapper';
import omit from 'lodash/omit';
import defaults from 'lodash/defaults';
import transform from 'lodash/transform';
import mapValues from 'lodash/mapValues';
import { wrapAccessor } from './utils/accessors';
function viewNames(_views) {
    if (Array.isArray(_views)) {
        return _views;
    }
    const views = [];
    for (const [key, value] of Object.entries(_views)) {
        if (value) {
            views.push(key);
        }
    }
    return views;
}
function isValidView(view, { views: _views }) {
    let names = viewNames(_views);
    return names.indexOf(view) !== -1;
}
export default class Calendar extends React.Component {
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
    };
    constructor(...args) {
        super(...args);
        this.state = {
            context: Calendar.getContext(this.props),
        };
    }
    static getDerivedStateFromProps(nextProps) {
        return { context: Calendar.getContext(nextProps) };
    }
    static getContext({ startAccessor, endAccessor, allDayAccessor, tooltipAccessor, titleAccessor, resourceAccessor, resourceIdAccessor, resourceTitleAccessor, eventPropGetter, backgroundEventPropGetter, slotPropGetter, slotGroupPropGetter, dayPropGetter, view, views, localizer, culture, messages = {}, components = {}, formats = {}, }) {
        let names = viewNames(views);
        const msgs = message(messages);
        return {
            viewNames: names,
            localizer: mergeWithDefaults(localizer, culture, formats, msgs),
            getters: {
                eventProp: (...args) => (eventPropGetter && eventPropGetter(...args)) || {},
                backgroundEventProp: (...args) => (backgroundEventPropGetter && backgroundEventPropGetter(...args)) ||
                    {},
                slotProp: (...args) => (slotPropGetter && slotPropGetter(...args)) || {},
                slotGroupProp: (...args) => (slotGroupPropGetter && slotGroupPropGetter(...args)) || {},
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
        };
    }
    getViews = () => {
        const views = this.props.views;
        if (Array.isArray(views)) {
            return transform(views, (obj, name) => (obj[name] = VIEWS[name]), {});
        }
        if (typeof views === 'object') {
            return mapValues(views, (value, key) => {
                if (value === true) {
                    return VIEWS[key];
                }
                return value;
            });
        }
        return VIEWS;
    };
    getView = () => {
        const views = this.getViews();
        return views[this.props.view];
    };
    getDrilldownView = (date) => {
        const { view, drilldownView, getDrilldownView } = this.props;
        if (!getDrilldownView)
            return drilldownView;
        return getDrilldownView(date, view, Object.keys(this.getViews()));
    };
    render() {
        let { view, toolbar, events, backgroundEvents, style, className, elementProps, date: current, getNow, length, showMultiDayTimes, onShowMore, doShowMoreDrillDown, components: _0, formats: _1, messages: _2, culture: _3, ...props } = this.props;
        current = current || getNow();
        let View = this.getView();
        const { accessors, components, getters, localizer, viewNames } = this.state.context;
        let CalToolbar = components.toolbar || Toolbar;
        const label = View.title(current, { localizer, length });
        return (React.createElement("div", { ...elementProps, className: clsx(className, 'rbc-calendar', props.rtl && 'rbc-rtl'), style: style },
            toolbar && (React.createElement(CalToolbar, { date: current, view: view, views: viewNames, label: label, onView: this.handleViewChange, onNavigate: this.handleNavigate, localizer: localizer })),
            React.createElement(View, { ...props, events: events, backgroundEvents: backgroundEvents, date: current, getNow: getNow, length: length, localizer: localizer, getters: getters, components: components, accessors: accessors, showMultiDayTimes: showMultiDayTimes, getDrilldownView: this.getDrilldownView, onNavigate: this.handleNavigate, onDrillDown: this.handleDrillDown, onSelectEvent: this.handleSelectEvent, onDoubleClickEvent: this.handleDoubleClickEvent, onKeyPressEvent: this.handleKeyPressEvent, onSelectSlot: this.handleSelectSlot, onShowMore: onShowMore, doShowMoreDrillDown: doShowMoreDrillDown })));
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
    handleRangeChange = (date, viewComponent, view) => {
        let { onRangeChange, localizer } = this.props;
        if (onRangeChange) {
            if (viewComponent.range) {
                onRangeChange(viewComponent.range(date, { localizer }), view);
            }
            else {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('onRangeChange prop not supported for this view');
                }
            }
        }
    };
    handleNavigate = (action, newDate) => {
        let { view, date, getNow, onNavigate, ...props } = this.props;
        let ViewComponent = this.getView();
        let today = getNow();
        date = moveDate(ViewComponent, {
            ...props,
            action,
            date: newDate || date || today,
            today,
        });
        onNavigate(date, view, action);
        this.handleRangeChange(date, ViewComponent);
    };
    handleViewChange = (view) => {
        if (view !== this.props.view && isValidView(view, this.props)) {
            this.props.onView(view);
        }
        let views = this.getViews();
        this.handleRangeChange(this.props.date || this.props.getNow(), views[view], view);
    };
    handleSelectEvent = (...args) => {
        notify(this.props.onSelectEvent, args);
    };
    handleDoubleClickEvent = (...args) => {
        notify(this.props.onDoubleClickEvent, args);
    };
    handleKeyPressEvent = (...args) => {
        notify(this.props.onKeyPressEvent, args);
    };
    handleSelectSlot = (slotInfo) => {
        notify(this.props.onSelectSlot, slotInfo);
    };
    handleDrillDown = (date, view) => {
        const { onDrillDown } = this.props;
        if (onDrillDown) {
            onDrillDown(date, view, this.drilldownView);
            return;
        }
        if (view)
            this.handleViewChange(view);
        this.handleNavigate(navigate.DATE, date);
    };
}
