import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllUser, Root } from '../types/admin-users';
import { Property } from '../types/property';
import { PropertyRoot } from './../types/property';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private Base='http://127.0.0.1:8000';
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
}
