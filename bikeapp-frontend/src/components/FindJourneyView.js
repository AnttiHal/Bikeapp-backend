import { useState } from "react"
import { useQuery } from "@apollo/client"
import { FIND_JOURNEYS_BY_DEPARTURE_STATION_NAME, JOURNEY_COUNT_FROM_CERTAIN_STATION } from "../queries"
import JourneyTable from "./JourneyTable"
import FindJourneyForm from "./FindJourneyForm"
import ButtonGroup from "./ButtonGroup"


const FindJourneyView = () => {
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(100)
  // eslint-disable-next-line no-unused-vars
  const [offset, setOffset] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [sort, setSort] = useState('departure_station_name')
  // eslint-disable-next-line no-unused-vars
  const [direction, setDirection] = useState(1)
  const [departureStationNameToSearch, setDepartureStationNameToSearch] = useState('')
  const [stationNameToSearch, setStationNameToSearch] = useState('')
  const [journeys, setJourneys] = useState([])
  
  const count = useQuery(JOURNEY_COUNT_FROM_CERTAIN_STATION, {
    variables: {stationNameToSearch},
    skip: stationNameToSearch
  })
  const journeysByName = useQuery(FIND_JOURNEYS_BY_DEPARTURE_STATION_NAME, {
    variables: { departureStationNameToSearch, limit, offset, sort, direction },
    skip: !departureStationNameToSearch
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    setJourneys(journeysByName.data.findJourneysByDepartureStationName)
    setStationNameToSearch('Linnanmäki')
    setDepartureStationNameToSearch('')
  }

  const handleClearClick = () => {
    setJourneys([])
    setDepartureStationNameToSearch('')
  }

  const handleSearchClick  = (e) => {
    e.preventDefault()
    setDepartureStationNameToSearch(e.target.value)
  }

  if (count.loading ) {
    return (
      <div>loading...</div>
    )
  }
  return (
    <div>  
      <FindJourneyForm 
        handleClearClick={handleClearClick}
        handleSearchClick={handleSearchClick}
        handleSubmit={handleSubmit}
        departureStationNameToSearch={departureStationNameToSearch}
      />
      <h2>Journeys</h2>
      <JourneyTable result={journeys}/>
</div>
  )
}

export default FindJourneyView