import React from 'react'

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

export default { Course, Header }
