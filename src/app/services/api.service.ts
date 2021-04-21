import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:any = 'http://api.sunhouse.co.id/bookstore/index.php/';
  constructor(
    public http:HttpClient
  ) { }

  httpOptions:any;

  getToken() {
    const tokenKey = localStorage.getItem('appToken');
    if(tokenKey != null) {
      const tkn = JSON.parse(tokenKey);
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tkn.token
        })
      };
    }
  }

  get(url)
  {
    this.getToken();
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  post(url,data)
  {
    this.getToken();
    return this.http.post(this.baseUrl + url, data, this.httpOptions);
  }

  put(url,data)
  {
    this.getToken();
    return this.http.put(this.baseUrl + url, data, this.httpOptions);
  }

  delete(url)
  {
    this.getToken();
    return this.http.delete(this.baseUrl + url, this.httpOptions);
  }

  register(email, password) {
    return this.http.post(this.baseUrl + 'auth/register', {
      email: email,
      password: password
    });
  }

  login(email, password) {
    return this.http.post(this.baseUrl + 'auth/login', {
      email: email,
      password: password
    });
  }
}
