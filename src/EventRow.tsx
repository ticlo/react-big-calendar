import clsx from 'clsx';
import React from 'react';
import EventRowMixin from './EventRowMixin';

interface EventRowProps {
  segments?: any[];
  slotMetrics: any;
  className?: string;
  localizer: any;
  accessors: any;
  getters: any;
  components: any;
  selected?: any;
  onSelect?: (...args: any[]) => any;
  onDoubleClick?: (...args: any[]) => any;
  onKeyPress?: (...args: any[]) => any;
  resourceId?: any;
}

class EventRow extends React.Component<EventRowProps> {
  render() {
    let {
      segments,
      slotMetrics: { slots },
      className,
    } = this.props;

    let lastEnd = 1;

    return (
      <div className={clsx(className, 'rbc-row')}>
        {segments.reduce((row, { event, left, right, span }, li) => {
          let key = '_lvl_' + li;
          let gap = left - lastEnd;

          let content = EventRowMixin.renderEvent(this.props, event);

          if (gap) row.push(EventRowMixin.renderSpan(slots, gap, `${key}_gap`));

          row.push(EventRowMixin.renderSpan(slots, span, key, content as any));

          lastEnd = right + 1;

          return row;
        }, [])}
      </div>
    );
  }
}

(EventRow as any).defaultProps = {
  ...EventRowMixin.defaultProps,
};

export default EventRow;
