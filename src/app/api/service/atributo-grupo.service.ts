import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AtributoGrupo } from '../model/models';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtributoGrupoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  salvarTodos(atributoGrupos: Array<AtributoGrupo>): Observable<AtributoGrupo> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AtributoGrupo>(`${environment.api}/${environment.mineradorContext}/atributo_grupo/salvar_todos`, JSON.stringify(atributoGrupos), this.httpOptions);
  }

  listarGrupo(grupoId: number): Observable<AtributoGrupo[]> {
    return this.http.get<AtributoGrupo[]>(`${environment.api}/${environment.mineradorContext}/atributo_grupo/listar/grupo/${grupoId}`);
  }

  listar(atributoGrupoId: number): Observable<AtributoGrupo> {
    return this.http.get<AtributoGrupo>(`${environment.api}/${environment.mineradorContext}/atributo_grupo/listar/${atributoGrupoId}`);
  }
}
