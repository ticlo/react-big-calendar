import React, { useRef } from 'react';
import type { DateTime } from 'luxon';
import { DateLocalizer } from './localizer';
import { Overlay } from 'react-overlays';
import Popup from './Popup';

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
}: {
  containerRef: React.ForwardedRef<HTMLElement>;
  popupOffset?: number | { x?: number; y?: number };
  overlay?: {
    position?: { top: number; left: number; width: number; height: number };
    events?: unknown[];
    date?: DateTime;
    end?: DateTime;
    target?: HTMLElement;
  };
  accessors: unknown;
  localizer: DateLocalizer;
  components: unknown;
  getters: unknown;
  selected?: object;
  handleSelectEvent?: (...args: unknown[]) => unknown;
  handleDoubleClickEvent?: (...args: unknown[]) => unknown;
  handleKeyPressEvent?: (...args: unknown[]) => unknown;
  handleDragStart?: (...args: unknown[]) => unknown;
  onHide?: () => void;
  overlayDisplay?: (...args: unknown[]) => unknown;
}) {
  const popperRef = useRef(null);
  if (!overlay.position) return null;

  let offset: { x: number; y: number } =
    typeof popupOffset === 'number'
      ? { x: popupOffset, y: popupOffset }
      : { x: popupOffset.x ?? 0, y: popupOffset.y ?? 0 };

  const { position, events, date, end } = overlay;
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
  );
}

interface PopOverlayProps {
  show?: boolean;
  popupOffset?:
    | number
    | {
        x?: number;
        y?: number;
      };
  overlay?: {
    position?: { top: number; left: number; width: number; height: number };
    events?: unknown[];
    date?: DateTime;
    end?: DateTime;
    target?: HTMLElement;
  };
  accessors: unknown;
  localizer: DateLocalizer;
  components: unknown;
  getters: unknown;
  selected?: object;
  handleSelectEvent?: (...args: unknown[]) => unknown;
  handleDoubleClickEvent?: (...args: unknown[]) => unknown;
  handleKeyPressEvent?: (...args: unknown[]) => unknown;
  handleDragStart?: (...args: unknown[]) => unknown;
  onHide?: () => void;
  overlayDisplay?: (...args: unknown[]) => unknown;
}

const PopOverlay = React.forwardRef<HTMLElement, PopOverlayProps>(
  (props, ref) => <CalOverlay {...props} containerRef={ref} />
);
PopOverlay.displayName = 'PopOverlay';

export default PopOverlay;
