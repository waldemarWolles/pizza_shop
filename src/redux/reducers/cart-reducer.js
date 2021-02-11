const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
}

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0)

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.')
  return keys.reduce((val, key) => {
    return val[key]
  }, obj[firstKey])
}

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path)
    return sum + value
  }, 0)
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'cart/add_pizza_cart': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload]

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      }

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = getTotalSum(newItems, 'totalPrice')

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }

    case 'cart/remove_cart_item': {
      const newItems = {
        ...state.items,
      }
      const currentTotalPrice = newItems[action.payload].totalPrice
      const currentTotalCount = newItems[action.payload].items.length
      delete newItems[action.payload]
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      }
    }

    case 'cart/plus_cart_item': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ]
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      }

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = getTotalSum(newItems, 'totalPrice')

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }

    case 'cart/minus_cart_item': {
      const oldItems = state.items[action.payload].items
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      }

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = getTotalSum(newItems, 'totalPrice')

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }

    case 'cart/clear_cart':
      return { totalPrice: 0, totalCount: 0, items: {} }

    default:
      return state
  }
}

export default cartReducer
