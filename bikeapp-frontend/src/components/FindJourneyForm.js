import { useState } from "react"
import { useQuery } from "@apollo/client"
import { FIND_JOURNEYS_BY_DEPARTURE_STATION_NAME } from "../queries"
import JourneyTable from "./JourneyTable"


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
    setDepartureStationNameToSearch('')
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
        <button type="submit">Search</button>
        <button type="text" onClick={() => {
          setJourneys([])
          setDepartureStationNameToSearch('')
          }}>Clear</button>
      </form>
      <h2>Journeys</h2>
      
      <JourneyTable result={journeys}/>
</div>
  )
}

export default FindJourneyForm