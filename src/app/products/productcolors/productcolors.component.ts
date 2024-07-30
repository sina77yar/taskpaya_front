import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDTO } from '../../DTOs/Product/ProductDTO';
import { ImagePath } from '../../Utilities/PathTools';
import { ProductService } from '../../services/product.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productcolors',
  templateUrl: './productcolors.component.html',
  styleUrl: './productcolors.component.scss'
})
export class ProductcolorsComponent implements OnInit {
  constructor(private productService: ProductService) { }
  colors: any[] = [];
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

  ngOnInit(): void {
    this.editForm = new FormGroup({
      colorName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),

    })
    this.GetAllProductsWithCat();
  }
  GetAllProductsWithCat() {
    this.productService.getAllProductColors().subscribe(res => {
      this.colors = res.data;
      console.log(this.colors);

    })
  }
  SubmitNewColor() {
    if (this.ColorName.split(' ').join('') == "") {
      this.emptyField.fire();
      return
    } else {
      this.productService.AddProductColor(this.ColorName).subscribe(res => {
        this.successFire.fire();
        this.ColorName = null;
        this.visible = false;
        this.GetAllProductsWithCat();
      })
    }
  }
  SubmitEditColor() {
    var CN = this.editForm.controls["colorName"].value;
    if (CN.split(' ').join('') == "") {
      this.emptyField.fire();
      return
    } else {
      this.productService.EditProductColor(CN, this.selectedItemId).subscribe(res => {
        this.successFire.fire();
        this.ColorName = null;
        this.visibleEdit = false;
        this.GetAllProductsWithCat();
      })
    }
  }
  AddColor() {
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
}
