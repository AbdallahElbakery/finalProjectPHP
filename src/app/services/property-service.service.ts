import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../types/property';
import { Observable } from 'rxjs';
import { Address } from '../types/address';
import { Root, Seller } from '../types/seller';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  private apiUrl = "http://127.0.0.1:8000/api/properties";
  private address = "http://127.0.0.1:8000/api/addresses";
  private seller = "http://127.0.0.1:8000/api/sellers/1";
  private cateogries = "http://127.0.0.1:8000/api/categories";
  private addProperties = "http://127.0.0.1:8000/api/sellers/1";
  // private deleteSellerProperty = "http://127.0.0.1:8000/api/sellers/1/14";
  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.address)
  }
  getSingleSeller(): Observable<Root> {
    return this.http.get<Root>(this.seller)
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.cateogries);
  }

  addProperty(data: Property): Observable<any> {
    return this.http.post(this.addProperties, data, { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
  }
  // deleteSellerProp(): Observable<Root> {
  //   return this.http.delete<Root>(this.deleteSellerProperty)
  // }
}