import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private users="http://127.0.0.1:8000/api/admin/users";
  constructor(private http: HttpClient) { }


  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.users);
  }
}
