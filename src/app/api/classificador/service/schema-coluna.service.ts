import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { SchemaColunaDTO } from '../models/schema-coluna-dto';

@Injectable({
  providedIn: 'root'
})
export class SchemaColunaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(schema: string, schemaTabela: string): Observable<Array<SchemaColunaDTO>> {
    return this.http.get<Array<SchemaColunaDTO>>(`${environment.api}/${environment.classificadorContext}/schema_coluna/listar/${schema}/${schemaTabela}`)
  }
}
