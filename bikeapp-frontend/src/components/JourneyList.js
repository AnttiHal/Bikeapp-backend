import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ALL_JOURNEYS_WITH_LIMIT, JOURNEY_COUNT, FIND_JOURNEYS_BY_DEPARTURE_STATION_NAME } from "../queries"


const JourneyList = () => {
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(100)
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState('departure_station_name')
  const [direction, setDirection] = useState(1)
  
  const count = useQuery(JOURNEY_COUNT)
  const result = useQuery(ALL_JOURNEYS_WITH_LIMIT, {
    variables: { limit, offset, sort, direction},
    skip: !limit && !offset
  })

  if (result.loading || count.loading  )  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Journeys in the database: {count.data.journeyCount}</h2>
      <button onClick={() => {    
        setOffset(offset+100)
        }}>show next 100
      </button>
      <button onClick={() => {    
        if (offset>=100)
        setOffset(offset-100)
        }}>show previous 100
      </button>
      <button onClick={() => {    
        setOffset(0)
        }}>back to start
      </button>
      <h2>Journeys</h2>
      <h3>Sort</h3>
      <button onClick={() => {    
        setSort('departure_station_name')
        }}>By departure station name
      </button>
      <button onClick={() => {    
        setSort('return_station_name')
        }}>By departure station name
      </button>
      <button onClick={() => {    
        setSort('covered_distance_m')
        }}>by distance
      </button>
      <button onClick={() => {    
        setSort('duration_sec')
        }}>by duration
      </button>
      <div>
      <button onClick={() => {    
        setDirection(1)
        }}>ascending
      </button>
      <button onClick={() => {    
        setDirection(-1)
        }}>descending
      </button>
      </div>
      <table>
      <tbody>
        <tr>
          <th>Departure station</th>
          <th>Return station</th>
          <th>Distance (km)</th>
          <th>Duration </th>
        </tr>
        
        {result.data.allJourneys.map((p) => {
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

export default JourneyList