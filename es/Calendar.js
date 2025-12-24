"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));
var _callSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/callSuper"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _helpers = require("./utils/helpers");
var _constants = require("./utils/constants");
var _localizer = require("./localizer");
var _messages = _interopRequireDefault(require("./utils/messages"));
var _move = _interopRequireDefault(require("./utils/move"));
var _Views = _interopRequireDefault(require("./Views"));
var _Toolbar = _interopRequireDefault(require("./Toolbar"));
var _NoopWrapper = _interopRequireDefault(require("./NoopWrapper"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _defaults = _interopRequireDefault(require("lodash/defaults"));
var _transform = _interopRequireDefault(require("lodash/transform"));
var _mapValues = _interopRequireDefault(require("lodash/mapValues"));
var _accessors = require("./utils/accessors");
var _excluded = ["view", "date", "getNow", "onNavigate"],
  _excluded2 = ["view", "toolbar", "events", "backgroundEvents", "style", "className", "elementProps", "date", "getNow", "length", "showMultiDayTimes", "onShowMore", "doShowMoreDrillDown", "components", "formats", "messages", "culture"];
function viewNames(_views) {
  if (Array.isArray(_views)) {
    return _views;
  }
  var views = [];
  for (var _i = 0, _Object$entries = Object.entries(_views); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (value) {
      views.push(key);
    }
  }
  return views;
}
function isValidView(view, _ref) {
  var _views = _ref.views;
  var names = viewNames(_views);
  return names.indexOf(view) !== -1;
}
var Calendar = exports.default = /*#__PURE__*/function (_React$Component) {
  function Calendar(_props) {
    var _this;
    (0, _classCallCheck2.default)(this, Calendar);
    _this = (0, _callSuper2.default)(this, Calendar, [_props]);
    _this.getViews = function () {
      var views = _this.props.views;
      if (Array.isArray(views)) {
        return (0, _transform.default)(views, function (obj, name) {
          return obj[name] = _Views.default[name];
        }, {});
      }
      if (typeof views === 'object') {
        return (0, _mapValues.default)(views, function (value, key) {
          if (value === true) {
            return _Views.default[key];
          }
          return value;
        });
      }
      return _Views.default;
    };
    _this.getView = function () {
      var views = _this.getViews();
      return views[_this.props.view];
    };
    _this.getDrilldownView = function (date) {
      var _this$props = _this.props,
        view = _this$props.view,
        drilldownView = _this$props.drilldownView,
        getDrilldownView = _this$props.getDrilldownView;
      if (!getDrilldownView) return drilldownView;
      return getDrilldownView(date, view, Object.keys(_this.getViews()));
    };
    /**
     *
     * @param date
     * @param viewComponent
     * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
     * parameter. It appears when range change on view changing. It could be handy
     * when you need to have both: range and view type at once, i.e. for manage rbc
     * state via url
     */
    _this.handleRangeChange = function (date, viewComponent, view) {
      var _this$props2 = _this.props,
        onRangeChange = _this$props2.onRangeChange,
        localizer = _this$props2.localizer;
      if (onRangeChange) {
        if (viewComponent.range) {
          onRangeChange(viewComponent.range(date, {
            localizer: localizer
          }), view);
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.error('onRangeChange prop not supported for this view');
          }
        }
      }
    };
    _this.handleNavigate = function (action, newDate) {
      var _this$props3 = _this.props,
        view = _this$props3.view,
        date = _this$props3.date,
        getNow = _this$props3.getNow,
        onNavigate = _this$props3.onNavigate,
        props = (0, _objectWithoutProperties2.default)(_this$props3, _excluded);
      var ViewComponent = _this.getView();
      var today = getNow();
      date = (0, _move.default)(ViewComponent, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
        action: action,
        date: newDate || date || today,
        today: today
      }));
      onNavigate(date, view, action);
      _this.handleRangeChange(date, ViewComponent);
    };
    _this.handleViewChange = function (view) {
      if (view !== _this.props.view && isValidView(view, _this.props)) {
        _this.props.onView(view);
      }
      var views = _this.getViews();
      _this.handleRangeChange(_this.props.date || _this.props.getNow(), views[view], view);
    };
    _this.handleSelectEvent = function (event, e) {
      (0, _helpers.notify)(_this.props.onSelectEvent, [event, e]);
    };
    _this.handleDoubleClickEvent = function (event, e) {
      (0, _helpers.notify)(_this.props.onDoubleClickEvent, [event, e]);
    };
    _this.handleKeyPressEvent = function (event, e) {
      (0, _helpers.notify)(_this.props.onKeyPressEvent, [event, e]);
    };
    _this.handleSelectSlot = function (slotInfo) {
      (0, _helpers.notify)(_this.props.onSelectSlot, slotInfo);
    };
    _this.handleDrillDown = function (date, view) {
      var onDrillDown = _this.props.onDrillDown;
      if (onDrillDown) {
        onDrillDown(date, view, _this.props.drilldownView);
        return;
      }
      if (view) _this.handleViewChange(view);
      _this.handleNavigate(_constants.navigate.DATE, date);
    };
    _this.state = {
      context: Calendar.getContext(_this.props)
    };
    return _this;
  }
  (0, _inherits2.default)(Calendar, _React$Component);
  return (0, _createClass2.default)(Calendar, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        view = _this$props4.view,
        toolbar = _this$props4.toolbar,
        events = _this$props4.events,
        backgroundEvents = _this$props4.backgroundEvents,
        style = _this$props4.style,
        className = _this$props4.className,
        elementProps = _this$props4.elementProps,
        current = _this$props4.date,
        getNow = _this$props4.getNow,
        length = _this$props4.length,
        showMultiDayTimes = _this$props4.showMultiDayTimes,
        onShowMore = _this$props4.onShowMore,
        doShowMoreDrillDown = _this$props4.doShowMoreDrillDown,
        _0 = _this$props4.components,
        _1 = _this$props4.formats,
        _2 = _this$props4.messages,
        _3 = _this$props4.culture,
        props = (0, _objectWithoutProperties2.default)(_this$props4, _excluded2);
      var _ref2 = this.state.context,
        accessors = _ref2.accessors,
        components = _ref2.components,
        getters = _ref2.getters,
        localizer = _ref2.localizer,
        viewNames = _ref2.viewNames;
      var getNowWithZone = function getNowWithZone() {
        var now = getNow();
        return localizer.timezone ? localizer.add(now, 0, 'minutes') : now;
      };
      current = current || getNowWithZone();
      var View = this.getView();
      var CalToolbar = components.toolbar || _Toolbar.default;
      var label = View.title(current, {
        localizer: localizer,
        length: length
      });
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, elementProps, {
        className: (0, _clsx.default)(className, 'rbc-calendar', props.rtl && 'rbc-rtl'),
        style: style
      }), toolbar && /*#__PURE__*/_react.default.createElement(CalToolbar, {
        date: current,
        view: view,
        views: viewNames,
        label: label,
        onView: this.handleViewChange,
        onNavigate: this.handleNavigate,
        localizer: localizer
      }), /*#__PURE__*/_react.default.createElement(View, Object.assign({}, props, {
        events: events,
        backgroundEvents: backgroundEvents,
        date: current,
        getNow: getNowWithZone,
        length: length,
        localizer: localizer,
        getters: getters,
        components: components,
        accessors: accessors,
        showMultiDayTimes: showMultiDayTimes,
        getDrilldownView: this.getDrilldownView,
        onNavigate: this.handleNavigate,
        onDrillDown: this.handleDrillDown,
        onSelectEvent: this.handleSelectEvent,
        onDoubleClickEvent: this.handleDoubleClickEvent,
        onKeyPressEvent: this.handleKeyPressEvent,
        onSelectSlot: this.handleSelectSlot,
        onShowMore: onShowMore,
        doShowMoreDrillDown: doShowMoreDrillDown
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      return {
        context: Calendar.getContext(nextProps)
      };
    }
  }, {
    key: "getContext",
    value: function getContext(_ref3) {
      var _ref3$startAccessor = _ref3.startAccessor,
        startAccessor = _ref3$startAccessor === void 0 ? 'start' : _ref3$startAccessor,
        _ref3$endAccessor = _ref3.endAccessor,
        endAccessor = _ref3$endAccessor === void 0 ? 'end' : _ref3$endAccessor,
        _ref3$allDayAccessor = _ref3.allDayAccessor,
        allDayAccessor = _ref3$allDayAccessor === void 0 ? 'allDay' : _ref3$allDayAccessor,
        _ref3$tooltipAccessor = _ref3.tooltipAccessor,
        tooltipAccessor = _ref3$tooltipAccessor === void 0 ? 'title' : _ref3$tooltipAccessor,
        _ref3$titleAccessor = _ref3.titleAccessor,
        titleAccessor = _ref3$titleAccessor === void 0 ? 'title' : _ref3$titleAccessor,
        _ref3$resourceAccesso = _ref3.resourceAccessor,
        resourceAccessor = _ref3$resourceAccesso === void 0 ? 'resourceId' : _ref3$resourceAccesso,
        _ref3$resourceIdAcces = _ref3.resourceIdAccessor,
        resourceIdAccessor = _ref3$resourceIdAcces === void 0 ? 'id' : _ref3$resourceIdAcces,
        _ref3$resourceTitleAc = _ref3.resourceTitleAccessor,
        resourceTitleAccessor = _ref3$resourceTitleAc === void 0 ? 'title' : _ref3$resourceTitleAc,
        eventPropGetter = _ref3.eventPropGetter,
        backgroundEventPropGetter = _ref3.backgroundEventPropGetter,
        slotPropGetter = _ref3.slotPropGetter,
        slotGroupPropGetter = _ref3.slotGroupPropGetter,
        dayPropGetter = _ref3.dayPropGetter,
        view = _ref3.view,
        views = _ref3.views,
        localizer = _ref3.localizer,
        culture = _ref3.culture,
        _ref3$messages = _ref3.messages,
        messages = _ref3$messages === void 0 ? {} : _ref3$messages,
        _ref3$components = _ref3.components,
        components = _ref3$components === void 0 ? {} : _ref3$components,
        _ref3$formats = _ref3.formats,
        formats = _ref3$formats === void 0 ? {} : _ref3$formats,
        timezone = _ref3.timezone;
      var names = viewNames(views);
      var msgs = (0, _messages.default)(messages);
      return {
        viewNames: names,
        localizer: (0, _localizer.mergeWithDefaults)(localizer, culture, formats, msgs, timezone),
        getters: {
          eventProp: function eventProp() {
            return eventPropGetter && eventPropGetter.apply(void 0, arguments) || {};
          },
          backgroundEventProp: function backgroundEventProp() {
            return backgroundEventPropGetter && backgroundEventPropGetter.apply(void 0, arguments) || {};
          },
          slotProp: function slotProp() {
            return slotPropGetter && slotPropGetter.apply(void 0, arguments) || {};
          },
          slotGroupProp: function slotGroupProp() {
            return slotGroupPropGetter && slotGroupPropGetter.apply(void 0, arguments) || {};
          },
          dayProp: function dayProp() {
            return dayPropGetter && dayPropGetter.apply(void 0, arguments) || {};
          }
        },
        components: (0, _defaults.default)(components[view] || {}, (0, _omit.default)(components, names), {
          eventWrapper: _NoopWrapper.default,
          backgroundEventWrapper: _NoopWrapper.default,
          eventContainerWrapper: _NoopWrapper.default,
          dateCellWrapper: _NoopWrapper.default,
          weekWrapper: _NoopWrapper.default,
          timeSlotWrapper: _NoopWrapper.default,
          timeGutterWrapper: _NoopWrapper.default
        }),
        accessors: {
          start: (0, _accessors.wrapAccessor)(startAccessor),
          end: (0, _accessors.wrapAccessor)(endAccessor),
          allDay: (0, _accessors.wrapAccessor)(allDayAccessor),
          tooltip: (0, _accessors.wrapAccessor)(tooltipAccessor),
          title: (0, _accessors.wrapAccessor)(titleAccessor),
          resource: (0, _accessors.wrapAccessor)(resourceAccessor),
          resourceId: (0, _accessors.wrapAccessor)(resourceIdAccessor),
          resourceTitle: (0, _accessors.wrapAccessor)(resourceTitleAccessor)
        }
      };
    }
  }]);
}(_react.default.Component);
Calendar.defaultProps = {
  events: [],
  backgroundEvents: [],
  elementProps: {},
  popup: false,
  toolbar: true,
  view: _constants.views.MONTH,
  views: [_constants.views.MONTH, _constants.views.WEEK, _constants.views.DAY],
  step: 30,
  length: 30,
  allDayMaxRows: Infinity,
  doShowMoreDrillDown: true,
  drilldownView: _constants.views.DAY,
  titleAccessor: 'title',
  tooltipAccessor: 'title',
  allDayAccessor: 'allDay',
  startAccessor: 'start',
  endAccessor: 'end',
  resourceAccessor: 'resourceId',
  resourceIdAccessor: 'id',
  resourceTitleAccessor: 'title',
  longPressThreshold: 250,
  getNow: function getNow() {
    return new Date();
  },
  dayLayoutAlgorithm: 'overlap'
};