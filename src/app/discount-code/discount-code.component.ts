import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ImagePath } from '../Utilities/PathTools';
import { ProductService } from '../services/product.service';
import moment from 'jalali-moment';
import { NzI18nService, en_US, fa_IR } from 'ngz-shamsi-datepicker';
import { OrderService } from '../services/order.service';
import { format } from 'date-fns-jalali';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrl: './discount-code.component.scss'
})
export class DiscountCodeComponent implements OnInit {
  ranges = { "امروز": [new Date(), new Date()], 'این ماه': [new Date(), new Date()] };
  isPersian = false;
  constructor(private datePipe: DatePipe, private orderService: OrderService, private i18n: NzI18nService) { this.i18n.setLocale(this.isPersian ? fa_IR : fa_IR); }

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
  date: Date;
  addCodeForm: FormGroup;
  ngOnInit(): void {
    this.addCodeForm = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    })
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
      this.dataitems = res.data;
      console.log(this.dataitems);

      this.dataitems.forEach(item => {
        item.expireDate = format(new Date(item.expireDate), "yyyy/MM/dd");
      });

    })
  }


  AddCode() {
    // this.visible = true;

    if (this.addCodeForm.valid) {

      const codeData = this.addCodeForm.controls['code'].value;
      var dateData = this.addCodeForm.controls['date'].value;
      const amountData = this.addCodeForm.controls['amount'].value;
      dateData = moment().locale("fa").format('YYYY/MM/DD')

      console.log(dateData);
      this.orderService.addNewDiscountCode(codeData, dateData, amountData).subscribe(res => {
        console.log(res.data);
        if (res.status === "success") this.successFire.fire();
        this.GetData();
        this.addCodeForm.reset();
      })
    }
    else {
      this.emptyField.fire()
    }

  }
  changeActive(id) {
    this.orderService.changediscountActive(id).subscribe(res => {
      if (res.status === "success") this.successFire.fire();
      this.GetData()
    })
  }
  onUpload(e) { }
  closeModal() {
    this.visible = false;
    this.visibleEdit = false;
  }


  onChange(result: Date) {
    debugger
    console.log('onChange: ', result);
  }
}


