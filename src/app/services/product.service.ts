import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterProductsDTO } from '../DTOs/Product/FilterProductsDTO';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { ProductDTO } from '../DTOs/Product/ProductDTO';
import { ProductGallery } from '../DTOs/Product/ProductGallery';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }


  getFilteredProducts(filter?: FilterProductsDTO): Observable<IResponseResult<FilterProductsDTO>> {
    let params;
    if (filter) {
      if (filter.title === null) {
        filter.title = '';
      }
      params = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('title', filter.title?.toString())
        .set('startPrice', filter.startPrice?.toString())
        .set('endPrice', filter.endPrice?.toString())

      for (const category of filter.categories) {
        params = params.append('categories', category)
      }
      if (filter.orderBy != null) {
        params = params.append('orderBy', filter.orderBy.toString())
      }
    }
    return this.http.get<IResponseResult<FilterProductsDTO>>('api/Products/filter-products', { params })
  }
  getProductActiveCategories(): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/Products/product-active-categories');
  }
  getProductById(id: number): Observable<IResponseResult<ProductDTO>> {
    return this.http.get<IResponseResult<ProductDTO>>('api/Products/GetSingleProduct/' + id)
  }
  getProductGalleryById(id: number): Observable<IResponseResult<ProductGallery>> {
    return this.http.get<IResponseResult<ProductGallery>>('api/Products/GetSingleProductGallery/' + id)
  }
  getRelatedProduct(ProductId: number): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/Products/GetRelatedProducts/' + ProductId)
  }
  getproductforMen(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/Products/GetProductsForMen')
  }
  getproductforShoes(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/Products/GetProductsForShoes')
  }
  getproductforAccessories(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/Products/GetProductsForAccessories')
  }
  GetAllProductsWithCat(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/Products/GetAllProductsWithCat')
  }
  getAllProductColors(): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/Products/GetAllProductColors');
  }
  GetAllProductSizes(): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/Products/GetAllProductSizes');
  }
  AddProductSize(SizeName: string): Observable<IResponseResult<any>> {
    const params = new HttpParams().set('SizeName', SizeName)
    return this.http.get<IResponseResult<any>>('api/Products/AddProductSize/', { params });
  }
  EditProductSize(SizeName: string, id: number): Observable<IResponseResult<any>> {
    const params = new HttpParams().set('SizeName', SizeName).set('id', id)
    return this.http.get<IResponseResult<any>>('api/Products/EditProductSize/', { params });
  }
  AddProductColor(ColorName: string): Observable<IResponseResult<any>> {
    const params = new HttpParams().set('ColorName', ColorName)
    return this.http.get<IResponseResult<any>>('api/Products/AddProductColor/', { params });
  }
  EditProductColor(ColorName: string, id: number): Observable<IResponseResult<any>> {
    const params = new HttpParams().set('ColorName', ColorName).set('id', id)
    return this.http.get<IResponseResult<any>>('api/Products/EditProductColor/', { params });
  }
  getUploadOptions = (): HttpHeaders => {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.delete('Content-Type');
    return headers;
  }
  AddProduct(fd: FormData) {
    debugger
    // return this.http.post('api/Products/AddProduct', fd, this.headers)
    return this.http.post(
      `api/Products/AddProduct`,
      fd)
  }
  Get10LimitedProducts(): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/Products/Get10LimitedProducts');
  }
  GetProductByIdWithAll(id: number): Observable<IResponseResult<ProductDTO>> {
    return this.http.get<IResponseResult<ProductDTO>>('api/Products/GetProductByIdWithAll/' + id)
  }
}