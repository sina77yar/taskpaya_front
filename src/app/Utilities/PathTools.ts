import { environment } from "../../app/environments/environment";

export const DomainName = environment.production ? 'https://tabagallery.ir':'https://localhost:7213/'
export const ImagePath = DomainName + '/images/products/origin/';
export const SliderPath = DomainName + '/images/sliders/origin/';