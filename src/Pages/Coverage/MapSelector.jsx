import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Bangladesh bounding box
const bangladeshBounds = [
  [20.55, 88.0], // Southwest
  [26.75, 92.0], // Northeast
];

// Component to handle map click events (optional)
const MapClickHandler = ({ onSelect, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

// Component to fly smoothly to selected district
const FlyToDistrict = ({ district }) => {
  const map = useMap();

  useEffect(() => {
    if (district && district.latitude && district.longitude) {
      // Step 1: Light zoom for soft transition
      map.flyTo([district.latitude, district.longitude], 8, {
        duration: 1.5,
      });

      // Step 2: After delay, zoom in closer
      const timeout = setTimeout(() => {
        map.flyTo([district.latitude, district.longitude], 11, {
          duration: 2.5,
        });
      }, 1500);

      return () => clearTimeout(timeout); // cleanup
    }
  }, [district, map]);

  return null;
};

const MapSelector = ({ onSelect, districts, selectedDistrict }) => {
  const [position, setPosition] = useState(null);

  return (
    <MapContainer
      center={[23.685, 90.3563]} // Dhaka
      zoom={7}
      maxBounds={bangladeshBounds}
      maxBoundsViscosity={1.0}
      className="h-96 w-full rounded-lg shadow"
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler onSelect={onSelect} setPosition={setPosition} />
      <FlyToDistrict district={selectedDistrict} />

      {districts.map((district, index) => (
        <Marker
          key={index}
          position={[district.latitude, district.longitude]}
          eventHandlers={{
            click: () => onSelect(district),
          }}
        >
          <Popup>
            <strong>{district.district}</strong>
            <br />
            {district.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapSelector;
