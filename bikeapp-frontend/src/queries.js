import { gql } from '@apollo/client'

export const ALL_JOURNEYS_WITH_LIMIT = gql`
  query($limit: Int, $offset: Int, $sort: String, $direction: Int) {
    allJourneys(
      limit: $limit, 
      offset: $offset, 
      sort: $sort,
      direction: $direction
      )  {
      _id
      departure_station_name
      return_station_name
      covered_distance_m
      duration_sec
    }
  }
`

export const ALL_STATIONS = gql`
  query {
    allStations {
      name
      address
    }
  }
`

export const JOURNEY_COUNT_FROM_CERTAIN_STATION = gql`
  query($stationNameToSearch: String){
    JourneyCountFromCertainStation(departure_station_name: $stationNameToSearch)
  }
`

export const FIND_JOURNEYS_BY_DEPARTURE_STATION_NAME = gql`
  query(
    $departureStationNameToSearch: String, 
    $limit: Int, 
    $offset: Int
    $sort: String, 
    $direction: Int
    ){
    findJourneysByDepartureStationName(
      departure_station_name: $departureStationNameToSearch, 
      limit: $limit, 
      offset: $offset,
      sort: $sort
      direction: $direction
      ) {
      _id
      departure_station_name
      return_station_name
      covered_distance_m
      duration_sec
    }
  }
`

export const JOURNEY_COUNT_TO_CERTAIN_STATION = gql`
  query($stationNameToSearch: String){
    JourneyCountFromCertainStation(return_station_name: $stationNameToSearch)
  }
`

export const FIND_STATION = gql`
  query($stationNameToSearch: String!) {
    findStation(name: $stationNameToSearch) {
      _id
      name
      address
      x
      y
    }
  }
`


export const JOURNEY_COUNT = gql`
  query {
    journeyCount
  }
`