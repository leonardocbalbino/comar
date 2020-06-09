import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { ParametroModelo } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class ParametroModeloService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listaPorModelo(modelo: number): Observable<Array<ParametroModelo>> {
    return this.http.get<Array<ParametroModelo>>(`${environment.api}/${environment.mineradorContext}/parametro_modelo/listar/${modelo}`);
  }
}
