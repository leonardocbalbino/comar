import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Pasta } from '../model/pasta';
import { Tree } from 'primeng/tree';

@Injectable({
  providedIn: 'root'
})
export class PastaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  pastasRaizes(fonteId: number): Observable<Array<Pasta>> {
    if (fonteId === null || fonteId === undefined) {
      throw new Error('Required parameter fonteId was null or undefined.');
    }
    return this.http.get<Array<Pasta>>(`${environment.api}/${environment.mineradorContext}/pasta/pastas_raizes/${fonteId}`);
  }

  pastaFilhas(pastaPaiId: number): Observable<Array<Pasta>> {
    return this.http.get<Array<Pasta>>(`${environment.api}/${environment.mineradorContext}/pasta/pastas_filhas/${pastaPaiId}`);
  }

  salvar(pasta: Pasta): Observable<Pasta> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Pasta>(`${environment.api}/${environment.mineradorContext}/pasta/salvar`, JSON.stringify(pasta), this.httpOptions);
  }

  alterar(pasta: Pasta): Observable<Pasta> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Pasta>(`${environment.api}/${environment.mineradorContext}/pasta/alterar`, JSON.stringify(pasta), this.httpOptions);
  }

  remover(pastaId: number) {
    return this.http.delete<any>(`${environment.api}/${environment.mineradorContext}/pasta/remover/${pastaId}`, this.httpOptions);
  }

  listar(fonteId: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${environment.api}/${environment.mineradorContext}/pasta/listar/${fonteId}`);
  }
}
