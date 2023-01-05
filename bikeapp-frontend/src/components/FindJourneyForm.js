const FindJourneyForm = ({handleClearClick, handleSearchClick, handleSubmit, departureStationNameToSearch}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search journeys:
          <input 
            type="text" 
            value={departureStationNameToSearch}
            onChange={handleSearchClick}
          />
        </label>
        <button type="submit">Search</button>
        <button type="text" onClick={handleClearClick}>Clear</button>
      </form>
    </div>
  )
}

export default FindJourneyForm