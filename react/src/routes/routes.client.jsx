import { ClientLayout } from '../layouts/main'
import { Home } from '../pages/Client/main'
import { Error404 } from '../pages/Error404'

const routesClient = [
  {
    path: '/',
    layout: ClientLayout,
    component: Home,
  },
]

export default routesClient
