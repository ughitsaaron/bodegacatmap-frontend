import type { LeafletEventHandlerFnMap } from 'leaflet';
import { divIcon } from 'leaflet';
import { noop } from 'lodash';
import { useRef } from 'react';
import type { MarkerProps } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import styled from 'styled-components';

type EmojiMarkerProps = {
  label?: HTMLElement['ariaLabel'];
  symbol?: string;
  className?: HTMLElement['className'];
  onClick?: (marker: typeof Marker) => void;
} & MarkerProps;

function createDivIcon(className: string, label: string, symbol: string) {
  return divIcon({
    className,
    iconSize: [24, 24],
    html: `<span role="img" aria-label="${label}">${symbol}</span>`,
  });
}

const BaseEmojiMarker = ({
  className,
  label = '',
  symbol = '',
  onClick = noop,
  ...other
}: EmojiMarkerProps) => {
  const markerRef = useRef(null);

  const eventHandlers: LeafletEventHandlerFnMap = {
    click: (e) => {
      const marker = markerRef.current;
      if (e.target === marker) {
        onClick(marker);
      }
    },
  };

  return (
    <Marker
      eventHandlers={eventHandlers}
      icon={createDivIcon(className, label, symbol)}
      ref={markerRef}
      {...other}
    />
  );
};

export const EmojiMarker = styled(BaseEmojiMarker)`
  font-size: 32px;
  position: relative;
  z-index: 5001;
`;
