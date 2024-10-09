import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Entity } from '../store/entity';
type MapType = {
    markers: Entity[];
};

export const MapComponent: FC<MapType> = ({ markers }) => {
    return (
        <MapContainer center={[49, 31]} zoom={6} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((marker, idx) => (
                <Marker key={idx} position={marker.position} icon={marker.img}>
                    <Popup>
                        {JSON.stringify({
                            id: marker.id,
                            position: marker.position,
                            isOld: marker.isOld,
                            direction: marker.direction
                        })}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
