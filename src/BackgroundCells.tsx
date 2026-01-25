import React, { createRef } from 'react';
import type { DateTime } from 'luxon';
import clsx from 'clsx';

import { notify } from './utils/helpers';
import { dateCellSelection, getSlotAtX, pointInBox } from './utils/selection';
import Selection, { getBoundsForNode, isEvent, isShowMore } from './Selection';
import { DateLocalizer } from './localizer';

interface BackgroundCellsProps {
  date?: DateTime;
  getNow: () => DateTime;
  getters: {
    dayProp: (date: DateTime) => {
      className?: string;
      style?: React.CSSProperties;
    };
  };
  components: {
    dateCellWrapper: React.ComponentType<{
      value: DateTime;
      range: DateTime[];
      children: React.ReactNode;
    }>;
  };
  container?: () => HTMLElement | null;
  dayPropGetter?: (date: DateTime) => {
    className?: string;
    style?: React.CSSProperties;
  };
  selectable?: true | false | 'ignoreEvents';
  longPressThreshold?: number;
  onSelectSlot: (args: {
    start: number;
    end: number;
    action: string;
    bounds: { top: number; left: number; right: number; bottom: number } | null;
    box: { x: number; y: number; clientX: number; clientY: number } | null;
    resourceId: number | string | undefined;
  }) => void;
  onSelectEnd?: (state: BackgroundCellsState) => void;
  onSelectStart?: (box: { x: number; y: number }) => void;
  range?: DateTime[];
  rtl?: boolean;
  type?: string;
  resourceId?: number | string;
  localizer?: DateLocalizer;
}

interface BackgroundCellsState {
  selecting: boolean;
  startIdx?: number;
  endIdx?: number;
}

class BackgroundCells extends React.Component<
  BackgroundCellsProps,
  BackgroundCellsState
> {
  private containerRef: React.RefObject<HTMLDivElement>;
  private _selector: any;
  private _initial: any;

  constructor(props, context) {
    super(props, context);

    this.state = {
      selecting: false,
    };
    this.containerRef = createRef();
  }

  componentDidMount() {
    this.props.selectable && this._selectable();
  }

  componentWillUnmount() {
    this._teardownSelectable();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.selectable && this.props.selectable) this._selectable();

    if (prevProps.selectable && !this.props.selectable)
      this._teardownSelectable();
  }

  render() {
    let {
      range,
      getNow,
      getters,
      date: currentDate,
      components: { dateCellWrapper: Wrapper },
      localizer,
    } = this.props;
    let { selecting, startIdx, endIdx } = this.state;
    let current = getNow();

    return (
      <div className="rbc-row-bg" ref={this.containerRef}>
        {range.map((date, index) => {
          let selected = selecting && index >= startIdx && index <= endIdx;
          const { className, style } = getters.dayProp(date);

          return (
            <Wrapper key={index} value={date} range={range}>
              <div
                style={style}
                className={clsx(
                  'rbc-day-bg',
                  className,
                  selected && 'rbc-selected-cell',
                  localizer.isSameDate(date, current) && 'rbc-today',
                  currentDate &&
                    localizer.neq(currentDate, date, 'month') &&
                    'rbc-off-range-bg'
                )}
              />
            </Wrapper>
          );
        })}
      </div>
    );
  }

  _selectable() {
    let node = this.containerRef.current;
    let selector = (this._selector = new Selection(this.props.container, {
      longPressThreshold: this.props.longPressThreshold,
    }));

    let selectorClicksHandler = (point, actionType) => {
      if (!isEvent(node, point) && !isShowMore(node, point)) {
        let rowBox = getBoundsForNode(node);
        let { range, rtl } = this.props;

        if (pointInBox(rowBox, point)) {
          let currentCell = getSlotAtX(rowBox, point.x, rtl, range.length);

          this._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell,
            action: actionType,
            box: point,
            bounds: null,
          });
        }
      }

      this._initial = {};
      this.setState({ selecting: false });
    };

    selector.on('selecting', (box) => {
      let { range, rtl } = this.props;

      let startIdx = -1;
      let endIdx = -1;

      if (!this.state.selecting) {
        notify(this.props.onSelectStart, [box]);
        this._initial = { x: box.x, y: box.y };
      }
      if (selector.isSelected(node)) {
        let nodeBox = getBoundsForNode(node);
        ({ startIdx, endIdx } = dateCellSelection(
          this._initial,
          nodeBox,
          box,
          range.length,
          rtl
        ));
      }

      this.setState({
        selecting: true,
        startIdx,
        endIdx,
      });
    });

    selector.on('beforeSelect', (box) => {
      if (this.props.selectable !== 'ignoreEvents') return;

      return !isEvent(this.containerRef.current, box);
    });

    selector.on('click', (point) => selectorClicksHandler(point, 'click'));

    selector.on('doubleClick', (point) =>
      selectorClicksHandler(point, 'doubleClick')
    );

    selector.on('select', (bounds) => {
      const { startIdx, endIdx } = this.state;
      this._selectSlot({
        startIdx: startIdx!,
        endIdx: endIdx!,
        action: 'select',
        bounds,
        box: null,
      });
      this._initial = {};
      this.setState({ selecting: false });
      notify(this.props.onSelectEnd, [this.state]);
    });
  }

  _teardownSelectable() {
    if (!this._selector) return;
    this._selector.teardown();
    this._selector = null;
  }

  _selectSlot({ endIdx, startIdx, action, bounds, box }) {
    if (endIdx !== -1 && startIdx !== -1)
      this.props.onSelectSlot &&
        this.props.onSelectSlot({
          start: startIdx,
          end: endIdx,
          action,
          bounds,
          box,
          resourceId: this.props.resourceId,
        });
  }
}

export default BackgroundCells;
