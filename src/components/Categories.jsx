import PropTypes from 'prop-types'
import React from 'react'

const Categories = React.memo(({ activeCategory, items, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null || undefined ? 'active' : ''}
          onClick={() => onClickCategory(null)}
        >
          Все
        </li>
        {items.map((item, index) => (
          <li
            className={activeCategory === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}
            key={`${item}_${index}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
})

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]).isRequired,

  onClickCategory: PropTypes.func.isRequired,
}

Categories.defaultProps = { activeCategory: null, items: [] }

export default Categories
