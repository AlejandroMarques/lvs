import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  searchMovies(title: string): Observable<any> {
    return this.http.get(`http://localhost:3003/api/movie/search/${title}`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`http://localhost:3003/api/movie/${id}`);
  }
}
