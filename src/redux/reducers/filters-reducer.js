const initialState = {
  category: null,
  sortBy: {
    type: 'popular',
    order: 'desc',
  },
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filters/set_sort_by':
      return {
        ...state,
        sortBy: action.payload,
      }

    case 'filters/set_category':
      return {
        ...state,
        category: action.payload,
      }

    default:
      return state
  }
}

export default filtersReducer
