import type { ControlPosition, Map as LeafletMap } from 'leaflet';
import L from 'leaflet';
import 'mapbox-gl-leaflet';
import type { MapContainerProps } from 'react-leaflet';
import { MapContainer, ZoomControl } from 'react-leaflet';

function addMapboxLayer(map: LeafletMap) {
  const style = process.env.NEXT_PUBLIC_MAPBOX_STYLE_URI;
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (map) {
    return L.mapboxGL({ style, accessToken, pitch: 5 }).addTo(map);
  }

  return null;
}

type Props = {
  zoomControlPosition?: ControlPosition;
} & MapContainerProps;

export function Map({ children = null, zoomControlPosition, ...other }: Props) {
  return (
    <>
      <MapContainer ref={addMapboxLayer} zoomControl={false} {...other}>
        {children}
        {zoomControlPosition && <ZoomControl position={zoomControlPosition} />}
      </MapContainer>
    </>
  );
}
