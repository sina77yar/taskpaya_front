import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../DTOs/Product/ProductDTO';
import { GalleryPath, ImagePath } from '../Utilities/PathTools';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { timeout } from 'rxjs';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
interface Color {
  colorName: string;
  id: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) { }
  galleryPath = GalleryPath;
  products: ProductDTO[] = [];
  imagePath = ImagePath
  visible: boolean = false
  visibleGallery: boolean = false
  VisibleEdit: boolean = false
  colors: Color[];
  categories: any[];
  selectedCat: any[];
  selectedcolors: any;
  sizes: any[];
  selectedsizes: any[];
  productForm: FormGroup
  editForm: FormGroup
  value!: number;
  uploadedFiles: any[] = [];
  fileToUpload: File | null = null;
  LimitedProducts: any;
  @ViewChild('emptyField')
  public readonly emptyField: SwalComponent;
  @ViewChild('successFire')
  public readonly successFire: SwalComponent;

  @ViewChild('divID') divID: ElementRef;
  productsDesc: any;

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
      DiscountPercent: new FormControl(null, [
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
      selectedcolors: new FormControl<Color[] | null>([]),
      selectedsizes: new FormControl(null),
      selectedCat: new FormControl(null),
    })

    this.editForm = new FormGroup({
      ProductName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      ShortDescription: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      DiscountPercent: new FormControl(null, [
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
      selectedcolors: new FormControl<Color[] | null>([]),
      selectedsizes: new FormControl(null),
      selectedCat: new FormControl(null),
    })
    this.GetAllProductsWithCat();
    this.GetAllColors();
    this.GetAllSize();
    this.GetAllCategories();
    this.Get10LimitedProducts();
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
    this.productForm.reset();
    this.visible = true;
  }
  productId: number = 0;
  productGallery: any
  ShowGalleryProduct(id) {
    this.productId = id
    this.productService.getProductGalleryById(id).subscribe(res => {
      console.log(res.data);
      this.productGallery = res.data;
    })
    this.visibleGallery = true;
  }
  SubmitNewProduct() {

    if (this.productForm.invalid || this.selectedFile == undefined) {
      this.emptyField.fire();
      return
    }
    const fd = new FormData();

    fd.append('fileAN', this.selectedFile); // , this.selectedFile.name
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
  selectedFileGallery!: File[]

  // onFileSelected(event: any) {
  //   debugger
  //   this.selectedFile = <File>event.files[0];
  // }
  onFileSelected(event: any) {

    this.selectedFile = <File>event.files[0];
    console.log(this.selectedFile);
  }
  onFilesSelected(event: any) {
    debugger
    this.selectedFileGallery = <File[]>event.files


    // this.selectedFileGallery = <File>event.files[0];
  }
  SubmitEditProduct() {

    if (this.editForm.invalid || this.editForm.controls['selectedsizes'].value == null || this.editForm.controls['selectedcolors'].value == null) {
      this.emptyField.fire();
      return
    }
    const fd = new FormData();
    if (this.selectedFile != undefined) {
      fd.append('fileAN', this.selectedFile); // , this.selectedFile.name
    }
    var isExist = false;
    var isSpecial = false;
    var isDiscounted = false;
    if (this.editForm.controls['IsExist'].value == "true") {
      isExist = true;
    }
    if (this.editForm.controls['IsSpecial'].value == "true") {
      isSpecial = true;
    }
    if (this.editForm.controls['IsDiscounted'].value == "true") {
      isDiscounted = true;
    }
    var product = {
      productName: this.editForm.controls['ProductName'].value,
      Price: this.editForm.controls['Price'].value,
      Stock: this.editForm.controls['Stock'].value,
      ShortDescription: this.editForm.controls['ShortDescription'].value,
      Description: this.editForm.controls['Description'].value,
      IsExist: isExist,
      IsSpecial: isSpecial,
      IsDiscounted: isDiscounted,
      Weight: this.editForm.controls['Weight'].value,
      Barcode: this.editForm.controls['Barcode'].value,
      DiscountPercent: this.editForm.controls['DiscountPercent'].value,
      SelectedCat: this.editForm.controls['selectedCat'].value,
    }

    fd.append('ProductName', product.productName)
    fd.append('Price', product.Price)
    fd.append('Stock', product.Stock)
    fd.append('ShortDescription', product.ShortDescription)
    fd.append('Description', product.Description)
    this.editForm.controls['selectedcolors'].value.forEach(element => {
      fd.append('colorIds', element)
    });
    this.editForm.controls['selectedsizes'].value.forEach(element => {
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
    fd.append('id', this.productId.toString())
    this.productService.EditProduct(fd)
      .subscribe(res => {
        this.successFire.fire();
        this.editForm.reset();
        this.visible = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
  }
  AddproductGallery() {
    const fd = new FormData();
    this.selectedFileGallery.forEach(item => {
      fd.append('files', item);
    });
    fd.append('id', this.productId.toString())
    this.productService.AddProductGallery(fd).subscribe(res => {
      if (res.status === "success") {
        this.successFire.fire();
        this.visibleGallery = false;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }
  onremoves(event: any) {

    var a = event.file
    // var deleted =this.selectedFileGallery.findIndex(ab => ab.name == a.name)
    // this.selectedFileGallery.splice(deleted,1)
    // this.selectedFileGallery.reduce(b => b.name == a.name)
  }
  onremove(event: any) {
    debugger
    this.selectedFile = undefined;
    // this.  selectedFile!: File;


  }
  closeModal() {
    this.visible = false;
    this.visibleGallery = false;
    this.VisibleEdit = false;
  }
  Get10LimitedProducts() {
    this.productService.Get10LimitedProducts().subscribe(res => {
      this.LimitedProducts = res.data;

    })
  }
  imageName: "";
  selectedcolorEditval: Color[] = [];

  ShowEditProduct(id) {
    this.productId = id;
    this.VisibleEdit = true;
    this.productService.GetProductByIdWithAll(id).subscribe(res => {
      const product = res.data[0];
      console.log(product);
      this.imageName = product.imageName;
      this.editForm.patchValue({
        ProductName: product.productName,
        Stock: product.stock,
        ShortDescription: product.shortDescription,
        DiscountPercent: product.discountPercent,
        Description: product.description,
        Price: product.price,
        Barcode: product.barcode,
        Weight: product.weight,
        ImageName: product.imageName,
        IsSpecial: product.isSpecial,
        IsDiscounted: product.isDiscounted,
        IsExist: product.isExist,
        selectedCat: product.productSelectedCategory[0].productCategoryId,
        // selectedcolors: product.productSelectedColor[0].colorId
      });
      debugger
      product.productSelectedColor.forEach(item => {
        this.selectedcolorEditval.push(item.colorName, item.colorId)
        this.productForm.patchValue({ selectedcolors: [{ colorName: item.color.colorName, id: item.color.id }] });
      });
      console.log(this.selectedcolorEditval);

    })
  }
  deletePhoto(id) {
    this.productService.DeletePhotoById(id).subscribe(res => {
      if (res.status === "success") this.successFire.fire()
      this.ShowGalleryProduct(this.productId);
    })
  }
}
