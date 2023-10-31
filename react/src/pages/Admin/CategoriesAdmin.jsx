import React, { useEffect, useState } from 'react'
import {
  AddEditCategoryForm,
  HeaderPage,
  TableCategoryAdmin,
} from '../../components/main'
import { useCategory } from '../../hooks/main'
import { Loader } from 'semantic-ui-react'
import { BasicModal } from '../../components/main'

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)
  const { loading, categories, getCategories, deleteCategory } = useCategory() // destructure category hook data

  useEffect(() => {
    getCategories()
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addCategory = () => {
    setTitleModal('new category')
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  const updateCategory = (data) => {
    setTitleModal('update category')
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    )
    openCloseModal()
  }

  const onDeleteCategory = async (data) => {
    const result = window.confirm(`Delete category ${data.title}`)
    if (result) {
      try {
        await deleteCategory(data.id)
        onRefetch()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <HeaderPage
        title="categories title"
        btnTitle="new category"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
          onDeleteCategory={onDeleteCategory}
        />
      )}

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  )
}
