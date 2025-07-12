import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../types/property';
import { Observable } from 'rxjs';
import { Address } from '../types/address';
import { Root, Seller, Seller2, SellerData } from '../types/seller';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  private apiUrl = "http://127.0.0.1:8000/api/properties";
  private address = "http://127.0.0.1:8000/api/addresses";
  private seller = "http://127.0.0.1:8000/api/sellers/3";
  private cateogries = "http://127.0.0.1:8000/api/categories";
  private addProperties = "http://127.0.0.1:8000/api/sellers/3";
  private getsingleProperty = "http://127.0.0.1:8000/api/sellers/3";
  private profile = "http://127.0.0.1:8000/api/sellers/update-personal-details/2";
  private companyDetails = "http://127.0.0.1:8000/api/sellers/update-company-details/2";
  private updatePassword = "http://127.0.0.1:8000/api/sellers/change-password/1";
  // private deleteSellerProperty = "http://127.0.0.1:8000/api/sellers/1/14";
  constructor(private http: HttpClient) { }
  sellerData: SellerData[] = [];
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

  addProperty(data: any): Observable<any> {
    return this.http.post(this.addProperties, data)
  }
  delteProperty(id: number) {
    return this.http.delete(`${this.seller}/${id}`, { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
  }

  updateProperty(id: number, data: Property): Observable<any> {
    return this.http.put(`${this.seller}/${id}`, data, { headers: { 'content-type': 'application/json' } });
  }

  getProperty(id: number): Observable<any> {
    return this.http.get(`${this.getsingleProperty}/${id}`)
  }
  updateProfile(data: FormData): Observable<any> {
    return this.http.patch(`${this.profile}`, data);
  }
  getProfile(): Observable<any> {
    return this.http.get<SellerData>(this.seller)
  }
  getComapnyDetails(): Observable<any> {
    return this.http.get<Seller2>(this.seller);
  }

  updateCompanyDetails(data: Seller): Observable<any> {
    return this.http.patch(this.companyDetails, data, { headers: { 'content-type': 'application/json' } })
  }

  getPass(): Observable<any> {
    return this.http.get<Seller>(this.seller);
  }
  updatePass(data: Seller): Observable<any> {
    return this.http.patch(this.updatePassword, data, { headers: { 'content-type': 'application/json' } });
  }

  // }
  // deleteSellerProp(): Observable<Root> {
  //   return this.http.delete<Root>(this.deleteSellerProperty)
  // }
}