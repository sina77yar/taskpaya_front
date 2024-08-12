import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResponseResult } from "../DTOs/Common/IResponseResult";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) {

    }

    addProductToOrder(productId: number, count: number): Observable<IResponseResult<any>> {
        const params = new HttpParams().set('productId', productId).set('count', count)
        return this.http.get<IResponseResult<any>>('api/Order/add-order/', { params });
    }
    GetUserOrderList(): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/GetUserOrderList');
    }
    GetUserAllOrders(): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/GetUserAllOrders');
    }
    getProductActiveCategories(): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Products/product-active-categories');
    }
    GetUserOrderByFactorCode(factorCode: string): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/GetUserOrderByFactorCode/' + factorCode);
    }
    GetAllNotSentOrders(): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/GetAllNotSentOrders');
    }
    GetAllNotRecievedSelfRecieveOrders(): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/GetAllNotRecievedSelfRecieveOrders');
    }
    GetOrderListById(id: number): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/GetOrderListById/' + id);
    }
    SetOrderSent(orderId: number): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/SetOrderSent/' + orderId);
    }
    SetOrderSelfRecieved(orderId: number): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/SetOrderSelfRecieved/' + orderId);
    }
    GetAllDiscountCode(): Observable<IResponseResult<any>> {
        return this.http.get<IResponseResult<any>>('api/Order/GetAllDiscountCode');
    }
}