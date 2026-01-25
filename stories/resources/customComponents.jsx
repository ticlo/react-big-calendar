import React from 'react'
import { action } from '@storybook/addon-actions'

const customComponents = {
  dateCellWrapper: (dateCellWrapperProps) => {
    // Show 'click me' text in arbitrary places by using the range prop
    const hasAlert = dateCellWrapperProps.range
      ? dateCellWrapperProps.range.some((date) => {
          return date.day % 12 === 0
        })
      : false

    const style = {
      display: 'flex',
      flex: 1,
      borderLeft: '1px solid #DDD',
      backgroundColor: hasAlert ? '#f5f5dc' : '#fff',
    }
    return (
      <div style={style}>
        {hasAlert && (
          <a onClick={action('custom dateCellWrapper component clicked')}>
            Click me
          </a>
        )}
        {dateCellWrapperProps.children}
      </div>
    )
  },
  timeSlotWrapper: (timeSlotWrapperProps) => {
    const style =
      timeSlotWrapperProps.resource === null ||
      timeSlotWrapperProps.value.minute !== 0
        ? {}
        : {
            border: '4px solid',
            backgroundColor:
              timeSlotWrapperProps.value.hour >= 8 &&
              timeSlotWrapperProps.value.hour <= 17
                ? 'green'
                : 'red',
            padding: '5px',
          }
    return <div style={style}>{timeSlotWrapperProps.children}</div>
  },
  eventWrapper: (eventWrapperProps) => {
    const style = {
      border: '4px solid',
      borderColor:
        eventWrapperProps.event.start.hour % 2 === 0 ? 'green' : 'red',
      padding: '5px',
    }
    return <div style={style}>{eventWrapperProps.children}</div>
  },
  timeGutterWrapper: (timeGutterWrapperProps) => {
    return (
      <div
        id="my-custom-time-gutter-wrapper"
        style={{ backgroundColor: 'gray' }}
      >
        {timeGutterWrapperProps.children}
      </div>
    )
  },
}

export default customComponents

