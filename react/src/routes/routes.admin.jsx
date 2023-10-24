import { AdminLayout } from '../layouts/main'
// import { LoginAdmin } from '../pages/Admin/main'
import { HomeAdmin, UsersAdmin } from '../pages/Admin/main'

const routesAdmin = [
  {
    path: '/admin',
    layout: AdminLayout,
    component: HomeAdmin,
  },
  {
    path: '/admin/users',
    layout: AdminLayout,
    component: UsersAdmin,
  },
]

export default routesAdmin
