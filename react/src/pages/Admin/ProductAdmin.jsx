import React, { useEffect, useState } from 'react'
import {
  HeaderPage,
  TableProductsAdmin,
  AddEditProductsForm,
} from '../../components/main'
import { useProducts } from '../../hooks/main'
import { Loader } from 'semantic-ui-react'
import { BasicModal } from '../../components/Common/main'
export function ProductAdmin() {
  const { loading, products, getProducts } = useProducts()
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)

  useEffect(() => {
    getProducts()
  }, [])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const addProduct = () => {
    setTitleModal('new product form')
    setContentModal(<AddEditProductsForm onClose={openCloseModal} />)
    openCloseModal()
  }

  return (
    <>
      <HeaderPage
        title="Products Admin"
        btnTitle="new product"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TableProductsAdmin products={products} />
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
