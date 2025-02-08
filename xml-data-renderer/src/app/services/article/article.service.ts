import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticle(id: string){
    return this.http.get(`http://localhost:3000/articles/${id}`);
  }
}
