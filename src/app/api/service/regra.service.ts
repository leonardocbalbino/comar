import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regra } from '../model/regra';
import { environment } from '@environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegraService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listarRegrasGrupo(grupoId: number): Observable<Regra> {
    return this.http.get<Regra>(`${environment.api}/${environment.mineradorContext}/regra/listar/grupo/${grupoId}`)
    .pipe(
      retry(1)
    );
  }

  listarRegrasAtributo(atributoId: number): Observable<Array<Regra>> {
    return this.http.get<Array<Regra>>(`${environment.api}/${environment.mineradorContext}/regra/listar/atributo/${atributoId}`)
    .pipe(
      retry(1)
    );
  }

  salvar(regra: Regra): Observable<Regra> {
    return this.http.post<Regra>(`${environment.api}/${environment.mineradorContext}/regra/salvar`, JSON.stringify(regra), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  salvarBatch(regra: Array<Regra>): Observable<Regra> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Regra>(`${environment.api}/${environment.mineradorContext}/regra/salvar_batch`, JSON.stringify(regra), this.httpOptions);
  }

}
