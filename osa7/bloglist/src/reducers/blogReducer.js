import blogService from '../services/blogs'

const compareBlogs = (blog1, blog2) => {
  if(blog1.likes !== blog2.likes) return blog2.likes - blog1.likes

  return blog1.title > blog2.title
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      const newBlogs = [ ...state, action.data ]
      console.log(newBlogs)
      return newBlogs.sort(compareBlogs)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'UPDATE_BLOG':
      const updatedBlog = action.data
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        .sort(compareBlogs)
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

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({ type: 'REMOVE_BLOG', data: { id }})
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog.id, blog)
    dispatch({ type: 'UPDATE_BLOG', data: blog })
  }
}

export default blogReducer