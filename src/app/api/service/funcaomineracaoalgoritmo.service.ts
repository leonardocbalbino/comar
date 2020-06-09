import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { FuncaoMineracaoAlgoritmo } from '../model/funcaoMineracaoAlgoritmo';



@Injectable({
  providedIn: 'root'
})
export class FuncaoMineracaoAlgoritmoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(algoritmoId: number): Observable<Array<FuncaoMineracaoAlgoritmo>> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Array<FuncaoMineracaoAlgoritmo>>(`${environment.api}/${environment.mineradorContext}/funcao_mineracao_algoritmo/listar/funcao_mineracao/${algoritmoId}`);
  }

  deletar(funcaoMineracaoAlgoritmoId: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/funcao_mineracao_algoritmo/deletar/${funcaoMineracaoAlgoritmoId}`);
  }
}
