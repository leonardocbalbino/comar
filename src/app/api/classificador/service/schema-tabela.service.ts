import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { SchemaTabelaDTO } from '../models/schema-tabela-dto';

@Injectable({
  providedIn: 'root'
})
export class SchemaTabelaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(schemaTabela: string): Observable<Array<SchemaTabelaDTO>> {
    return this.http.get<Array<SchemaTabelaDTO>>(`${environment.api}/${environment.classificadorContext}/schema_tabela/listar/${schemaTabela}`)
  }
}
