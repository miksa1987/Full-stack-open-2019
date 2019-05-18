import React, {useState, useImperativeHandle} from 'react'

// Huom. tää on aika pitkälti ulkomuistista kirjoitettua, vain vähän katsottu mallikoodia
const Togglabble = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisible = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => {
    return toggleVisible
  })

  return ( <div>
    <div style={showWhenVisible}>
      {props.children}
      <button onClick={toggleVisible}>Cancel</button>
    </div>
    <div style={hideWhenVisible}><button onClick={toggleVisible}>{props.buttonText}</button></div>
  </div> )
})

export default Togglabble