import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../types/property';
import { Observable } from 'rxjs';
import { Address } from '../types/address';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  private apiUrl = "http://127.0.0.1:8000/api/properties";
  private address = "http://127.0.0.1:8000/api/addresses";
  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.address)
  }
}