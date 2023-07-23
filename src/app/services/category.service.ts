import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../modules/model/Category';

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

  saveCategory(category: Category): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/categories`, category).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/categories/${categoryId}`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  editCategory(category: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/categories/${category.id}`, category).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }
}
