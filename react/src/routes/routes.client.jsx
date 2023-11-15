import { ClientLayout, BasicLayout } from '../layouts/main'
import { SelectTable, Categories } from '../pages/Client/main'

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
]

export default routesClient
