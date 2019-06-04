import React from 'react'
import 'jest-dom/extend-expect'
import {render, cleanup, fireEvent} from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

const blog = {
  author: 'Mika Laaksonen',
  title: 'Reactin testauksen taide',
  likes: 5
}

afterEach(cleanup)

test('renders content correctly', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  const TitleAndAuthor = component.container.querySelector('.TitleAndAuthor')
  const Likes = component.container.querySelector('.Likes')

  expect(TitleAndAuthor).toHaveTextContent('Reactin testauksen taide')
  expect(TitleAndAuthor).toHaveTextContent('Mika Laaksonen')
  expect(Likes).toHaveTextContent('blog has 5 likes')

  component.debug()
})

test('Like button works as supposed', () => {
  const mockClicker = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockClicker} />
  )
  
  const likeButton = getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockClicker.mock.calls.length).toBe(2)
})