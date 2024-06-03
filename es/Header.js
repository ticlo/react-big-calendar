import React from 'react';
const Header = ({ label }) => {
    return (React.createElement("span", { role: "columnheader", "aria-sort": "none" }, label));
};
export default Header;
