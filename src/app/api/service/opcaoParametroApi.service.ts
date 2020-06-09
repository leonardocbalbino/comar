import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { OpcaoParametro } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class OpcaoParametroApi {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(paramentroId: number): Observable<Array<OpcaoParametro>> {
      // tslint:disable-next-line: max-line-length
    return this.http.get<Array<OpcaoParametro>>(`${environment.api}/${environment.mineradorContext}/opcoes-parametros/parametro/${paramentroId}`);
  }
}
