import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import 'mapbox-gl-leaflet';
import L from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import { MapContainer, useMap } from 'react-leaflet';

function useOnce(cb, deps = []) {
  const shouldCall = useRef(true);

  useEffect(() => {
    if (shouldCall) {
      cb();
      shouldCall.current = false;
    }
  }, [cb, ...deps]);
}

function MapboxGLLayer({ style, accessToken }) {
  const map = useMap();

  useOnce(() => {
    if (map) {
      const layer = L.mapboxGL({ style, accessToken, pitch: 5 } as any);
      layer.addTo(map);
    }
  }, [map]);

  return null;
}

const MAX_BOUNDS: LatLngTuple[] = [
  [40.44, -74.45],
  [41, -73.65],
];

const INIT_ZOOM = 12;
const MIN_ZOOM = INIT_ZOOM;

export function Map({ children = null }) {
  return (
    <MapContainer
      center={[40.73061, -73.935242]}
      maxBounds={MAX_BOUNDS}
      minZoom={MIN_ZOOM}
      scrollWheelZoom={false}
      style={{ height: '100%' }}
      zoom={INIT_ZOOM}
    >
      <MapboxGLLayer
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URI}
      />
      {children}
    </MapContainer>
  );
}
