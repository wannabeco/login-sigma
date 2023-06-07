import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    const url = 'https://glu-invama-authorization-dev.api.sigmaingenieria.net/authorization/api/authenticate';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.get(url, { headers });
  }
}