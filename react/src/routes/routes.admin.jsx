import { AdminLayout } from '../layouts/main'
// import { LoginAdmin } from '../pages/Admin/main'
import {
  OrdersAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TablesAdmin,
  TableDetailsAdmin,
} from '../pages/Admin/main'

const routesAdmin = [
  {
    path: '/admin',
    layout: AdminLayout,
    component: OrdersAdmin,
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
  {
    path: '/admin/tables',
    layout: AdminLayout,
    component: TablesAdmin,
  },
  {
    path: '/admin/table/:id',
    layout: AdminLayout,
    component: TableDetailsAdmin,
  },
]

export default routesAdmin
