import React from 'react'
import ReactDOM from 'react-dom'

const Header = ( { course } ) => {
    return (<div><h1>{course}</h1></div>)
}

const Part = ( { name, exercises }) => {
  return (<div><p>{name} {exercises}</p></div>)
}

const Content = () => {
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }
  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }
  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }

  return (<div>
    <Part name={part1.name} exercises={part1.exercises} />
    <Part name={part2.name} exercises={part2.exercises} />
    <Part name={part3.name} exercises={part3.exercises} />
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