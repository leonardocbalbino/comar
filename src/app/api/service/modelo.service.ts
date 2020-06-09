import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Modelo } from '../model/modelo';
import { ParametroModelo } from '../model/parametroModelo';
import { AtributoModelo } from '../model/atributoModelo';



@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Modelo>> {
    return this.http.get<Array<Modelo>>(`${environment.api}/${environment.mineradorContext}/modelo/listar`)
      .pipe(
        retry(1)
      );
  }
  salvar(modelo: Modelo): Observable<Modelo> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Modelo>(`${environment.api}/${environment.mineradorContext}/modelo/salvar`, JSON.stringify(modelo), this.httpOptions);
  }
  salvarParametro(parametro: ParametroModelo): Observable<Array<ParametroModelo>> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Array<ParametroModelo>>(`${environment.api}/${environment.mineradorContext}/parametro_modelo/salvar`, JSON.stringify(parametro), this.httpOptions);
  }
  removeParametroModelo(parametro: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/parametro_modelo/${parametro}`);
  }
  salvarAtributoModelo(atributloModelo: AtributoModelo): Observable<AtributoModelo> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<AtributoModelo>(`${environment.api}/${environment.mineradorContext}/atributo_modelo/salvar`, JSON.stringify(atributloModelo), this.httpOptions);
  }
  removeAtributoModelo(atributoId: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/atributo_modelo/${atributoId}`);
  }
  listaAtributoModelo(): Observable<Array<AtributoModelo>> {
    return this.http.get<Array<AtributoModelo>>(`${environment.api}/${environment.mineradorContext}/atributo_modelo/listar`)
      .pipe(
        retry(1)
      );
  }
  alterar(modelo: Modelo): Observable<Array<Modelo>> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Array<Modelo>>(`${environment.api}/${environment.mineradorContext}/modelo/alterar`, JSON.stringify(modelo), this.httpOptions)
      .pipe(
        retry(1)
      );
  }
  treinar(modelo: Modelo): Observable<Array<Modelo>> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Array<Modelo>>(`${environment.api}/${environment.mineradorContext}/modelo/treinar`, JSON.stringify(modelo), this.httpOptions);
  }
  testar(modelo: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.api}/${environment.mineradorContext}/modelo/teste_externo`, JSON.stringify(modelo), this.httpOptions);
  }
  deletar(modelo: number): Observable<Array<Modelo>> {
    // tslint:disable-next-line: max-line-length
    return this.http.delete<Array<Modelo>>(`${environment.api}/${environment.mineradorContext}/modelo/${modelo}`);
  }
  verificaGrupo(modelo: number, grupo: number): Observable<Array<Modelo>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Array<Modelo>>(`${environment.api}/${environment.mineradorContext}/modelo/verificagrupo/${grupo}/${modelo}`);
  }
  comparaModelo(modelo): Observable<Array<Modelo>> {
    return this.http.get<Array<Modelo>>(`${environment.api}/${environment.mineradorContext}/modelo/comparamodelo/${modelo}`);
  }
  buscarPorId(modeloId: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${environment.api}/${environment.mineradorContext}/${modeloId}`);
  }
}
