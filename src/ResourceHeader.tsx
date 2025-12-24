import React from 'react';

interface ResourceHeaderProps {
  label?: React.ReactNode;
  index?: number;
  resource?: object;
}

const ResourceHeader = ({ label }: ResourceHeaderProps) => {
  return <React.Fragment>{label}</React.Fragment>;
};

export default ResourceHeader;
