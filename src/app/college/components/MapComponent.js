"use client"; // Ensure this component is client-side only
import { useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMap } from "react-leaflet";


// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);


// Icon for map marker
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Zoom to hovered location component
const ZoomToCollege = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (map && coordinates) {
      map.flyTo(coordinates, 10, { animate: true });
    }
  }, [map, coordinates]);

  return null;
};

const MapComponent = ({ filteredColleges, hoveredCollege }) => {
  return (
    <div className="w-1/3 px-4 py-8 sticky top-0 h-[600px]">
      <MapContainer
        center={[20.5937, 78.9629]} // Default center to India
        zoom={5}
        className="h-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {filteredColleges.map((college) => (
          <Marker
            position={[college.location.latitude, college.location.longitude]}
            icon={markerIcon}
            key={college._id}
          >
            <Popup>
              <strong>{college.name}</strong>
              <p>{college.city}</p>
            </Popup>
          </Marker>
        ))}
        {hoveredCollege && (
          <ZoomToCollege
            coordinates={[hoveredCollege.location.latitude, hoveredCollege.location.longitude]}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;