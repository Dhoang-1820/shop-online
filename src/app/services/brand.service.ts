import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../modules/model/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseURL;
  }

  getAllBrand(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/brands`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  saveBrand(brand: Brand): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/brands`, brand).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  deleteBrand(brandId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/brands/${brandId}`).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }

  editBrand(brand: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/brands/${brand.id}`, brand).pipe(
      retry(2),
      take(3),
      delay(500)
    )
  }
}
