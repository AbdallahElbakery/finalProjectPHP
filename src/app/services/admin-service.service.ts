import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllUser, Root } from '../types/admin-users';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private users = "http://127.0.0.1:8000/api/admin/users";
  private user="http://127.0.0.1:8000/api/admin/users";
  constructor(private http: HttpClient) { }


  getUsers(): Observable<Root> {
    return this.http.get<Root>(this.users);
  }

  getSingleUser(id:number):Observable<Root>{
    return this.http.get<Root>(`${this.user}/${id}`);
  }
  
  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.user}/${id}`,{headers:{'content-type':'application/json'}});
  }
  editUser(data:any, id:number):Observable<any>{
    return this.http.post(`${this.user}/${id}`, data)
  }
}
