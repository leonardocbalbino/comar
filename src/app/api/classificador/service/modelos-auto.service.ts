import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ModelosAuto } from '../models/modelos-auto';
import { ModelosAutoRequest } from '../models/modelos-auto-request';
import { ModelosAutoResponse } from '../models/modelos-auto-response';
import { Pageable } from '@app/shared/pagination/pageable';

@Injectable({
  providedIn: 'root'
})
export class ModelosAutoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(classParams: ModelosAutoRequest, page: number, size: number): Observable<Pageable<ModelosAutoResponse>> {
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

    return this.http.get<Pageable<ModelosAutoResponse>>(`${endpoint}/modelos_auto/listar?${params.toString()}`);
  }

  salvar(modeloAuto: ModelosAuto): Observable<ModelosAuto> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<ModelosAuto>(`${environment.api}/${environment.classificadorContext}/modelos_auto/salvar`, JSON.stringify(modeloAuto), this.httpOptions)
  }

  alterar(modelosAuto: ModelosAuto): Observable<ModelosAuto> {
    return this.http.put<ModelosAuto>(`${environment.api}/${environment.classificadorContext}/modelos_auto/alterar`, JSON.stringify(modelosAuto), this.httpOptions)
  }
}
