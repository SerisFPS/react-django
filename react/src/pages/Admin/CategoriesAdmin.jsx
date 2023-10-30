import React, { useEffect } from 'react'
import { HeaderPage } from '../../components/main'
import { useCategory } from '../../hooks/main'
import { Loader } from 'semantic-ui-react'

export function CategoriesAdmin() {
  const { loading, categories, getCategories } = useCategory()
  console.log(categories)
  useEffect(() => getCategories(), [])

  return (
    <>
      <HeaderPage title="categories title" btnTitle="new category" />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <h2>List of categories</h2>
      )}
    </>
  )
}
