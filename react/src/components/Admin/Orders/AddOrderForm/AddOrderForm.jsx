import React, { useState, useEffect } from 'react'
import { Form, Image, Button, Dropdown } from 'semantic-ui-react'
import './AddOrderForm.scss'
import { useProducts } from '../../../../hooks/main'
import { map } from 'lodash'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export function AddOrderForm(props) {
  const { idTable, openCloseModal } = props
  const [productsFormat, setProductsFormat] = useState([])
  const { products, getProducts, getProductById } = useProducts()
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
      console.log('create order')
      console.log(formValue)
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
          <div className="add-order-form_list-product" key={index}>
            <Image src={product.image} size="tiny" />
            <span>{product.title}</span>
            <Button type="button" content="Delete Product" basic color="red" />
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
