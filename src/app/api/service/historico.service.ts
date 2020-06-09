import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Historico } from '../model/historico';



@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(modeloId: number): Observable<Array<Historico>> {
    return this.http.get<Array<Historico>>(`${environment.api}/${environment.mineradorContext}/historico/listar/modelo/${modeloId}`)
      .pipe(
        retry(1)
      );
  }

  detalhe(historicoId: number): Observable<Historico> {
    return this.http.get<Historico>(`${environment.api}/${environment.mineradorContext}/historico/listar/historico/${historicoId}`)
      .pipe(
        retry(1)
      );
  }
}
