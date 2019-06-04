const blogs = [
  {
    title: 'Testaus',
    author: 'M. Laaksonen',
    url: 'www.test.com',
    likes: 5,
    id: '2424242566',
    user: {
      name: 'M. Laaksonen',
      username: 'mlaaksonen',
      _id: '9578ryfu467edud5436'
    }
  },
  {
    title: 'Testing',
    author: 'M. Laaksonen',
    url: 'www.test2.com',
    likes: 5,
    id: 'fse343423q4på24',
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
    id: '315f00qka+13234',
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