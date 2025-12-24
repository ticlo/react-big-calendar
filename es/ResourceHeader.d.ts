import React from 'react';
interface ResourceHeaderProps {
    label?: React.ReactNode;
    index?: number;
    resource?: object;
}
declare const ResourceHeader: ({ label }: ResourceHeaderProps) => React.JSX.Element;
export default ResourceHeader;
