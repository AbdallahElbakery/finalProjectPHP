import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  console.log('Interceptor - Token:', token);
  console.log('Interceptor - Request URL:', req.url);
  
  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    console.log('Interceptor - Added Authorization header');
    return next(authReq);
  }
  
  console.log('Interceptor - No token found');
  return next(req);
}; 