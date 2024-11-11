import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City} from '../../../interfaces/city.ts';
import {Point} from '../../../interfaces/point.ts';
import useMap from '../../../hooks/useMap.tsx';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../icons/const.ts';

type MapProps = {
  city: City;
  selectedPoint: Point | null;
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

function Map(props: MapProps): JSX.Element {
  const {city, selectedPoint} = props;

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      city.points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== null && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, city, selectedPoint]);

  return <div style={{height: '100%', width: '100%'}} ref={mapRef}></div>;
}

export default Map;
