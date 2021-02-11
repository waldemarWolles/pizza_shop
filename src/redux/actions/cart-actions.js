export const addPizzaToCart = (pizzaObj) => ({
  type: 'cart/add_pizza_cart',
  payload: pizzaObj,
})

export const clearCart = () => ({
  type: 'cart/clear_cart',
})

export const removeCartItem = (id) => ({
  type: 'cart/remove_cart_item',
  payload: id,
})

export const plusCartItem = (id) => ({
  type: 'cart/plus_cart_item',
  payload: id,
})

export const minusCartItem = (id) => ({
  type: 'cart/minus_cart_item',
  payload: id,
})
