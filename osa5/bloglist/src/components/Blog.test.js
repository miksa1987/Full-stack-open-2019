import React from 'react'
import 'jest-dom/extend-expect'
import {render, cleanup, fireEvent} from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

const blog = {
  author: 'Mika Laaksonen',
  title: 'Reactin testaus',
  url: 'www.reactintestaus.fi',
  likes: 10
}

test('Blog renders correctly', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Reactin testaus')
  expect(component.container).toHaveTextContent('Mika Laaksonen')
})

test('Blog renders correctly after expanding', () => {
  const mockClicker = jest.fn()
  
  const component = render(
    <Blog blog={blog} />
  )

  const element = component.container.querySelector('div')
  fireEvent.click(element)
  component.debug()

  expect(component.container).toHaveTextContent('Reactin testaus')
  expect(component.container).toHaveTextContent('Mika Laaksonen')
  expect(component.container).toHaveTextContent('www.reactintestaus.fi')
  expect(component.container).toHaveTextContent('10 likes')
})