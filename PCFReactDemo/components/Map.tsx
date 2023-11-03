import React from "react";

interface MapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const apiKey = "AIzaSyB32qjwfBF4n_OVQtrzFkhZOHcXzbMzuqw";

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=13`;

  return (
    <iframe
      title="Map"
      width="100%"
      height="450"
      src={mapUrl}
      style={{ border: 0 }}
    />
  );
};

export default Map;
