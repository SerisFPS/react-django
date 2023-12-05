import React, { useState, useEffect } from 'react'
import { Form, Image, Button, Dropdown } from 'semantic-ui-react'
import './AddOrderForm.scss'
import { useProducts, useOrders } from '../../../../hooks/main'
import { map } from 'lodash'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export function AddOrderForm(props) {
  const { idTable, openCloseModal, onRefetchOrders } = props
  const [productsFormat, setProductsFormat] = useState([])
  const { products, getProducts, getProductById } = useProducts()
  const { addOrderToTable } = useOrders()
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    setProductsFormat(formatDropdownData(products))
  }, [products])

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      for await (const idProduct of formValue.products) {
        addOrderToTable(idTable, idProduct)
      }
      onRefetchOrders()
      openCloseModal()
    },
  })

  useEffect(() => {
    addProductList()
  }, [formik.values])

  const addProductList = async () => {
    try {
      const productsId = formik.values.products
      const arrayTemporal = []
      for await (const idProduct of productsId) {
        const response = await getProductById(idProduct)
        // console.log(idProduct)
        arrayTemporal.push(response)
      }
      setProductsData(arrayTemporal)
    } catch (error) {
      console.log(error)
    }
  }

  const removeProductList = (index) => {
    const idProducts = [...formik.values.products]
    idProducts.splice(index, 1)
    formik.setFieldValue('products', idProducts)
  }
  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
      <Dropdown
        placeholder="products"
        fluid
        selection
        search
        options={productsFormat}
        value={null}
        onChange={(_, data) =>
          formik.setFieldValue('products', [
            ...formik.values.products,
            data.value,
          ])
        }
      />

      <div className="add-order-form__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <Button
              type="button"
              content="Delete"
              basic
              color="red"
              onClick={() => removeProductList(index)}
            />
          </div>
        ))}
      </div>
      <Button primary fluid type="submit" content="add products to table" />
    </Form>
  )
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }))
}

function initialValues() {
  return {
    products: [],
  }
}

function validationSchema() {
  return {
    products: Yup.array().require(true),
  }
}
