import axios from 'axios'

export const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch({
    type: 'pizzas/set_loaded',
    payload: false,
  })
  axios
    .get(
      `http://localhost:3001/pizzas?${
        category !== null ? `category=${category}` : ''
      }&_sort=${sortBy.type}&_order=${sortBy.order}`
    )
    .then(({ data }) => {
      dispatch(setPizzas(data))
    })
}

export const setPizzas = (items) => ({
  type: 'pizzas/set_pizzas',
  payload: items,
})
