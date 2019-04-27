import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
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
      <button onClick={clickGood} >Hyvä</button>
      <button onClick={clickNeutral} >Neutraali</button>
      <button onClick={clickBad} >Huono</button>
      <h1>Statistiikka</h1>
      <p>hyvä {good}</p>
      <p>neutraali {neutral}</p>
      <p>huono {bad}</p>
      <p>yhteensä {total}</p>
      <p>keskiarvo {total === 0 ? 0 : points / total}</p>
      <p>positiivisia {total === 0 ? 0 : good / total * 100} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
