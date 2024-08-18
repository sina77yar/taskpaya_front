
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
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
import moment, * as jalaliMoment from "jalali-moment";
import { PersianCalendarService } from '../shared/PersianCalendarService';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NzDatePickerModule, } from 'ngz-shamsi-datepicker';
import { ContactussettingComponent } from '../../setting/contactussetting/contactussetting.component';
import { CandyDateMode, NzDateAdapter, WeekDayIndex } from 'ngx-antd-jalali/core';
import { Locale } from 'date-fns';
import { KendoJalaliDateInputsModule } from '@tiampersian/kendo-jalali-date-inputs';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { QuillModule } from 'ngx-quill';
import { SafeHTMLPipe } from '../../Utilities/replace-all.pipe';
import {GalleriaModule} from 'primeng/galleria';
import {CarouselModule} from 'primeng/carousel';
@NgModule({
  imports: [
    QuillModule.forRoot(),
    CommonModule,
    EditorModule,
    CalendarModule,
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
    KendoJalaliDateInputsModule,
    GalleriaModule,
    CarouselModule,
    SweetAlert2Module.forRoot(),
    // NgbModule,
    // ClipboardModule,
  ],
  declarations: [SafeHTMLPipe,
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
    ContactussettingComponent,
  ],
  providers: [DatePipe, SafeHTMLPipe],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AdminLayoutModule { }
