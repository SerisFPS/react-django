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
  const { loading, categories, getCategories } = useCategory() // destructure category hook data

  // fetch data
  useEffect(() => {
    getCategories()
  }, [])

  // Modal useStates and functions
  const [titleModal, setTitleModal] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [contentModal, setContentModal] = useState(null)

  // openCloseModal(onClose) -> set inverse value on call
  const openCloseModal = () => setShowModal((prev) => !prev)

  const addCategory = () => {
    setTitleModal('new category')
    setContentModal(<AddEditCategoryForm />)
    openCloseModal()
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
        <TableCategoryAdmin categories={categories} />
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
