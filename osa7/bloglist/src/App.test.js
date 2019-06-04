import React from 'react'
import 'jest-dom/extend-expect'
import { render, waitForElement, wait, waitForDomChange } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('renders login form by default if no one is logged on', () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    expect(component.container).toHaveTextContent('Log in to application')
  })

  test('renders all blogs if user is logged in', async () => {
    const user = {
      username: 'mlaaksonen',
      name: 'M. Laaksonen'
    }

    window.localStorage.setItem('user', JSON.stringify(user))
    const component = render(
      <App />
    )

    component.rerender(<App/>)
    
    //await waitForElement(() => component.container.querySelector('.Blog')) Ei toimi!
    await waitForDomChange({ container: component.container })
    
    component.debug()
    
    expect(component.container).toHaveTextContent('M. Laaksonen logged in')
    expect(component.container).toHaveTextContent('Testaus')
    expect(component.container).toHaveTextContent('Testing')
    expect(component.container).toHaveTextContent('No imagination')
  })
})