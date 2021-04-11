import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:any = 'http://api.sunhouse.co.id/bookstore/index.php/';
  constructor(
    public http:HttpClient
  ) { }

  get(url)
  {
    return this.http.get(this.baseUrl + url);
  }

  post(url,data)
  {
    return this.http.post(this.baseUrl + url, data);
  }

  put(url,data)
  {
    return this.http.put(this.baseUrl + url, data);
  }

  delete(url)
  {
    return this.http.delete(this.baseUrl + url);
  }
}
