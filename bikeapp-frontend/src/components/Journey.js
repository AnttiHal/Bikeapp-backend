const Journey = ({journey}) => {
  return (
      <tr key={journey._id}>
        <td>{journey.departure_station_name}</td>
        <td>{journey.return_station_name}</td>
        <td>{(journey.covered_distance_m/1000).toFixed(2)}km</td>
        <td>{Math.floor(journey.duration_sec/60)}min{journey.duration_sec % 60}s</td>
      </tr>
    )
}

export default Journey