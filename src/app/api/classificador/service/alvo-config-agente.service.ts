import { Injectable } from '@angular/core';
import { AlvoConfigAgente } from '../models/alvo-config-agente';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlvoConfigAgenteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  salvar(alvoConfigAgente: AlvoConfigAgente): Observable<AlvoConfigAgente> {
    return this.http.post<AlvoConfigAgente>(`${environment.api}/${environment.classificadorContext}/alvo_config_agente/salvar`, JSON.stringify(alvoConfigAgente), this.httpOptions)
  }

}
