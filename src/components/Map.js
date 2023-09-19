

import React, { useEffect, useRef } from "react";

const MapComponent = ({ lat, lng, onMarkerDragEnd }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 12, // You can adjust the zoom level as needed
    });

    // Create a marker
    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: "Job Location",
      draggable: true, // Make the marker draggable
    });

    // Add a dragend event listener to the marker
    markerRef.current.addListener("dragend", (e) => {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      onMarkerDragEnd(newLat, newLng);
    });
  }, [lat, lng, onMarkerDragEnd]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", minHeight: "200px" }}
    ></div>
  );
};

export default MapComponent;
