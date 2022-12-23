import { gql } from '@apollo/client'

export const ALL_JOURNEYS_WITH_LIMIT = gql`
  query($limit: Int, $offset: Int) {
    allJourneys(limit: $limit, offset: $offset)  {
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

export const FIND_JOURNEY = gql`
  query($departureStationNameToSearch: String!) {
    findJourney(name: $departureStationNameToSearch) {
      _id
      departure_station_name
      return_station_name
      covered_distance_m
      duration_sec
    }
  }
`

export const JOURNEY_COUNT = gql`
  query {
    journeyCount
  }
`