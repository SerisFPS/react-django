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
  const { loading, products, getProducts, deleteProduct } = useProducts()
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    getProducts()
  }, [refetch])

  useEffect(() => {
    getProducts()
  }, [])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addProduct = () => {
    setTitleModal('new product')
    setContentModal(
      <AddEditProductsForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  const updateProduct = (data) => {
    setTitleModal('update product')
    setContentModal(
      <AddEditProductsForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    )
    openCloseModal()
  }
  const onDeleteProduct = async (data) => {
    const result = window.confirm(`Delete product ${data.title} ?`)
    if (result) {
      await deleteProduct(data.id)
      onRefetch()
    }
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
        <TableProductsAdmin
          products={products}
          updateProduct={updateProduct}
          deleteProduct={onDeleteProduct}
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
