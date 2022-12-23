import { useQuery } from '@apollo/client'
import './App.css'
import JourneyList from './components/JourneyList'
import StationList from './components/StationList'
import { 
  ALL_STATIONS, 
  JOURNEY_COUNT
} from './queries'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"


  const App = () => {
    
    
    const count = useQuery(JOURNEY_COUNT)
    const allStations = useQuery(ALL_STATIONS)
    
    
  
    
    if (count.loading || allStations.loading )  {
      return <div>loading...</div>
    }

    
    return (
      <Router>
        <div>
          <Link to="/">home</Link>
          <Link to="/journeys">Journeys</Link>
          <Link to="/stations">Stations</Link>
        </div>

        <Routes>
          <Route path="/journeys" element={
            <div>
              
              <JourneyList/>
            </div>}/>
          <Route path="/stations" element={<StationList stationData={allStations.data} />} />
          <Route path="/" element={
            <div>
              <h1>Helsinki city bike app</h1>
            </div>} />
        </Routes>
      </Router>
    )
  }
  
  export default App