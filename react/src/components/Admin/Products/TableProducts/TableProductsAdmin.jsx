import React from 'react'
import { Table, Image, Button, Icon } from 'semantic-ui-react'
import { map } from 'lodash'
import './TableProductsAdmin.scss'

export function TableProductsAdmin(props) {
  const { products, updateProduct, deleteProduct } = props

  return (
    <Table className="table-products-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Image</Table.HeaderCell>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Active</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(products, (product, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={product.image} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>{product.price} $</Table.Cell>
            <Table.Cell>{product.category_data.title}</Table.Cell>
            <Table.Cell className="status">
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Actions
              product={product}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

// actions component
function Actions(props) {
  const { product, updateProduct, deleteProduct } = props

  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateProduct(product)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => deleteProduct(product)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  )
}
