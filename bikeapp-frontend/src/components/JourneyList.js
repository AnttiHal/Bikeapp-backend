import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_JOURNEYS_WITH_LIMIT, JOURNEY_COUNT } from "../queries"
import JourneyTable from "./JourneyTable"


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

  const Button = ({text, setValue, value}) => {
    const handleClick = () => {
      setValue(value)
    }
    return (
      <button onClick={handleClick}>{text}</button>
    )
  }

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
      <div>
        <Button 
          text='By departure station name' 
          setValue={setSort} 
          value='departure_station_name'
        />
        <Button 
          text='By return station name' 
          setValue={setSort} 
          value='return_station_name'
        />
        <Button 
          text='By distance' 
          setValue={setSort} 
          value='covered_distance_m'
        />
        <Button 
          text='By duration' 
          setValue={setSort} 
          value='duration_sec'
        />
      </div>
      <div>
        <Button 
          text='ascending' 
          setValue={setDirection} 
          value={1}
        />
        <Button 
          text='descending' 
          setValue={setDirection} 
          value={-1}
        />
      </div>
      <JourneyTable result={result.data.allJourneys}/>
</div>
  )
}

export default JourneyList