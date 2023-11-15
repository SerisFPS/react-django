import React from 'react'
import { Image } from 'semantic-ui-react'
import { map } from 'lodash'
import { useNavigate, useLocation } from 'react-router-dom'
import './ListCategories.scss'

export function ListCategories(props) {
  const { categories } = props
  const location = useLocation()
  const navigate = useNavigate()

  // console.log(location)

  const goToLocation = (id) => {
    const newLocation = `${location.pathname}/${id}`
    navigate(newLocation)
  }
  const goToCategory = (id) => {
    goToLocation(id)
  }

  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <div
          key={category.id}
          className="list-categories-client__category"
          onClick={() => goToCategory(category.id)}
        >
          <Image src={category.image} size="small" />
          <span>{category.title}</span>
        </div>
      ))}
    </div>
  )
}
