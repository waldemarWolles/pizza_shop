import React, { useCallback, useEffect } from 'react'
import {
  Categories,
  PizzaBlock,
  SortPopup,
  PizzaLoadingBlock,
} from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory, setSortBy } from '../redux/actions/filters-actions'
import { fetchPizzas } from '../redux/actions/pizzas-actions'
import { addPizzaToCart } from '../redux/actions/cart-actions'

const Home = () => {
  const pizzas = useSelector((state) => state.pizzas.items)
  const isLoaded = useSelector((state) => state.pizzas.isLoaded)
  const { category, sortBy } = useSelector((state) => state.filters)
  const cartItems = useSelector((state) => state.cart.items)

  console.log(cartItems)

  const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  const sortItems = [
    { name: 'popular', type: 'popular', order: 'desc' },
    { name: 'price', type: 'price', order: 'desc' },
    { name: 'alphabet', type: 'name', order: 'asc' },
  ]

  const dispatch = useDispatch()

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index))
  }, [])

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type))
  }, [])

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj))
  }

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [category, sortBy])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categories}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoaded
          ? pizzas.map((obj) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                inCartAddedCount={
                  cartItems[obj.id] && cartItems[obj.id].items.length
                }
                {...obj}
              />
            ))
          : Array(10)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  )
}

export default Home
