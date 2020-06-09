import { Injectable } from '@angular/core';
import { Grupo } from '../model/grupo';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resultado, Estatisticas } from '../model/resultado';
import { Atributo, Regra, AtributoGrupo } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(parametro:string): Observable<Array<Grupo>> {
    return this.http.get<Array<Grupo>>(`${environment.api}/${environment.mineradorContext}/grupo/listar/${parametro}`);
  }

  salvar(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${environment.api}/${environment.mineradorContext}/grupo/salvar`, JSON.stringify(grupo), this.httpOptions);
  }

  explorarDados(grupoId: number): Observable<Resultado> {
    return this.http.get<Resultado>(`${environment.api}/${environment.mineradorContext}/grupo/explorar_dados/${grupoId}`);
  }

  explorarEstatisticas(grupoId: number): Observable<Estatisticas> {
    return this.http.get<Estatisticas>(`${environment.api}/${environment.mineradorContext}/grupo/explorar_estatisticas/${grupoId}`);
  }

  salvarRegrasAtributoGrupos(regra: Regra, atributosGrupo: Array<AtributoGrupo>, grupo: Grupo): Observable<any> {
    const obj = {
      regra,
      grupo,
      atributosGrupo
    };
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.api}/${environment.mineradorContext}/grupo/regra_atributo/salvar`, JSON.stringify(obj), this.httpOptions);
  }

  exibirSQL(regra: Regra, atributosGrupo: Array<AtributoGrupo>, grupo: Grupo): Observable<any> {
    const obj = {
      grupo,
      atributosGrupo,
      regra,
    };
    return this.http.post(`${environment.api}/${environment.mineradorContext}/grupo/exibir_sql`, JSON.stringify(obj), this.httpOptions);
  }

  deletar(grupoId: number): Observable<any> {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/grupo/${grupoId}`);
  }
}
