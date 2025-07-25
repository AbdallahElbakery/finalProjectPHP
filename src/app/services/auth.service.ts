import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  Message: string;
  UserID: string | number;
  UserName: string;
  UserPhoto: string;
  UserRole: string;
  Token: string;
}

interface RegisterUserResponse {
  message: string;
  user: any;
  token: string;
}

interface RegisterSellerResponse {
  message: string;
  user: any;
  SellerInfo: any;
  token: string;
}

interface CurrentUser {
  id: string | number;
  name: string;
  role: string;
  photo?: string;
  sellerInfo?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        this.setSession(
          res.Token,
          res.UserName,
          res.UserRole,
          res.UserPhoto,
          undefined,
          res.UserID
        );
        this.authStatusSubject.next(true);
      })
    );
  }

  registerUser(userData: any): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(`${this.apiUrl}/register/user`, userData).pipe(
      tap((res) => {
        this.setSession(res.token, res.user.name, res.user.role, res.user.photo);
        this.authStatusSubject.next(true);
      })
    );
  }

  registerSeller(sellerData: any): Observable<RegisterSellerResponse> {
    return this.http.post<RegisterSellerResponse>(`${this.apiUrl}/register/seller`, sellerData).pipe(
      tap((res) => {
        this.setSession(res.token, res.user.name, res.user.role, res.user.photo, res.SellerInfo);
        this.authStatusSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.clearSession();
        this.authStatusSubject.next(false);
        this.router.navigate(['/login']);
      })
    );
  }
  logoutAdmin(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.clearSession();
        this.authStatusSubject.next(false);
          this.router.navigate(['/admin/login']);
      })
    );
  }

  private setSession(token: string, userName: string, role: string, photo?: any, sellerInfo?: any, userId?: string | number) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('role', role);
    if (photo && typeof photo === 'string') localStorage.setItem('photo', photo);
    if (sellerInfo) localStorage.setItem('sellerInfo', JSON.stringify(sellerInfo));
    if (userId) localStorage.setItem('userId', userId.toString());
  }

  private clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    localStorage.removeItem('photo');
    localStorage.removeItem('sellerInfo');
    localStorage.removeItem('userId');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getPhoto(): string | null {
    return localStorage.getItem('photo');
  }

  getSellerInfo(): any {
    const info = localStorage.getItem('sellerInfo');
    return info ? JSON.parse(info) : null;
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getCurrentUser(): CurrentUser | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    return {
      id: this.getUserId() || '',
      name: this.getUserName() || '',
      role: this.getRole() || '',
      photo: this.getPhoto() || undefined,
      sellerInfo: this.getSellerInfo()
    };
  }
} 