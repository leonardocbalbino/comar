import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { RegraManualRequest } from '../models/regra-manual-request';
import { ConfigAgenteResponse } from '../models/config-agente-response';
import { ConfigAgente } from '@app/api/classificador/models/config-agente'
import { Pageable } from '@app/shared/pagination/pageable';

@Injectable({
  providedIn: 'root'
})
export class ConfigAgenteService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(modeloId: number, page: number, size: number): Observable<Pageable<ConfigAgenteResponse>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));

    const endpoint = `${environment.api}/${environment.classificadorContext}`;

    return this.http.get<Pageable<ConfigAgenteResponse>>(`${endpoint}/config_agente/listar/${modeloId}?${params.toString()}`)
  }

  salvar(config: ConfigAgente): Observable<ConfigAgente> {
    return this.http.post<ConfigAgente>(`${environment.api}/${environment.classificadorContext}/config_agente/salvar`, JSON.stringify(config), this.httpOptions)
  }

  alterar(config: ConfigAgente): Observable<ConfigAgente> {
    return this.http.put<ConfigAgente>(`${environment.api}/${environment.classificadorContext}/config_agente/alterar`, JSON.stringify(config), this.httpOptions)
  }
}
