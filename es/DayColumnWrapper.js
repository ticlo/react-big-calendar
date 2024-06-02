import React from 'react';
const DayColumnWrapper = ({ children, className, style, innerRef }) => {
    return (React.createElement("div", { className: className, style: style, ref: innerRef }, children));
};
export default React.forwardRef((props, ref) => (React.createElement(DayColumnWrapper, { ...props, innerRef: ref })));
