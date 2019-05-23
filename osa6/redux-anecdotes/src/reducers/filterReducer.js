const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW_FILTER':
      return action.data.filter
    case 'EMPTY_FILTER':
      return ''
    default:
      return state
  }
}

const newFilter = (filter) => {
  return { type: 'NEW_FILTER', data: { filter: filter }}
}

const emptyFilter = () => {
  return { type: 'EMPTY_FILTER' }
}

export default filterReducer
export { newFilter, emptyFilter }