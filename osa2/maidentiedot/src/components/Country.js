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

const Expandedcountry = ( { country }) => (
    <div><h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        <img src={country.flag} alt="This is a flag" width="150" height="120" /></div>
)

export default Country