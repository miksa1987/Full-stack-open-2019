import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Country = ( {country } ) => {
    const [expanded, setExpanded] = useState(false)

    return (<div>
        {expanded === false ?
        <div>{country.name}<button onClick={() => setExpanded(true)}>show</button></div>
        : <div><Expandedcountry country={country} /><button onClick={() => setExpanded(false)}>hide</button></div>}
    </div>)
}

const Expandedcountry = ( { country } ) => (
    <div><h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        <img src={country.flag} alt="This is a flag" width="150" height="120" />
        <Weather country={country} /></div>
)

const Weather = ( { country } ) => {
    const [weather, setWeather] = useState('')

    useEffect(() => {
      axios
        .get(`http://api.apixu.com/v1/forecast.json?key=77ea98992087490d932135322190804&q=${country.capital}`)
        .then(response => setWeather(response.data))
        .catch(error => { return ( <div><h3>Shit, weather fetching failed.</h3></div> ) } )
    }, [])

    if(weather) {
      return (<div>
      <h3>Weather in {country.capital}</h3>
      <p><strong>Temperature </strong>{weather.current.temp_c} celsius</p>
      <img src={weather.current.condition.icon} width="100" height="75" alt="Weather icon" />
      <p><strong>wind </strong>{weather.current.win_kph} {weather.current.wind_dir}</p>
      </div>)
    } else {
      return null
    }
}

export default Country
