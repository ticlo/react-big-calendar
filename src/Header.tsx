import React from 'react';

interface HeaderProps {
  label?: React.ReactNode;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <span role="columnheader" aria-sort="none">
      {label}
    </span>
  );
};

export default Header;
