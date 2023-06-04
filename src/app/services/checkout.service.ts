import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../modules/model/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseURL;
  }

  saveOrder(request: Order): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, request).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

}
