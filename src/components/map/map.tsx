import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Point} from '../interfaces/point.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../consts/const.ts';
import useMap from './useMap.tsx';
import {Location} from '../interfaces/location.ts';

type MapProps = {
  cityLocation: Location;
  points: Point[];
  selectedPoint?: string | null;
  currentSelectedPoint?: Point | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({ cityLocation, points, selectedPoint = null, currentSelectedPoint = null } : MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== null && point.offerId === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (currentSelectedPoint) {
        const marker = new Marker({
          lat: currentSelectedPoint.latitude,
          lng: currentSelectedPoint.longitude
        });

        marker
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [currentSelectedPoint, map, points, selectedPoint]);

  return <div style={{height: '100%', width: '100%'}} ref={mapRef}></div>;
}

export default Map;
