import React from 'react';
const DateHeader = ({ label, drilldownView, onDrillDown }) => {
    if (!drilldownView) {
        return React.createElement("span", null, label);
    }
    return (React.createElement("button", { type: "button", className: "rbc-button-link", onClick: onDrillDown, role: "cell" }, label));
};
export default DateHeader;
