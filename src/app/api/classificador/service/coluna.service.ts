import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Coluna } from '../models/coluna';

@Injectable({
  providedIn: 'root'
})
export class ColunaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Coluna>> {
    return this.http.get<Array<Coluna>>(`${environment.api}/${environment.classificadorContext}/coluna/listar`)
  }

  salvar(coluna: Coluna): Observable<Coluna> {
    return this.http.post<Coluna>(`${environment.api}/${environment.classificadorContext}/coluna/salvar`, JSON.stringify(coluna), this.httpOptions)
  }

  alterar(coluna: Coluna): Observable<Coluna> {
    return this.http.put<Coluna>(`${environment.api}/${environment.classificadorContext}/coluna/alterar`, JSON.stringify(coluna), this.httpOptions)
  }
  
}
