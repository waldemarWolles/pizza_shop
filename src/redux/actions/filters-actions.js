export const setSortBy = (name) => ({
  type: 'filters/set_sort_by',
  payload: name,
})

export const setCategory = (indexCat) => ({
  type: 'filters/set_category',
  payload: indexCat,
})
