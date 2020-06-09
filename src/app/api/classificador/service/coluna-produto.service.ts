import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ColunaProduto } from '../models/coluna-produto';

@Injectable({
  providedIn: 'root'
})
export class ColunaProdutoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listarColunaProduto(produtoId: number): Observable<Array<ColunaProduto>> {

    const endpoint = `${environment.api}/${environment.classificadorContext}`;

    return this.http.get<Array<ColunaProduto>>(`${endpoint}/coluna_produto/listar/produto/${produtoId}`);

  }
}
