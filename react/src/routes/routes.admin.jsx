import { AdminLayout } from '../layouts/main'
// import { LoginAdmin } from '../pages/Admin/main'
import {
  OrdersAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TablesAdmin,
  TableDetailsAdmin,
  PaymentsHistory,
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
  {
    path: '/admin/payments-history',
    layout: AdminLayout,
    component: PaymentsHistory,
  },
]

export default routesAdmin
