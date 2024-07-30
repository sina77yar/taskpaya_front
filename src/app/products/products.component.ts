import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../DTOs/Product/ProductDTO';
import { ImagePath } from '../Utilities/PathTools';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { timeout } from 'rxjs';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) { }
  products: ProductDTO[] = [];
  imagePath = ImagePath
  visible: boolean = false
  colors: any[];
  categories: any[];
  selectedCat: any[];
  selectedcolors: any;
  sizes: any[];
  selectedsizes: any[];
  productForm: FormGroup
  value!: number;
  uploadedFiles: any[] = [];
  fileToUpload: File | null = null;
  @ViewChild('emptyField')
  public readonly emptyField: SwalComponent;
  @ViewChild('successFire')
  public readonly successFire: SwalComponent;
  ngOnInit(): void {
    this.productForm = new FormGroup({
      ProductName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      ShortDescription: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      DiscountPercent: new FormControl(0, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Price: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Stock: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Barcode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Weight: new FormControl(0, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      ImageName: new FormControl(null),
      IsSpecial: new FormControl(null),
      IsDiscounted: new FormControl(null),
      IsExist: new FormControl(null),
      selectedcolors: new FormControl(null),
      selectedsizes: new FormControl(null),
      selectedCat: new FormControl(null),
    })
    this.GetAllProductsWithCat();
    this.GetAllColors();
    this.GetAllSize();
    this.GetAllCategories();
  }
  GetAllProductsWithCat() {
    this.productService.GetAllProductsWithCat().subscribe(res => {
      this.products = res.data;

    })
  }
  GetAllColors() {
    this.productService.getAllProductColors().subscribe(res => {
      this.colors = res.data;
      console.log(this.colors);

    })
  }
  GetAllSize() {
    this.productService.GetAllProductSizes().subscribe(res => {
      this.sizes = res.data;
    })
  }
  GetAllCategories() {
    this.productService.getProductActiveCategories().subscribe(res => {
      this.categories = res.data;

    })
  }
  AddProduct() {
    this.visible = true;
  }
  SubmitNewProduct() {
    if (this.productForm.invalid) {
      this.emptyField.fire();
    }
    const fd = new FormData();

    fd.append('fileAN', this.selectedFile); // , this.selectedFile.name
    debugger
    var isExist = false;
    var isSpecial = false;
    var isDiscounted = false;
    if (this.productForm.controls['IsExist'].value == "true") {
      isExist = true;
    }
    if (this.productForm.controls['IsSpecial'].value == "true") {
      isSpecial = true;
    }
    if (this.productForm.controls['IsDiscounted'].value == "true") {
      isDiscounted = true;
    }
    var product = {
      productName: this.productForm.controls['ProductName'].value,
      Price: this.productForm.controls['Price'].value,
      Stock: this.productForm.controls['Stock'].value,
      ShortDescription: this.productForm.controls['ShortDescription'].value,
      Description: this.productForm.controls['Description'].value,
      IsExist: isExist,
      IsSpecial: isSpecial,
      IsDiscounted: isDiscounted,
      Weight: this.productForm.controls['Weight'].value,
      Barcode: this.productForm.controls['Barcode'].value,
      DiscountPercent: this.productForm.controls['DiscountPercent'].value,
      SelectedCat: this.productForm.controls['selectedCat'].value,
    }

    fd.append('ProductName', product.productName)
    fd.append('Price', product.Price)
    fd.append('Stock', product.Stock)
    fd.append('ShortDescription', product.ShortDescription)
    fd.append('Description', product.Description)
    this.productForm.controls['selectedcolors'].value.forEach(element => {
      fd.append('colorIds', element)
    });
    this.productForm.controls['selectedsizes'].value.forEach(element => {
      fd.append('sizeIds', element)
    });
    if (isExist) {
      fd.append('IsExist', "true")
    }
    else {
      fd.append('IsExist', "false")
    }
    if (isSpecial) {
      fd.append('IsSpecial', "true")
    }
    else {
      fd.append('IsSpecial', "false")
    }
    if (isDiscounted) {
      fd.append('isDiscounted', "true")
    }
    else {
      fd.append('isDiscounted', "false")
    }
    fd.append('Weight', product.Weight)
    fd.append('Barcode', product.Barcode)
    fd.append('DiscountPercent', product.DiscountPercent)
    fd.append('SelectedCat', product.SelectedCat)
    this.productService.AddProduct(fd)
      .subscribe(res => {
        this.successFire.fire();
        this.productForm.reset();
        this.visible = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
  }
  selectedFile!: File;

  // onFileSelected(event: any) {
  //   debugger
  //   this.selectedFile = <File>event.files[0];
  // }
  onFileSelected(event: any) {

    this.selectedFile = <File>event.files[0];
  }


  // onUpload(event) {
  //   debugger
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }

  //   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  // }
  // handleFileInput(files: FileList) {
  //   debugger
  //   this.fileToUpload = files.item(0);
  // }
  // onBasicUploadAuto(event: UploadEvent) {
  //   debugger
  //   // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  // }
  closeModal() {
    this.visible = false;
  }
}
