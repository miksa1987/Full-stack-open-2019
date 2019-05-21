import React from 'react'
import 'jest-dom/extend-expect'
import {render, cleanup} from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content correctly', () => {
  const blog = {
    author: 'Mika Laaksonen',
    title: 'Reactin testauksen taide',
    likes: 5
  }

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