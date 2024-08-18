import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingdataService } from '../services/settingdata.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements OnInit {
  constructor(private settingservice: SettingdataService) { }
  contactData: any;
  contactForm: FormGroup
  @ViewChild('emptyField')
  public readonly emptyField: SwalComponent;
  @ViewChild('successFire')
  public readonly successFire: SwalComponent;
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      Phone1: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Phone2: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Opentime: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      location: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      instagram: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      whatsapp: new FormControl(null, [
        Validators.maxLength(100)
      ]),
    })
    this.settingservice.GetContactUsData().subscribe(res => {
      this.contactData = res.data[0]
      console.log(this.contactData);

      this.contactForm.patchValue({
        Phone1: this.contactData.phone1,
        Phone2: this.contactData.phone2,
        Address: this.contactData.address,
        Opentime: this.contactData.openTime,
        location: this.contactData.location,
        instagram: this.contactData.instagram,
        whatsapp: this.contactData.whatsapp,
        email: this.contactData.email,
      })
      console.log(this.contactData);
    })
  }
  ChangeContactInfo() {
    var data = [{
      Phone1: this.contactForm.controls['Phone1'].value,
      Phone2: this.contactForm.controls['Phone2'].value,
      Address: this.contactForm.controls['Address'].value,
      Opentime: this.contactForm.controls['Opentime'].value,
      Location: this.contactForm.controls['location'].value,
      Instagram: this.contactForm.controls['instagram'].value,
      Whatsapp: this.contactForm.controls['whatsapp'].value,
      Email: this.contactForm.controls['email'].value,
    }
    ]
    if (this.contactForm.valid) {
      this.settingservice.changeContactInfo(data).subscribe(res => {
        if (res.status == "success") this.successFire.fire();
      })
    }
    else{this.emptyField.fire()}
  }

}
