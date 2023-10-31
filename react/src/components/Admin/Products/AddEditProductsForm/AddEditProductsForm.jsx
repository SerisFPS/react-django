import React, { useEffect, useState } from 'react'
import { Form, Image, Button, Dropdown, Checkbox } from 'semantic-ui-react'
import { map } from 'lodash'
import './AddEditProductsForm.scss'
import { useCategory } from '../../../../hooks/main'

export function AddEditProductsForm() {
  const { categories, getCategories } = useCategory()
  const [categoriesFormat, setCategoriesFormat] = useState([])

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories))
  }, [categories])

  return (
    <Form className="add-edit-product-form">
      <Form.Input name="title" placeholder="product name" />
      <Form.Input type="number" name="price" placeholder="25" />
      <Dropdown
        placeholder="product category"
        fluid
        selection
        search
        options={categoriesFormat}
      />
      <div className="add-edit-product-form__active">
        <Checkbox toggle />
        Active Product
      </div>

      <Button type="button" fluid>
        upload image
      </Button>

      <Button type="submit" primary fluid content="create" />
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
