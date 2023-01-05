import Journey from "./Journey"

const JourneyTable = ({result}) => {
  if (result.length===0 || result===undefined) {
    return (
      <p>No results</p>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <th>Departure station</th>
          <th>Return station</th>
          <th>Distance (km)</th>
          <th>Duration </th>
        </tr>
        
        {result.map((journey) => {
        return (
          <Journey journey={journey}/>
        )
    })}
      </tbody>
    </table>
  )
}

export default JourneyTable