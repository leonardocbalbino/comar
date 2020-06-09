import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { RegraProduto } from '../models/regra-produto';

@Injectable({
  providedIn: 'root'
})
export class RegraProdutoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<RegraProduto>> {
    return this.http.get<Array<RegraProduto>>(`${environment.api}/${environment.classificadorContext}/regra_produto/listar`)
  }

  salvar(regra: RegraProduto): Observable<RegraProduto> {
    return this.http.post<RegraProduto>(`${environment.api}/${environment.classificadorContext}/regra_produto/salvar`, JSON.stringify(regra))
  }

  salvar_todos(regra: Array<RegraProduto>): Observable<Array<RegraProduto>> {
    return this.http.post<Array<RegraProduto>>(`${environment.api}/${environment.classificadorContext}/regra_produto/salvar_todos`, JSON.stringify(regra), this.httpOptions)
  }
}
