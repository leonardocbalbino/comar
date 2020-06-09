import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AtributoModelo } from '../model/atributoModelo';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtributoModeloService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<AtributoModelo>> {
    return this.http.get<Array<AtributoModelo>>(`${environment.api}/${environment.mineradorContext}/atributo_modelo/listar`);
  }

  buscarAlvo(modeloId: number): Observable<AtributoModelo> {
    return this.http.get<AtributoModelo>(`${environment.api}/${environment.mineradorContext}/atributo_modelo/alvo/${modeloId}`);
  }

}
