import { ClassNames } from '@emotion/react';
import type { LeafletEventHandlerFnMap, Marker as MarkerType } from 'leaflet';
import { divIcon } from 'leaflet';
import { noop } from 'lodash';
import { useRef } from 'react';
import type { MarkerProps } from 'react-leaflet';
import { Marker } from 'react-leaflet';

type EmojiMarkerProps = {
  emoji?: string;
  onClick?: (marker: MarkerType) => void;
  fontSize?: number;
} & MarkerProps;

export function EmojiMarker({
  emoji = '',
  fontSize = 28,
  onClick = noop,
  ...other
}: EmojiMarkerProps) {
  const markerRef = useRef<MarkerType>(null);

  const eventHandlers: LeafletEventHandlerFnMap = {
    click: (e) => {
      const marker = markerRef.current;
      if (e.target === marker) {
        onClick(marker);
      }
    },
  };

  return (
    <ClassNames>
      {({ css }) => (
        <Marker
          eventHandlers={eventHandlers}
          icon={divIcon({
            className: css({
              alignItems: 'center',
              justifyContent: 'center',
              '&&': { display: 'flex' },
              ':before': { content: `"${emoji}"`, fontSize },
            }),
          })}
          ref={markerRef}
          {...other}
        />
      )}
    </ClassNames>
  );
}
