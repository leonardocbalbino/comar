import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { DbaSchema, DbaTable, DbaColumns } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private http: HttpClient) { }

  tabelas(schema: string): Observable<Array<DbaTable>> {
    if (schema === null || schema === undefined) {
      throw new Error('Required parameter schema was null or undefined.');
    }
    return this.http.get<Array<DbaTable>>(`${environment.api}/${environment.mineradorContext}/fonte/schema/tabelas/${schema}`)
    .pipe(
      retry(1)
    );
  }

  colunas(schema: string, tabela: string): Observable<Array<DbaColumns>> {
    if (schema === null || schema === undefined) {
      throw new Error('Required parameter schema was null or undefined.');
    }
    if (tabela === null || tabela === undefined) {
      throw new Error('Required parameter tabela was null or undefined.');
    }
    return this.http.get<Array<DbaColumns>>(`${environment.api}/${environment.mineradorContext}/fonte/schema/colunas/${schema}/${tabela}`)
    .pipe(
      retry(1)
    );
  }

  listar(): Observable<Array<DbaSchema>> {
    return this.http.get<Array<DbaSchema>>(`${environment.api}/${environment.mineradorContext}/schema/listar`);
  }

  listarTodos(): Observable<Array<DbaSchema>> {
    return this.http.get<Array<DbaSchema>>(`${environment.api}/${environment.mineradorContext}/visibilidades/schemas`);
  }
}
