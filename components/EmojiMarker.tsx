import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import type { MarkerProps } from 'react-leaflet';
import styled from 'styled-components';

type EmojiMarkerProps = {
  label?: HTMLElement['ariaLabel'];
  symbol?: string;
  className?: HTMLElement['className'];
} & MarkerProps;

const BaseEmojiMarker = ({ className, label = '', symbol = '', ...other }: EmojiMarkerProps) => {
  const icon = L.divIcon({
    className,
    iconSize: [24, 24],
    html: `<span role="img" aria-label="${label}">${symbol}</span>`,
  });

  return <Marker icon={icon} {...other} />;
};

export const EmojiMarker = styled(BaseEmojiMarker)`
  font-size: 32px;
`;
