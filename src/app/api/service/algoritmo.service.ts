import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Algoritmo } from '../model/algoritmo';



@Injectable({
  providedIn: 'root'
})
export class AlgoritmoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(algoritmoId: number): Observable<Algoritmo> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Algoritmo>(`${environment.api}/${environment.mineradorContext}/funcao_mineracao_algoritmo/listar/algoritmo/${algoritmoId}`);
  }

  listarAlgoritmos(): Observable<Algoritmo[]> {
    return this.http.get<Algoritmo[]>(`${environment.api}/${environment.mineradorContext}/algoritmos/listar`);
  }

  salvar(algoritmo: Algoritmo): Observable<Algoritmo> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Algoritmo>(`${environment.api}/${environment.mineradorContext}/algoritmos`, JSON.stringify(algoritmo), this.httpOptions);
  }

  alterar(algoritmo: Algoritmo): Observable<Algoritmo> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Algoritmo>(`${environment.api}/${environment.mineradorContext}/algoritmos/${algoritmo.algoritmoId}`, JSON.stringify(algoritmo), this.httpOptions);
  }

  deletar(algoritmoId: number): Observable<any> {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/algoritmos/${algoritmoId}`);
  }
}
