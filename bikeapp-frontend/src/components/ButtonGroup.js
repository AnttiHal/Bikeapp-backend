import Button from "./Button"

const ButtonGroup = ({setSort, setDirection}) => {
  return (
    <div>
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
    </div>
  )
}

export default ButtonGroup