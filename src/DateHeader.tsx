import React from 'react'

interface DateHeaderProps {
  label?: React.ReactNode;
  date?: Date;
  drilldownView?: string;
  onDrillDown?: (...args: unknown[]) => unknown;
  isOffRange?: boolean;
}

const DateHeader = ({
  label,
  drilldownView,
  onDrillDown
}: DateHeaderProps) => {
  if (!drilldownView) {
    return <span>{label}</span>
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
  )
}

export default DateHeader
