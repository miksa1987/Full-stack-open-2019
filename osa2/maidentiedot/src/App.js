import React, { useEffect, useState } from 'react';
import axios from 'axios'

import Country from './components/Country'

const FilteredCountries = (props) => {
  const countryList = props.countries.filter(country => country.name.toLowerCase().includes(props.filter))
    .map(country => <Country key={country.name} country={country} />)

  console.log(countryList[0])
  return (
  <div>
    {countryList.length > 10 ? <p>Too many matches, specify another filter</p> : countryList}
  </div>
)}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)})
  }, [])

  const searchChange = (event) => {
    setFilter(event.target.value)
  }

  console.log(countries)
  return ( <div>
    find countries<input name='finder' onChange={searchChange} />
    <FilteredCountries key='FILTERED' filter={filter} countries={countries} />
  </div>)
}

export default App