import React from 'react'
import 'jest-dom/extend-expect'
import { render, waitForElement } from 'react-testing-library'
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
})