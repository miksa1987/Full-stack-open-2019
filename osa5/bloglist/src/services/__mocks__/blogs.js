const blogs = [
  {
    title: 'Testaus',
    author: 'M. Laaksonen',
    url: 'www.test.com',
    likes: 5,
    user: {
      name: 'M. Laaksonen',
      username: 'mlaaksonen',
      _id: '9578ryfu467edud5436'
    }
  },
  {
    title: 'Testaus 2',
    author: 'M. Laaksonen',
    url: 'www.test2.com',
    likes: 5,
    user: {
      name: 'M. Laaksonen',
      username: 'mlaaksonen',
      _id: '9578ryfu467edud5436'
    }
  },
  {
    title: 'No imagination',
    author: 'M. Laaksonen',
    url: 'www.noimagination.com',
    likes: 5,
    user: {
      name: 'M. Laaksonen',
      username: 'mlaaksonen',
      _id: '9578ryfu467edud5436'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }