import { AdminLayout } from '../layouts/main'
// import { LoginAdmin } from '../pages/Admin/main'
import {
  HomeAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
} from '../pages/Admin/main'

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
  {
    path: '/admin/products',
    layout: AdminLayout,
    component: ProductAdmin,
  },
]

export default routesAdmin
