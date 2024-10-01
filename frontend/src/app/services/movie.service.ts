import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl: string = 'http://localhost:3003/api'
  constructor(private http: HttpClient) { }
  searchMovies(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/search/${title}`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`);
  }

  listMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/list`);
  }
}
