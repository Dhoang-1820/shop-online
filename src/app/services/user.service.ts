import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../modules/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseURL;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login?name=${username}&password=${password}`, null).pipe(
      retry(1),
      take(1),
      delay(500)
    ) 
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/`, user).pipe(
      retry(1),
      take(1),
      delay(500)
    ) 
  }

  forgotpass(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/forgotpass?mail=${email}`, null, {responseType: 'text'}).pipe(
      retry(1),
      take(1),
      delay(500)
    ) 
  }

  editUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${user.id}`, user).pipe(
      retry(1),
      take(1),
      delay(500)
    ) 
  }

  getUserAddressById(addressId: number):  Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/addresses/${addressId}`).pipe(
      retry(1),
      take(1),
      delay(500)
    ) 
  }
}
