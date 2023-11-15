import { ClientLayout, BasicLayout } from '../layouts/main'
import { SelectTable, Categories, Products } from '../pages/Client/main'

const routesClient = [
  {
    path: '/',
    layout: BasicLayout,
    component: SelectTable,
  },
  {
    path: '/client/:tableNumber',
    layout: ClientLayout,
    component: Categories,
  },
  {
    path: '/client/:tableNumber/:idCategory',
    layout: ClientLayout,
    component: Products,
  },
]

export default routesClient
