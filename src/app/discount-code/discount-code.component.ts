import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ImagePath } from '../Utilities/PathTools';
import { ProductService } from '../services/product.service';
import moment from 'jalali-moment';
import { NzI18nService, en_US, fa_IR } from 'ngz-shamsi-datepicker';
import { OrderService } from '../services/order.service';
import { format } from 'date-fns-jalali';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrl: './discount-code.component.scss'
})
export class DiscountCodeComponent implements OnInit {
  ranges = { "امروز": [new Date(), new Date()], 'این ماه': [new Date(), new Date()] };
  isPersian = false;
  constructor(private orderService: OrderService, private i18n: NzI18nService) { this.i18n.setLocale(this.isPersian ? fa_IR : fa_IR); }

  dataitems: any[] = [];
  imagePath = ImagePath
  visible: boolean = false
  visibleEdit: boolean = false
  ColorName: string;
  EditColorName: string;
  selectedItemId: number;
  @ViewChild('emptyField')
  public readonly emptyField: SwalComponent;
  @ViewChild('successFire')
  public readonly successFire: SwalComponent;
  editForm: FormGroup;
  dateObject = "";
  ngOnInit(): void {
    // this.dateObject = moment('1395-11-22', 'jYYYY,jMM,jDD');
    this.editForm = new FormGroup({
      colorName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),

    })
    this.GetData();
  }
  GetData() {
    this.orderService.GetAllDiscountCode().subscribe(res => {
      console.log(this.dataitems);
      this.dataitems = res.data;

      this.dataitems.forEach(item => {
        item.expireDate = format(new Date(item.expireDate), "yyyy/MM/dd");
      });

    })
  }
  SubmitNewColor() {
    if (this.ColorName.split(' ').join('') == "") {
      this.emptyField.fire();
      return
    } else {
      // this.productService.AddProductColor(this.ColorName).subscribe(res => {
      //   this.successFire.fire();
      //   this.ColorName = null;
      //   this.visible = false;
      //   this.GetAllProductsWithCat();
      // })
    }
  }
  SubmitEditColor() {
    // var CN = this.editForm.controls["colorName"].value;
    // if (CN.split(' ').join('') == "") {
    //   this.emptyField.fire();
    //   return
    // } else {
    //   this.productService.EditProductColor(CN, this.selectedItemId).subscribe(res => {
    //     this.successFire.fire();
    //     this.ColorName = null;
    //     this.visibleEdit = false;
    //     this.GetAllProductsWithCat();
    //   })
    // }
  }
  AddCode() {
    this.visible = true;
  }
  EditColor(id, colorName) {
    this.selectedItemId = id;
    this.editForm.patchValue({
      colorName: colorName
    })
    this.visibleEdit = true;
  }
  onUpload(e) { }
  closeModal() {
    this.visible = false;
    this.visibleEdit = false;
  }


  onChange(e: any) {
    console.log(e);

  }
}


