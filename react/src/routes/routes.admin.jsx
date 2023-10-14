import { AdminLayout } from '../layouts/main'
import { LoginAdmin } from '../pages/Admin/main'

const routesAdmin = [
  {
    path: '/admin',
    layout: AdminLayout,
    component: LoginAdmin,
  },
]

export default routesAdmin
