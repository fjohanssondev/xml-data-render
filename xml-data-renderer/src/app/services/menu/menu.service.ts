import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseURL = 'http://localhost:3000/folders';
  constructor(private http: HttpClient) { }

  getMenu(){
    return this.http.get(this.baseURL);
  }
}
