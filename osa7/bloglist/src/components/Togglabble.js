import React, {useState, useImperativeHandle} from 'react'
import { Button, Segment } from 'semantic-ui-react'

// Huom. tää on aika pitkälti ulkomuistista kirjoitettua, vain vähän katsottu mallikoodia
const Togglabble = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisible = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  return ( <div>
    <div style={showWhenVisible}>
      <Segment>{props.children}
      <Button onClick={toggleVisible}>Cancel</Button></Segment>
    </div>
    <div style={hideWhenVisible}><Button onClick={toggleVisible}>{props.buttonText}</Button></div>
  </div> )
})

export default Togglabble