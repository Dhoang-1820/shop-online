import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseURL;
  }

  saveCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/carts/${userId}/${productId}/${quantity}`, null).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  getCartByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/carts/${userId}`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  removeCart(userId: number, productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/carts/${userId}/${productId}`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  removeAllCart(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/carts/${userId}`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  putCart(cart: any, userId: number, productId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/carts/${userId}/${productId}`, cart).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }
}
