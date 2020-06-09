import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { RegrasDetalhe } from '../models/regras-detalhe';

@Injectable({
  providedIn: 'root'
})
export class RegraDetalheService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  salvar_todos(regra: RegrasDetalhe[]): Observable<RegrasDetalhe[]> {
    return this.http.post<RegrasDetalhe[]>(`${environment.api}/${environment.classificadorContext}/regras_detalhe/salvar_todos`, JSON.stringify(regra), this.httpOptions)
  }
}
