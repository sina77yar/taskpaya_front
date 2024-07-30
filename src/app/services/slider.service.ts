import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, Observable } from 'rxjs';
import { HomeSliderResponse } from '../DTOs/Sliders/HomeSliderResponse';
import { Slider } from '../DTOs/Sliders/Slider';


@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private homeSliders: BehaviorSubject<Slider[]> = new BehaviorSubject<Slider[]>(null);
  constructor(
    private http: HttpClient) {
    this.http = http;
  }


  public GetSliders(): Observable<HomeSliderResponse> {
    const req = this.http.get<HomeSliderResponse>('api/slider/GetActiveSliders');
    return req
  }
  public getCurrentSliders():Observable<Slider[]>{
    return this.homeSliders;
  }
  public setCurrentSliders(sliders:Slider[]){
    this.homeSliders.next(sliders);
  }
}
