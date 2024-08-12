
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AdminLayoutRoutes } from './admin-layout.routing';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { SidebarComponent } from '../../Shared/sidebar/sidebar.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CustomersComponent } from '../../customers/customers.component';
import { OrderService } from '../../services/order.service';
import { OrdersComponent } from '../../orders/orders.component';
import { SettingComponent } from '../../setting/setting.component';
import { SelfReceiveOrdersComponent } from '../../self-receive-orders/self-receive-orders.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProductsComponent } from '../../products/products.component';
import { ProductsizeComponent } from '../../products/productsize/productsize.component';
import { ProductcolorsComponent } from '../../products/productcolors/productcolors.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DiscountCodeComponent } from '../../discount-code/discount-code.component';
// import { ToastrModule } from 'ngx-toastr';
import * as jalaliMoment from "jalali-moment";
import { PersianCalendarService } from '../shared/PersianCalendarService';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NzDatePickerModule, NzDateAdapter } from 'ngz-shamsi-datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    FileUploadModule,
    DropdownModule,
    CheckboxModule,
    NzDatePickerModule,
    SweetAlert2Module.forRoot(),
    // NgbModule,
    // ClipboardModule,
  ],
  declarations: [
    // NavbarComponent,
    // SidebarComponent,
    DashboardComponent,
    CustomersComponent,
    OrdersComponent,
    SettingComponent,
    SelfReceiveOrdersComponent,
    ProductsComponent,
    ProductcolorsComponent,
    ProductsizeComponent,
    DiscountCodeComponent,
  ],
  providers: [DpDatePickerModule,],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AdminLayoutModule { }
