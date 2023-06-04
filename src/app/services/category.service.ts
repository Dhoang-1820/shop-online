import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseURL;
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }
}
