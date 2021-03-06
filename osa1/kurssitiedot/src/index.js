import React from 'react'
import ReactDOM from 'react-dom'

const Header = ( { course } ) => {
    return (<div><h1>{course}</h1></div>)
}

const Part = ( { name, exercises }) => {
  return (<div><p>{name} {exercises}</p></div>)
}

const Content = ( { parts }) => {
  return (<div>
    <Part name={parts[0].name} exercises={parts[0].exercises} />
    <Part name={parts[1].name} exercises={parts[1].exercises} />
    <Part name={parts[2].name} exercises={parts[2].exercises} />
  </div>)
}

const Total = ( { total } ) => {
    return (<div><p>yhteensä {total} tehtävää</p></div>)
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))