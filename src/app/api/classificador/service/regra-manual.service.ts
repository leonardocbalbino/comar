import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { RegraManualRequest } from '../models/regra-manual-request';
import { RegraManualResponse } from '../models/regra-manual-response';
import { RegraManual } from '@app/api/classificador/models/regra-manual'
import { Pageable } from '@app/shared/pagination/pageable';

@Injectable({
  providedIn: 'root'
})
export class RegraManualService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(classParams: RegraManualRequest, page: number, size: number): Observable<Pageable<RegraManualResponse>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));


    for (let [param, value] of Object.entries(classParams)) {
      if (value || value === 0) {
        if (param.includes('regraManualDataCadastro')) {
          value = value.toISOString().substring(0, 10);
        }
        params.set(param, value);
      }
    }

    const endpoint = `${environment.api}/${environment.classificadorContext}`;

    return this.http.get<Pageable<RegraManualResponse>>(`${endpoint}/regra_manual/listar?${params.toString()}`)
  }

  listarPorId(regra: Number): Observable<RegraManual> {
    return this.http.get<RegraManual>(`${environment.api}/${environment.classificadorContext}/regra_manual/${regra}`)
  }

  remover(regraManualId: number): Observable<RegraManual> {
    return this.http.delete(`${environment.api}/${environment.classificadorContext}/regra_manual/${regraManualId}`);
  }

  salvar(regra: RegraManual): Observable<RegraManual> {
    return this.http.post<RegraManual>(`${environment.api}/${environment.classificadorContext}/regra_manual/salvar`, JSON.stringify(regra), this.httpOptions)
  }
}
