import PropTypes from 'prop-types';
import React from 'react';
const Header = ({ label }) => {
    return (React.createElement("span", { role: "columnheader", "aria-sort": "none" }, label));
};
Header.propTypes = {
    label: PropTypes.node,
};
export default Header;
