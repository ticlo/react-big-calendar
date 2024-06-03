import React, { useState, useEffect, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { getSlotMetrics } from './utils/TimeSlots';
import TimeSlotGroup from './TimeSlotGroup';
/**
 * Since the TimeGutter only displays the 'times' of slots in a day, and is separate
 * from the Day Columns themselves, we check to see if the range contains an offset difference
 * and, if so, change the beginning and end 'date' by a day to properly display the slots times
 * used.
 */
function adjustForDST({ min, max, localizer }) {
    if (localizer.getTimezoneOffset(min) !== localizer.getTimezoneOffset(max)) {
        return {
            start: localizer.add(min, -1, 'day'),
            end: localizer.add(max, -1, 'day'),
        };
    }
    return { start: min, end: max };
}
const TimeGutter = ({ min, max, timeslots, step, localizer, getNow, resource, components, getters, gutterRef }) => {
    const { timeGutterWrapper: TimeGutterWrapper } = components;
    const { start, end } = useMemo(() => adjustForDST({ min, max, localizer }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min?.toISOString(), max?.toISOString(), localizer]);
    const [slotMetrics, setSlotMetrics] = useState(getSlotMetrics({
        min: start,
        max: end,
        timeslots,
        step,
        localizer,
    }));
    useEffect(() => {
        if (slotMetrics) {
            setSlotMetrics(slotMetrics.update({
                min: start,
                max: end,
                timeslots,
                step,
                localizer,
            }));
        }
        /**
         * We don't want this to fire when slotMetrics is updated as it would recursively bomb
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start?.toISOString(), end?.toISOString(), timeslots, step]);
    const renderSlot = useCallback((value, idx) => {
        if (idx)
            return null; // don't return the first (0) idx
        const isNow = slotMetrics.dateIsInGroup(getNow(), idx);
        return (React.createElement("span", { className: clsx('rbc-label', isNow && 'rbc-now') }, localizer.format(value, 'timeGutterFormat')));
    }, [slotMetrics, localizer, getNow]);
    return (React.createElement(TimeGutterWrapper, { slotMetrics: slotMetrics },
        React.createElement("div", { className: "rbc-time-gutter rbc-time-column", ref: gutterRef }, slotMetrics.groups.map((grp, idx) => {
            return (React.createElement(TimeSlotGroup, { key: idx, group: grp, resource: resource, components: components, renderSlot: renderSlot, getters: getters }));
        }))));
};
export default React.forwardRef((props, ref) => (React.createElement(TimeGutter, { gutterRef: ref, ...props })));
