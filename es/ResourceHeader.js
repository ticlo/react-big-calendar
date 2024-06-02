import PropTypes from 'prop-types';
import React from 'react';
const ResourceHeader = ({ label }) => {
    return React.createElement(React.Fragment, null, label);
};
ResourceHeader.propTypes = {
    label: PropTypes.node,
    index: PropTypes.number,
    resource: PropTypes.object,
};
export default ResourceHeader;
