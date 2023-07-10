// @ts-nocheck

import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";

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
        createMarker: function (i: any, wp: any, nWps: any) {
          if (i === 0) {
            return null;
            // L.marker(wp.latLng, {
            //     icon: L.divIcon({
            //         iconSize: [30, 30],
            //         iconAnchor: [30 / 2.4, 30 - 16],
            //         className: "mymarker",
            //         html: "<img alt='img' src='https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png' />",
            //     }),
            //     draggable: true,
            //     keyboard: true,
            //     alt: "current location",
            // })
            //     .on("drag", function (e) {
            //         e.latlng.alt = "current location";
            //
            //         console.log("there be dragons start!!", e);
            //         RoutingMachineRef.current.handleSetMarker({
            //             ...e.oldLatLng,
            //             ...e.latlng,
            //         });
            //     })
            // .bindPopup(document.createElement("div").append("Hello World"));
          }
          if (i === nWps - 1) {
            return null;
            //     L.marker(wp.latLng, {
            //         icon: L.divIcon({
            //             iconSize: [30, 30],
            //             iconAnchor: [30 / 2.4, 30 - 16],
            //             className: "mymarker",
            //             html: "<img alt='img' src='https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png' />",
            //         }),
            //         draggable: true,
            //         alt: "current destination",
            //     })
            //         .on("drag", function (e) {
            //             e.latlng.alt = "current destination";
            //             console.log("there be dragons dest!!", e);
            //             RoutingMachineRef.current.handleSetMarker({
            //                 ...e.oldLatLng,
            //                 ...e.latlng,
            //             });
            //         })
            //         .addEventListener("click", () => {
            //             alert("hello");
            //         });
            // }
          }
        },
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
        style={{ height: "80vh", width: "100%", padding: 0 }}
        className={"aza"}
        // Set the map instance to state when ready:
        // @ts-ignore
        whenReady={(map) => setMap(map.target)}
      >
        {/*<LayersControl position="topright">*/}
        {/*  <LayersControl.BaseLayer checked name="Map">*/}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={maps.base}
        />
        <Marker
          icon={L.divIcon({
            iconSize: [30, 30],
            iconAnchor: [30 / 2.4, 30 - 16],
            className: "mymarker",
            html: "<img alt='img' src='https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png' />",
          })}
          // @ts-ignore
          position={start}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker
          icon={L.divIcon({
            iconSize: [30, 30],
            iconAnchor: [30 / 2.4, 30 - 16],
            className: "mymarker",
            html: "<img alt='img' src='https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png' />",
          })}
          // @ts-ignore
          position={end}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/*  </LayersControl.BaseLayer>*/}
        {/*</LayersControl>*/}
      </MapContainer>
    </>
  );
};

export default RoutingMap;
