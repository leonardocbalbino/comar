import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Atributo } from '../model/atributo';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(pastaId: number, fonteId: number): Observable<Array<Atributo>> {
    if (!pastaId && fonteId) {
      return this.http.get<Array<Atributo>>(`${environment.api}/${environment.mineradorContext}/atributo/listar/pastas/fonte/${fonteId}`)
    .pipe(
      retry(1)
    );
    }
    return this.http.get<Array<Atributo>>(`${environment.api}/${environment.mineradorContext}/atributo/listar/pasta/${pastaId}`)
    .pipe(
      retry(1)
    );
  }

  listarFontes(fonteId: number): Observable<Array<Atributo>> {
    return this.http.get<Array<Atributo>>(`${environment.api}/${environment.mineradorContext}/atributo/listar/fonte/${fonteId}`);
  }

  salvar(atributo: Atributo): Observable<Atributo> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Atributo>(`${environment.api}/${environment.mineradorContext}/atributo/salvar`, JSON.stringify(atributo), this.httpOptions);
  }

  remover(atributoId: number): Observable<any>  {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/atributo/remover/${atributoId}`);
  }

  alterar(atributo: Atributo): Observable<Atributo> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Atributo>(`${environment.api}/${environment.mineradorContext}/atributo/alterar`, JSON.stringify(atributo), this.httpOptions);
  }
}
