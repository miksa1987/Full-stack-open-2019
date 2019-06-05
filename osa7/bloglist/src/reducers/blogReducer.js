import blogService from '../services/blogs'

const compareBlogs = (blog1, blog2) => {
  if(blog1.likes !== blog2.likes) return blog2.likes - blog1.likes

  return blog1.title > blog2.title
}

const blogReducer = (state = [], action) => {
  console.log(action.data)
  console.log(action.type)
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      const newBlogs = [ ...state, action.data ]
      console.log(newBlogs)
      return newBlogs.sort(compareBlogs)
    default:
      return state
  }
}

export const init = (blogs) =>  {
  return { type: 'INIT_BLOGS', data: blogs }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    //blogs.sort(compareBlogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs 
    })
  }
}

export const createBlog = (blogToBeAdded) => {
  return async dispatch => {
    const blog = await blogService.createNew(blogToBeAdded)
    dispatch({ type: 'ADD_BLOG', data: blog })
  }
}

export default blogReducer