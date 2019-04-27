import React from 'react'
import ReactDOM from 'react-dom'

const Header = ( { course } ) => {
    return (<div><h1>{course}</h1></div>)
}

const Content = () => {
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (<div>
    <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
  </div>)
}

const Total = ( { total } ) => {
    return (<div><p>yhteensä {total} tehtävää</p></div>)
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total total='31' />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))