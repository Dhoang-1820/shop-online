import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, retryWhen, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseURL;
  }

  getAllProduct(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  getRecomendedProduct(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/recommended`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  getProductByCategoryId(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${categoryId}/productsincategory`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }
}
