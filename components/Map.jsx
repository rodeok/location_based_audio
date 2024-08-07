import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';

const createIcon = (IconComponent) => {
  return L.divIcon({
    html: IconComponent({ className: 'text-red-500', size: 30 }),
    className: 'custom-icon',
    iconSize: [30, 30],
  });
};

const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={createIcon(FaMapMarkerAlt)} />
  );
};

const Map = ({ onLocationSelect }) => {
  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-96 w-full rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default Map;