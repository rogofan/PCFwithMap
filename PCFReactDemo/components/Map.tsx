import React from "react";

interface MapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const apiKey = "AIzaSyB32qjwfBF4n_OVQtrzFkhZOHcXzbMzuqw";

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  if (typeof latitude === "undefined" || typeof longitude === "undefined") {
    return <div>Map coordinates not available.</div>;
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=13`;

  const position = {
    border: 0,
  };

  return (
    <iframe
      title="Map"
      width="100%"
      height="450"
      src={mapUrl}
      style={position}
    />
  );
};

export default Map;
