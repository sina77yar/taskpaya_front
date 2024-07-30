import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDTO } from '../../DTOs/Product/ProductDTO';
import { ImagePath } from '../../Utilities/PathTools';
import { ProductService } from '../../services/product.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productsize',
  templateUrl: './productsize.component.html',
  styleUrl: './productsize.component.scss'
})
export class ProductsizeComponent implements OnInit {
  constructor(private productService: ProductService) { }
  sizes: any[] = [];
  imagePath = ImagePath
  visible: boolean = false
  visibleEdit: boolean = false
  SizeName: string;
  EditSizeName: string;
  selectedItemId: number;
  @ViewChild('emptyField')
  public readonly emptyField: SwalComponent;
  @ViewChild('successFire')
  public readonly successFire: SwalComponent;

  editForm: FormGroup;
  ngOnInit(): void {
    this.editForm = new FormGroup({
      sizeName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),

    })
    this.GetAllProductsWithCat();
  }
  GetAllProductsWithCat() {
    this.productService.GetAllProductSizes().subscribe(res => {
      this.sizes = res.data;
      console.log(this.sizes);

    })
  }
  AddColor() {
    this.visible = true;
  }
  SubmitNewSize() {
    if (this.SizeName.split(' ').join('') == "") {
      this.emptyField.fire();
      return
    } else {
      this.productService.AddProductSize(this.SizeName).subscribe(res => {
        this.successFire.fire();
        this.SizeName = null;
        this.visible = false;
        this.GetAllProductsWithCat();
      })
    }
  }
  SubmitEditSize() {
    var SN = this.editForm.controls["sizeName"].value;
    if (SN.split(' ').join('') == "") {
      this.emptyField.fire();
      return
    } else {
      this.productService.EditProductSize(SN, this.selectedItemId).subscribe(res => {
        this.successFire.fire();
        this.SizeName = null;
        this.visibleEdit = false;
        this.GetAllProductsWithCat();
      })
    }
  }
  EditSize(id, sizeName) {
    this.selectedItemId = id;
    console.log(sizeName);
    this.editForm.patchValue({
      sizeName: sizeName
    })
    this.visibleEdit = true;
  }
  onUpload(e) { }
  closeModal() {
    this.visible = false;
    this.visibleEdit = false;
  }
}
