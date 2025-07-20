import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllUser, Root } from '../types/admin-users';
import { Property, PropertyRot } from '../types/property';
import { PropertyRoot } from './../types/property';
import { Root as sellerRoot } from '../types/seller';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private Base='http://127.0.0.1:8000';
  private sellers=`${this.Base}/api/admin/sellers`;

  private users = `${this.Base}/api/admin/users`;
  private user = `${this.Base}/api/admin/users`;
  private properties=`${this.Base}/api/admin/properties`;
  constructor(private http: HttpClient) { }


  getUsers(): Observable<Root> {
    return this.http.get<Root>(this.users);
  }

  getSingleUser(id: number): Observable<Root> {
    return this.http.get<Root>(`${this.user}/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.user}/${id}`, { headers: { 'content-type': 'application/json' } });
  }
  editUser(data: any, id: number): Observable<any> {
    return this.http.put(`${this.user}/${id}`, data, { headers: { 'content-type': 'application/json' } });
  }

  addUser(data:any):Observable<any>{
    return this.http.post<any>(this.user, data, { headers: { 'content-type': 'application/json' } });
  }


  //properties
  getProperties():Observable<PropertyRoot>{
    return this.http.get<PropertyRoot>(this.properties);
  }
  getSingleProperty(id:number):Observable<PropertyRoot>{
    return this.http.get<PropertyRoot>(`${this.properties}/${id}`)
  }
  deleteProperty(id:number):Observable<any>{
    return this.http.delete(`${this.properties}/${id}`, { headers: { 'content-type': 'application/json' } })
  }

  addProperty(data:any):Observable<any>{
    return this.http.post<any>(this.properties,data,{headers:{'content-type':'application/json'}})
  }
  getProperty(id:number):Observable<PropertyRot>{
    return this.http.get<PropertyRot>(`${this.properties}/${id}`)
  }
  editProperty(data:any,id:number):Observable<any>{
    return this.http.put(`${this.properties}/${id}`,data,{headers:{'content-type':'application/json'}})
  }
  getSellers(): Observable<sellerRoot> {
    return this.http.get<sellerRoot>(this.sellers);
  }
}
