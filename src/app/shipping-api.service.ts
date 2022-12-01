import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Country = {
  id: number;
  name: string;
};

export type Parcel = {
  id: number;
  sku: string;
  description: string;
  streetAddress: string;
  town: string;
  country: string;
  deliveryDate: string;
};

type GetParcelsResponse = {
  hasMoreItems: boolean;
  first: number;
  after: number;
  parcels: Parcel[];
}

@Injectable({
  providedIn: 'root'
})
export class ShippingApiService {
  baseUrl = 'http://localhost:5000/api/v1'
  constructor(private http: HttpClient) { }
  getFullUrl(path: string) {
    return `${this.baseUrl}/${path}`;
  }
  getCounries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.getFullUrl('countries'));
  }
  getParcels({first, after, term, countryName}: {first?: number, after?: number, term?: string, countryName?: string}): Observable<GetParcelsResponse> {
    return this.http.get<GetParcelsResponse>(this.getFullUrl('parcels'), { params: {
      ...(first ? { first } : {}),
      ...(after ? { after } : {}),
      ...(term ? { term } : {}),
      ...(countryName ? { countryName } : {}),
    }});
  }
  createParcel(parcel: Partial<Parcel> & { countryId: number }): Observable<Parcel> {
    return this.http.post<Parcel>(this.getFullUrl('parcels'), parcel);
  }
}
