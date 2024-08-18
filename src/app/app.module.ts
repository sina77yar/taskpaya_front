import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './layouts/components.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TabaInterceptor } from './Utilities/TabaInterceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CookieService } from 'ngx-cookie-service';
import { ProductcolorsComponent } from './products/productcolors/productcolors.component';
import { ProductsizeComponent } from './products/productsize/productsize.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { DiscountCodeComponent } from './discount-code/discount-code.component';
import { DpDatePickerModule } from 'ng2-jalali-date-picker/date-picker.module';
import { ContactussettingComponent } from './setting/contactussetting/contactussetting.component';
import { KendoJalaliDateInputsModule } from '@tiampersian/kendo-jalali-date-inputs'
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    AdminLayoutModule,
    KendoJalaliDateInputsModule, QuillModule.forRoot(),
  ],
  providers: [CommonModule,
    CookieService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TabaInterceptor,
      multi: true
    }, provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
