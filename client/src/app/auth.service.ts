import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }
  public login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('http://localhost:4000/api/auth', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }
  public logout() {
    localStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
