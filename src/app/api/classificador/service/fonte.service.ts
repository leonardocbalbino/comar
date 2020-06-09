import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Fonte } from '../models/fonte';

@Injectable({
  providedIn: 'root'
})
export class FonteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listarPorId(fonte: number): Observable<Fonte> {
    return this.http.get<Fonte>(`${environment.api}/${environment.classificadorContext}/fonte/${fonte}`);
  }

  salvar(fonte: Fonte): Observable<Fonte> {
    return this.http.post<Fonte>(`${environment.api}/${environment.classificadorContext}/fonte/salvar`, JSON.stringify(fonte), this.httpOptions)
  }
}
