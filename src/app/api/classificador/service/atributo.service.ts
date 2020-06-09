import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Atributo } from '../models/atributo';
import { AtributoStatusDTO } from '../models/atributo-status-dto';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Atributo>> {
    return this.http.get<Array<Atributo>>(`${environment.api}/${environment.classificadorContext}/atributo/listar`)
  }

  listarPorFonte(fonteId): Observable<Array<Atributo>> {
    return this.http.get<Array<Atributo>>(`${environment.api}/${environment.classificadorContext}/atributo/listar/fonte/${fonteId}`)
  }

  salvar(atributo: Atributo): Observable<Atributo> {
    return this.http.post<Atributo>(`${environment.api}/${environment.classificadorContext}/atributo/salvar`, JSON.stringify(atributo), this.httpOptions)
  }

  salvar_todos(atributos: Array<Atributo>): Observable<Array<Atributo>> {
    return this.http.post<Array<Atributo>>(`${environment.api}/${environment.classificadorContext}/atributo/salvar_todos`, JSON.stringify(atributos), this.httpOptions)
  }

  alterar(atributo: Atributo): Observable<Atributo> {
    return this.http.put<Atributo>(`${environment.api}/${environment.classificadorContext}/atributo/alterar`, JSON.stringify(atributo), this.httpOptions)
  }

  atributo_por_status(atributo: AtributoStatusDTO): Observable<Array<Atributo>> {
    const params = new URLSearchParams();

    for (let [param, value] of Object.entries(atributo)) {
      if (value || value === 0) {
        params.set(param, value);
      }
    }

    console.log(params.toString())
    return this.http.get<Array<Atributo>>(`${environment.api}/${environment.classificadorContext}/atributo/listar/atributo_status?${params.toString()}`)
  }

  atributo_por_stat(atributo: number): Observable<Array<Atributo>> {
    return this.http.get<Array<Atributo>>(`${environment.api}/${environment.classificadorContext}/atributo/listar/atributo_status/${atributo}`)
  }
}
