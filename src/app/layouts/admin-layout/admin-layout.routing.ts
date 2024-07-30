import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { OrdersComponent } from '../../orders/orders.component';
import { CustomersComponent } from '../../customers/customers.component';
import { SelfReceiveOrdersComponent } from '../../self-receive-orders/self-receive-orders.component';
import { ProductsComponent } from '../../products/products.component';
import { ProductcolorsComponent } from '../../products/productcolors/productcolors.component';
import { ProductsizeComponent } from '../../products/productsize/productsize.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'orders',      component: OrdersComponent },
    { path: 'customers',      component: CustomersComponent },
    { path: 'srorder',      component: SelfReceiveOrdersComponent },
    { path: 'products',      component:     ProductsComponent },
    { path: 'color',      component:     ProductcolorsComponent },
    { path: 'size',      component:     ProductsizeComponent },
];
