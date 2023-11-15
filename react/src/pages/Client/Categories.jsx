import React, { useEffect } from 'react'
import { useCategory } from '../../hooks/main'
import { ListCategories } from '../../components/main'
export function Categories() {
  const { loading, categories, getCategories } = useCategory()

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>
      <h3>Categories</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <ListCategories categories={categories} />
      )}
    </div>
  )
}
