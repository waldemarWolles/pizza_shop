const initialState = {
  items: [],
  isLoaded: false,
}

const pizzasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'pizzas/set_pizzas':
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      }
    case 'pizzas/set_loaded':
      return {
        ...state,
        isLoaded: action.payload,
      }

    default:
      return state
  }
}

export default pizzasReducer
