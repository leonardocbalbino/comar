import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { SchemaDTO } from '../models/schema-dto';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<SchemaDTO>> {
    return this.http.get<Array<SchemaDTO>>(`${environment.api}/${environment.classificadorContext}/schema/listar`)
  }
}
