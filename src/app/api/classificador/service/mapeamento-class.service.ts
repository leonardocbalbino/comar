import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Pageable } from '@app/shared/pagination/pageable';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { MapeamentoAtributoModeloRequest } from '../models/mapeamento-atributo-modelo-request';
import { ModelosAuto } from '../models/modelos-auto';
import { Modelo } from '@app/api/model/modelo';

@Injectable({
  providedIn: 'root'
})
export class MapeamentoClassService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  localizar(classParams: MapeamentoAtributoModeloRequest, page: number, size: number): Observable<Pageable<ModelosAuto>> {

    const params = new URLSearchParams();
    params.set('page', String(page));
    if(size != 0){
      params.set('size', String(size));
    }

    for (let [param, value] of Object.entries(classParams)) {
      if (value || value === 0) {
        if (param.includes('data')) {
          value = value.toISOString().substring(0, 10);
        }
        params.set(param, value);
      }
    }

    const endpoint = `${environment.api}/${environment.classificadorContext}`;

    return this.http.get<Pageable<ModelosAuto>>(`${endpoint}/modelos_auto/listar?${params.toString()}`);

  }

}
