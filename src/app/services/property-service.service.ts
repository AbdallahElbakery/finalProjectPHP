import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../types/property';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  private apiUrl="https://685515256a6ef0ed66312e50.mockapi.io/api/properties";

  constructor(private http:HttpClient) { }

  getProperties():Observable<Property[]>{
    return this.http.get<Property[]>(this.apiUrl);
  }

  
}
