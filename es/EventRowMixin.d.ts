import PropTypes from 'prop-types';
import React from 'react';
declare const _default: {
    propTypes: {
        slotMetrics: PropTypes.Validator<object>;
        selected: PropTypes.Requireable<object>;
        isAllDay: PropTypes.Requireable<boolean>;
        accessors: PropTypes.Validator<object>;
        localizer: PropTypes.Validator<object>;
        components: PropTypes.Validator<object>;
        getters: PropTypes.Validator<object>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        segments: any[];
        selected: {};
    };
    renderEvent(props: any, event: any): React.JSX.Element;
    renderSpan(slots: any, len: any, key: any, content?: string): React.JSX.Element;
};
export default _default;
