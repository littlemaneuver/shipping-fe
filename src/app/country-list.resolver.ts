import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShippingApiService, Country } from './shipping-api.service';

@Injectable({
  providedIn: 'root'
})
export class CountryListResolver implements Resolve<Country[]> {
  constructor(private shippingApiService: ShippingApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[]> {
    return this.shippingApiService.getCounries();
  }
}
