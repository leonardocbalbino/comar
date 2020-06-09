import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { FuncaoMineracao } from '../model/funcaoMineracao';



@Injectable({
  providedIn: 'root'
})
export class FuncaoMineracaoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<FuncaoMineracao>> {
    return this.http.get<Array<FuncaoMineracao>>(`${environment.api}/${environment.mineradorContext}/funcao_mineracao/listar`);
  }

  salvar(funcaoMineracao: FuncaoMineracao): Observable<FuncaoMineracao> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<FuncaoMineracao>(`${environment.api}/${environment.mineradorContext}/funcao_mineracao/salvar`, JSON.stringify(funcaoMineracao), this.httpOptions);
  }

  deletar(funcaoMineracaoId: number): Observable<any> {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/funcao_mineracao/deletar/${funcaoMineracaoId}`);
  }
}
