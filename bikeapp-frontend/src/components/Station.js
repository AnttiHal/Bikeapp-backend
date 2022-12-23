import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const Station = ({station, countFromStation, onClose, countToStation}) => {

  const position = [station.y, station.x]
  return (
    <div>
      <p></p>
      <table>
          <tbody>
            <tr>
              <th>Station name</th>
              <th>Address</th>
              <th>Journeys started from station</th>
              <th>Journeys ended to station</th>
            </tr>
            <tr>
              <td>{station.name}</td>
              <td>{station.address}</td>
              <td>{countFromStation}</td>
              <td>{countToStation}</td>
            </tr>
          </tbody>
        </table>
        <p></p>
        <div></div>
        <button onClick={onClose}>close</button>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <p>{station.name}</p>
              <p>{station.address}</p>
            </Popup>
          </Marker>
      </MapContainer>
    

  </div>
  )
}

export default Station