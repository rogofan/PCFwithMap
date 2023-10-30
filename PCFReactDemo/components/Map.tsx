import React from "react";

interface MapProps {
  latitude: number;
  longitude: number;
}

const apiKey = "AIzaSyB32qjwfBF4n_OVQtrzFkhZOHcXzbMzuqw";

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=15`;

  const position = {
    border: 0,
  };

  return (
    <iframe
      title="Map"
      width="100%"
      height="400"
      src={mapUrl}
      style={position}
    />
  );
};

export default Map;
