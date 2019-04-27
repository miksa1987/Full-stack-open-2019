import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0,0,0,0,0])
  const [mostVoted, setMostVoted] = useState(0) // Laitetaan nyt oletuksena ensimmäinen äänestetyimmäksi. Yksinkertaisuuden vuoksi.
 
  const getRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected]++
    setPoints(newPoints)
    
    if(points[selected] >= points[mostVoted]) {
      console.log('new best!')
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={getRandom}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVoted]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Good judgment comes from experience, and experience comes from bad judgment.',
  'If something is worth doing once, its worth building a tool to do it.',
  'If you cannot grok the overall structure of a program while taking a shower, you are not ready to code it. ',
  'Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.',
  'Every big computing disaster has come from taking too many ideas and putting them in one place.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)