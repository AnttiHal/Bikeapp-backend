import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_JOURNEYS_WITH_LIMIT, JOURNEY_COUNT } from "../queries"

const JourneyList = () => {
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(100)
  const [offset, setOffset] = useState(0)
  const count = useQuery(JOURNEY_COUNT)
  const result = useQuery(ALL_JOURNEYS_WITH_LIMIT, {
    variables: { limit, offset},
    skip: !limit && !offset
    
  })

  if (result.loading || count.loading )  {
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
        }}>Palaa alkuun
      </button>
      <h2>Journeys</h2>
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