import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

let size = 30;
class LeafLetMap extends React.Component<any, any> {
  render() {
    return (
      <MapContainer
        id={"map"}
        style={{ height: "450px", width: "100%" }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={L.divIcon({
            iconSize: [size, size],
            iconAnchor: [size / 2.4, size - 16],
            className: "mymarker",
            html: "<img alt='img' src='https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png' />",
          })}
          position={[51.505, -0.09]}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default LeafLetMap;
