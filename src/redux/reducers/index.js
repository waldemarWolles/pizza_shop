import pizzasReducer from './pizzas-reducer'
import filtersReducer from './filters-reducer'
import { combineReducers } from 'redux'
import cartReducer from './cart-reducer'

const rootReducer = combineReducers({
  filters: filtersReducer,
  pizzas: pizzasReducer,
  cart: cartReducer,
})

export default rootReducer
