import Journey from "./Journey"

const JourneyTable = ({result}) => {
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