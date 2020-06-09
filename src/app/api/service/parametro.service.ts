import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Parametro, ParametroModelo } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Parametro>> {
    return this.http.get<Array<Parametro>>(`${environment.api}/${environment.mineradorContext}/parametros`);
  }

  salvar(parametro: Parametro): Observable<Parametro> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Parametro>(`${environment.api}/${environment.mineradorContext}/parametros`, JSON.stringify(parametro), this.httpOptions);
  }

  alterar(parametro: Parametro): Observable<Parametro> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Parametro>(`${environment.api}/${environment.mineradorContext}/parametros/${parametro.parametroId}`, JSON.stringify(parametro), this.httpOptions);
  }

  remover(parametroId: number): Observable<any> {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/parametros/${parametroId}`);
  }

  listaParametroTipo(): Observable<any> {
    return this.http.get(`${environment.api}/${environment.mineradorContext}/parametros/tipos`);
  }
  listaParametrosTipos(tipoParametroId: number): Observable<Parametro> {
    return this.http.get<Parametro>(`${environment.api}/${environment.mineradorContext}/parametros/tipos/${tipoParametroId}`);
  }
  listaParametroOrigem(): Observable<any> {
    return this.http.get(`${environment.api}/${environment.mineradorContext}/parametros/origens`);
  }
  listaParametroModelo(modeloId: number): Observable<Array<ParametroModelo>> {
    return this.http.get<Array<ParametroModelo>>(`${environment.api}/${environment.mineradorContext}/parametro_modelo/listar/${modeloId}`);
  }
  listaParametroFuncaoAlgoritmo(algoritmoId: number, funcaoId: number): Observable<Array<Parametro>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Array<Parametro>>(`${environment.api}/${environment.mineradorContext}/parametros/algoritmofuncao/${algoritmoId}/${funcaoId}`);
  }

  removerOpcaoParametro(opcaoParametroId: number): Observable<any> {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/parametros/opcao-parametro/${opcaoParametroId}`);
  }
}
