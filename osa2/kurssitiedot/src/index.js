import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
  <h1>{props.name}</h1>

const Total = props => {
  const total = props.parts.reduce((total, { exercises }) => total + exercises, 0 )

  return <p>yhteensä {total} tehtävää</p>
}
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
  <div>
    {props.parts.map(part => <Part part={part} key={part.name}/>)}
    <Total parts={props.parts} />
  </div>
)

const Course = props => (
  <div>
    <Header name={props.course.name} />
    <Content parts={props.course.parts} />
  </div>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header name='Opetusohjelma' />
      {courses.map(course => <Course course={course} key={course.id}/>)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)