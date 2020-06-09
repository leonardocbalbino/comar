import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Origem } from '../model/origem';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrigemService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Origem>> {
    return this.http.get<Array<Origem>>(`${environment.api}/${environment.mineradorContext}/origens-integracao`);
  }

  salvar(origem: Origem): Observable<Origem> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Origem>(`${environment.api}/${environment.mineradorContext}/origens-integracao`, JSON.stringify(origem), this.httpOptions);
  }

  alterar(origem: Origem): Observable<Origem> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Origem>(`${environment.api}/${environment.mineradorContext}/origens-integracao/${origem.origemId}`, JSON.stringify(origem), this.httpOptions);
  }

  remover(origemId: number): Observable<any> {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/origens-integracao/${origemId}`);
  }
}
