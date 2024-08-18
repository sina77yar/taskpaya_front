import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { FilterProductsDTO } from '../DTOs/Product/FilterProductsDTO';

@Injectable({
  providedIn: 'root'
})
export class SettingdataService {
  constructor(
    private http: HttpClient
  ) { }

  GetContactUsData(): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/AdminAccount/GetContactUsData');
  }

  changeContactInfo(filter?: any): Observable<IResponseResult<any>> {
    let params;
    if (filter[0]) {
      params = new HttpParams()
        .set('Address', filter[0].Address.toString())
        .set('Phone1', filter[0].Phone1?.toString())
        .set('Phone2', filter[0].Phone2?.toString())
        .set('Email', filter[0].Email?.toString())
        .set('OpenTime', filter[0].Opentime?.toString())
        .set('Location', filter[0].Location?.toString())
        .set('Instagram', filter[0].Instagram?.toString())
        .set('Whatsapp', filter[0].Whatsapp?.toString())
    }
    return this.http.get<IResponseResult<FilterProductsDTO>>('api/AdminAccount/changeContactInfo', { params })
  }
}
