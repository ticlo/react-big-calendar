import React, { useRef } from 'react'
import { DateLocalizer } from './localizer'
import { Overlay } from 'react-overlays'
import Popup from './Popup'

function CalOverlay({
  containerRef,
  popupOffset = 5,
  overlay,
  accessors,
  localizer,
  components,
  getters,
  selected,
  handleSelectEvent,
  handleDoubleClickEvent,
  handleKeyPressEvent,
  handleDragStart,
  onHide,
  overlayDisplay,
}: any) {
  const popperRef = useRef(null)
  if (!overlay.position) return null

  let offset = popupOffset
  if (!isNaN(popupOffset)) {
    offset = { x: popupOffset, y: popupOffset }
  }

  const { position, events, date, end } = overlay
  return (
    <Overlay
      rootClose
      flip
      show
      placement="bottom"
      onHide={onHide}
      target={overlay.target}
    >
      {({ props }) => (
        <Popup
          {...props}
          containerRef={containerRef}
          ref={popperRef}
          target={overlay.target}
          offset={offset}
          accessors={accessors}
          getters={getters}
          selected={selected}
          components={components}
          localizer={localizer}
          position={position}
          show={overlayDisplay}
          events={events}
          slotStart={date}
          slotEnd={end}
          onSelect={handleSelectEvent}
          onDoubleClick={handleDoubleClickEvent}
          onKeyPress={handleKeyPressEvent}
          handleDragStart={handleDragStart}
        />
      )}
    </Overlay>
  )
}

interface PopOverlayProps {
  show?: boolean;
  popupOffset?: number | {
    x?: number;
    y?: number;
  };
  overlay?: {
    position?: object;
    events?: unknown[];
    date?: Date;
    end?: Date;
    target?: any;
  };
  accessors: any;
  localizer: DateLocalizer;
  components: any;
  getters: any;
  selected?: object;
  handleSelectEvent?: (...args: unknown[]) => unknown;
  handleDoubleClickEvent?: (...args: unknown[]) => unknown;
  handleKeyPressEvent?: (...args: unknown[]) => unknown;
  handleDragStart?: (...args: unknown[]) => unknown;
  onHide?: (...args: unknown[]) => unknown;
  overlayDisplay?: (...args: unknown[]) => unknown;
}

const PopOverlay = React.forwardRef<HTMLElement, PopOverlayProps>((props, ref) => (
  <CalOverlay {...props} containerRef={ref} />
))

export default PopOverlay
