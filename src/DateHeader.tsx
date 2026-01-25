import React from 'react';
import type { DateTime } from 'luxon';

interface DateHeaderProps {
  label?: React.ReactNode;
  date?: DateTime;
  drilldownView?: string;
  onDrillDown?: () => void;
  isOffRange?: boolean;
}

const DateHeader = ({ label, drilldownView, onDrillDown }: DateHeaderProps) => {
  if (!drilldownView) {
    return <span>{label}</span>;
  }

  return (
    <button
      type="button"
      className="rbc-button-link"
      onClick={onDrillDown}
      role="cell"
    >
      {label}
    </button>
  );
};

export default DateHeader;
