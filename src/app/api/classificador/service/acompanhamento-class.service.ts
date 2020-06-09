import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClassificacaoRequest } from '../models/classificacao-request';
import { Pageable } from '@app/shared/pagination/pageable';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { AcompanhamentoClassificacaoAuto } from '../models/acompanhamento-classificacao-auto';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoClassificacaoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  localizar(classParams: ClassificacaoRequest, page: number, size: number):
   Observable<Pageable<AcompanhamentoClassificacaoAuto>> {
    return this.localizarTodos('AUTOMATICA', classParams, page, size);
  }

  localizarTodos(tipoClass: string, classParams: ClassificacaoRequest, page: number, size: number):
   Observable<Pageable<AcompanhamentoClassificacaoAuto>> {

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

    const endpoint = `${environment.api}/${environment.classificadorContext}`;

    // tslint:disable-next-line: max-line-length
    return this.http.get<Pageable<AcompanhamentoClassificacaoAuto>>(`${endpoint}/classificacao_auto/pesquisar/${tipoClass}?${params.toString()}`);

  }
}
