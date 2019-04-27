import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ( { text, value } ) => {
  return ( <div><p>{text} {value}</p></div>)
}

const Statistics = ( { good, neutral, bad, total, points } ) => {
  return ( <div>
    <h1>Statistiikka</h1>
    <Statistic text='hyvä' value={good} />
    <Statistic text='neutraali' value={neutral} />
    <Statistic text='huono' value={bad} />
    <Statistic text='yhteensä' value={total} />
    <Statistic text='keskiarvo' value={points / total} />
    <Statistic text='positiivisia' value={(good / total * 100) + '%'} />
  </div>)
}

const Button = ( { click, text } ) => {
  return (<><button onClick={click}>{text}</button></>)
}

const App = () => {
  const [good, setGood]         = useState(0)
  const [neutral, setNeutral]   = useState(0)
  const [bad, setBad]           = useState(0)
  const [total, setTotal]       = useState(0)
  const [points, setPoints]     = useState(0)

  const clickGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setPoints(points + 1)
  }

  const clickNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const clickBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setPoints(points - 1)
  }

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button click={clickGood} text='hyvä' />
      <Button click={clickNeutral} text='neutraali' />
      <Button click={clickBad} text='huono' />
      {total === 0 ? <p>Ei yhtään palautetta annettu.</p>
      : <Statistics good={good} neutral={neutral} bad={bad}
      total={total} points={points} /> }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
