import { AdminLayout } from '../layouts/main'
// import { LoginAdmin } from '../pages/Admin/main'
import { HomeAdmin } from '../pages/Admin/main'

const routesAdmin = [
  {
    path: '/admin',
    layout: AdminLayout,
    component: HomeAdmin,
  },
]

export default routesAdmin
