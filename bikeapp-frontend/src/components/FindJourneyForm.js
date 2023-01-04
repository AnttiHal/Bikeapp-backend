import { useState } from "react"
import { useQuery } from "@apollo/client"
import { FIND_JOURNEYS_BY_DEPARTURE_STATION_NAME } from "../queries"


const FindJourneyForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(100)
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState('departure_station_name')
  const [departureStationNameToSearch, setDepartureStationNameToSearch] = useState('')
  const [journeys, setJourneys] = useState([])
  
  
  const journeysByName = useQuery(FIND_JOURNEYS_BY_DEPARTURE_STATION_NAME, {
    variables: { departureStationNameToSearch, limit, offset, sort },
    skip: !departureStationNameToSearch
  })

  

  const handleSubmit = (event) => {
    event.preventDefault()
    setJourneys(journeysByName.data.findJourneysByDepartureStationName)
    setDepartureStationNameToSearch(null)
  }

  

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label>Search journeys:
          <input 
            type="text" 
            value={departureStationNameToSearch}
            onChange={(e) => {
              e.preventDefault()
              setDepartureStationNameToSearch(e.target.value)}}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="text" onClick={() => {
          setJourneys([])
          setDepartureStationNameToSearch('')
          }}>Clear</button>
      </form>
      <h2>Journeys</h2>
      
      <table>
      <tbody>
        <tr>
          <th>Departure station</th>
          <th>Return station</th>
          <th>Distance (km)</th>
          <th>Duration </th>
        </tr>
        
        {journeys.map((p) => {
        return (
          <tr key={p._id}>
            <td>{p.departure_station_name}</td>
            <td>{p.return_station_name}</td>
            <td>{(p.covered_distance_m/1000).toFixed(2)}km</td>
            <td>{Math.floor(p.duration_sec/60)}min{p.duration_sec % 60}s</td>
          </tr>
        )
})}
      </tbody>
    </table>
</div>
  )
}

export default FindJourneyForm