import PropTypes from 'prop-types';
import React from 'react';
const DateHeader = ({ label, drilldownView, onDrillDown }) => {
    if (!drilldownView) {
        return React.createElement("span", null, label);
    }
    return (React.createElement("button", { type: "button", className: "rbc-button-link", onClick: onDrillDown, role: "cell" }, label));
};
DateHeader.propTypes = {
    label: PropTypes.node,
    date: PropTypes.instanceOf(Date),
    drilldownView: PropTypes.string,
    onDrillDown: PropTypes.func,
    isOffRange: PropTypes.bool,
};
export default DateHeader;
