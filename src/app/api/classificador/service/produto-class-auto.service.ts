import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ClassificacaoManual } from '../models/classificacao-manual';
import { ClassificacaoRequest } from '../models/classificacao-request';
import { Pageable } from '@app/shared/pagination/pageable';
import { ClassificacaoManualDetalhe } from '../models/classificacao-manual-detalhe';

@Injectable({
  providedIn: 'root'
})
export class ProdutoClassAutoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(classParams: ClassificacaoRequest, page: number, size: number): Observable<Pageable<ClassificacaoManual>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));


    for (let [param, value] of Object.entries(classParams)) {
      if (value || value === 0) {
        if (param.includes('data')) {
          value = value.toISOString().substring(0, 10);
        }
        params.set(param, value);
      }
    }
    // tslint:disable-next-line: max-line-length
    return this.http.get<Pageable<ClassificacaoManual>>(`${environment.api}/${environment.classificadorContext}/classificacao_auto/pesquisar/classificacao_manual?${params.toString()}`);
  }

  detalhar(produtoId: number, page: number, size: number): Observable<Pageable<ClassificacaoManualDetalhe>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Pageable<ClassificacaoManualDetalhe>>(`${environment.api}/${environment.classificadorContext}/classificacao_auto/detalhes/produto/${produtoId}?page=${page}&size=${size}`);
  }

}
