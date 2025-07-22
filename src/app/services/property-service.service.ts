import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../types/property';
import { Observable } from 'rxjs';
import { Address } from '../types/address';
import { Root, Seller, Seller2, SellerData } from '../types/seller';
import { UserProfileResponse } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  private apiUrl = "http://127.0.0.1:8000/api/properties";
  private address = "http://127.0.0.1:8000/api/addresses";
  private seller = "http://127.0.0.1:8000/api/seller";
  private singleseller = "http://127.0.0.1:8000/api/single-seller";
  private sellerProperties="http://127.0.0.1:8000/api/get-seller-properties"
  private cateogries = "http://127.0.0.1:8000/api/categories";
  private addOwnProperty = "http://127.0.0.1:8000/api/seller-add-prop";
  private updateProp = "http://127.0.0.1:8000/api/seller-update-prop";
  private deleteProp = "http://127.0.0.1:8000/api/seller-delete-prop";
  private companyDetails = "http://127.0.0.1:8000/api/seller/update-company-details";
  private updatePassword = "http://127.0.0.1:8000/api/seller/change-password";
  private profile = "http://127.0.0.1:8000/api/seller/update-personal-details";
  private getOwnProp = "http://127.0.0.1:8000/api/seller-get-prop";
  private getpay = "http://127.0.0.1:8000/api/payment";
  private me = "http://127.0.0.1:8000/api/me";
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
  getSellerProfile(): Observable<Root> {
    return this.http.get<Root>(this.seller)
  }
  
  viewSellerbyUser(id:number):Observable<Root>{
    return this.http.get<Root>(`${this.singleseller}/${id}`)
  }
  getSellerProperties(id:number):Observable<Root> {
    return this.http.get<Root>(`${this.sellerProperties}/${id}`)
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.cateogries);
  }
  getProperty(id: number): Observable<any> {
    return this.http.get(`${this.getOwnProp}/${id}`)
  }
  addProperty(data: any): Observable<any> {
    return this.http.post(this.addOwnProperty, data)
  }

  delteProperty(id: number) {
    return this.http.delete(`${this.deleteProp}/${id}`, { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
  }
  updateProperty(id: number, data: FormData): Observable<any> {
    data.append('_method', 'PUT')
    return this.http.post(`${this.updateProp}/${id}`, data);
  }

  getProfile(): Observable<any> {
    return this.http.get<SellerData>(this.seller)
  }
  updateProfile(data: FormData): Observable<any> {
    data.append('_method', 'PATCH')
    return this.http.post(`${this.profile}`, data);
  }
  getComapnyDetails(): Observable<any> {
    return this.http.get<Seller2>(this.seller);
  }

  updateCompanyDetails(data: FormData): Observable<any> {
    data.append('_method', 'PATCH')
    return this.http.post(this.companyDetails, data)
  }

  getPass(): Observable<any> {
    return this.http.get<Seller>(this.seller);
  }
  updatePass(data: Seller): Observable<any> {
    return this.http.patch(this.updatePassword, data, { headers: { 'content-type': 'application/json' } });
  }

  getPayment(id: number): Observable<any> {
    return this.http.post(`${this.getpay}`, { id: id }, { headers: { 'content-type': 'application/json' } })
  }

  getCurrentUserProfile(): Observable<UserProfileResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<UserProfileResponse>(this.me, { headers });
  }
  updateUserProfile(data: FormData): Observable<any> {
    data.append('_method', 'PATCH');
    return this.http.post('http://127.0.0.1:8000/api/user/update-personal-details', data);
  }
  // }
  // deleteSellerProp(): Observable<Root> {
  //   return this.http.delete<Root>(this.deleteSellerProperty)
  // }
}
