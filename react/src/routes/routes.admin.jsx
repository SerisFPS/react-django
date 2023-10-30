import { AdminLayout } from '../layouts/main'
// import { LoginAdmin } from '../pages/Admin/main'
import { HomeAdmin, UsersAdmin, CategoriesAdmin } from '../pages/Admin/main'

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
  {
    path: '/admin/categories',
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
]

export default routesAdmin
