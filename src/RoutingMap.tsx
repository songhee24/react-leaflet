import React, { useEffect, useState, useRef } from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";

import L from "leaflet";

// Import the routing machine JS and CSS:
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const RoutingMap = () => {
  const [map, setMap] = useState(null);

  // Start-End point for the routing machine
  const [start, setStart] = useState([38.9072, -77.0369]);
  const [end, setEnd] = useState([37.7749, -122.4194]);

  // Routing machine ref
  const RoutingMachineRef = useRef(null);

  // Add the routing machine to the map instance:
  useEffect(() => {
    if (!map) return;
    if (map) {
      // @ts-ignore
      RoutingMachineRef.current = L.Routing.control({
        position: "topleft",
        lineOptions: {
          styles: [
            {
              color: "#e875a5",
            },
          ],
        },
        waypoints: [start, end],
      }).addTo(map);
    }
  }, [map]);

  // Update start and end points on button click:
  const handleClick = () => {
    if (start[0] === 38.9072) {
      setStart([40.7128, -74.006]);
      setEnd([47.6062, -122.3321]);
    }
    if (start[0] === 40.7128) {
      setStart([38.9072, -77.0369]);
      setEnd([37.7749, -122.4194]);
    }
  };

  // Set waypoints when start and end points are updated:
  useEffect(() => {
    if (RoutingMachineRef.current) {
      // @ts-ignore
      RoutingMachineRef.current.setWaypoints([start, end]);
    }
  }, [RoutingMachineRef, start, end]);

  return (
    <>
      <button color="default" onClick={handleClick}>
        Click To Change Waypoints
      </button>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={3}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        // Set the map instance to state when ready:
        // @ts-ignore
        whenReady={(map) => setMap(map.target)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default RoutingMap;
