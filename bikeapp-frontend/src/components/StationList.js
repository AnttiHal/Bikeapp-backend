import { JOURNEY_COUNT_FROM_CERTAIN_STATION, FIND_STATION, JOURNEY_COUNT_TO_CERTAIN_STATION } from "../queries"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import Station from "./Station"

const StationList = ({stationData }) => {
  const [stationNameToSearch, setStationNameToSearch] = useState(null)
  const countFromStation = useQuery(JOURNEY_COUNT_FROM_CERTAIN_STATION, {
    variables: { stationNameToSearch },
    skip: !stationNameToSearch
  })
  const countToStation = useQuery(JOURNEY_COUNT_TO_CERTAIN_STATION, {
    variables: { stationNameToSearch },
    skip: !stationNameToSearch
  })
  const station = useQuery(FIND_STATION, {
    variables: { stationNameToSearch },
    skip: !stationNameToSearch
  })

  if (countFromStation.loading || station.loading || countToStation.loading)  {
    return <div>loading...</div>
  }
  if (stationNameToSearch && station.data && countFromStation.data && countToStation.data) {
    return (
      <div>
        <Station 
          station={station.data.findStation} 
          countFromStation={countFromStation.data.JourneyCountFromCertainStation}
          countToStation={countToStation.data.JourneyCountFromCertainStation}
          onClose={() => setStationNameToSearch(null)}
        />
      </div>
    )
  } 
  return (
    <div>
      <h2>Stations</h2>
        <table>
          <tbody>
            <tr>
              <th>Station name</th>
              <th>Address</th>
              <th>Details</th>
              
            </tr>
            
            {stationData.allStations.map((p) => {
            
            return (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td><input type='button' value='show details' onClick={() => 
                  setStationNameToSearch(p.name)
                  }/> </td>
              </tr>
            )
          })}
          </tbody>
        </table>
    </div>
  )
}

export default StationList