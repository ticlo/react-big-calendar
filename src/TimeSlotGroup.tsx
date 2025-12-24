import clsx from 'clsx';
import React, { Component } from 'react';

import BackgroundWrapper from './BackgroundWrapper';

interface TimeSlotGroupProps {
  renderSlot?: (...args: any[]) => any;
  group: any[];
  resource?: any;
  components?: any;
  getters?: any;
}

export default class TimeSlotGroup extends Component<TimeSlotGroupProps> {
  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props;

    const groupProps = getters ? getters.slotGroupProp(group) : {};
    return (
      <div className="rbc-timeslot-group" {...groupProps}>
        {group.map((value, idx) => {
          const slotProps = getters ? getters.slotProp(value, resource) : {};
          return (
            <Wrapper key={idx} value={value} resource={resource}>
              <div
                {...slotProps}
                className={clsx('rbc-time-slot', slotProps.className)}
              >
                {renderSlot && renderSlot(value, idx)}
              </div>
            </Wrapper>
          );
        })}
      </div>
    );
  }
}
