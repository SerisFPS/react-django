import { ClientLayout, BasicLayout } from '../layouts/main'
import { SelectTable } from '../pages/Client/main'

const routesClient = [
  {
    path: '/',
    layout: BasicLayout,
    component: SelectTable,
  },
]

export default routesClient
