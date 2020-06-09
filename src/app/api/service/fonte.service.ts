import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Fonte } from '../model/fonte';



@Injectable({
  providedIn: 'root'
})
export class FonteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(parametro: string): Observable<Array<Fonte>> {
    return this.http.get<Array<Fonte>>(`${environment.api}/${environment.mineradorContext}/fonte/listar/${parametro}`);
  }

  salvar(fonte: Fonte): Observable<Fonte> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Fonte>(`${environment.api}/${environment.mineradorContext}/fonte/salvar`, JSON.stringify(fonte), this.httpOptions);
  }

  upload(arquivo: any, nome: string): any {
    const input = new FormData();
    input.append('file', arquivo);
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${environment.api}/${environment.mineradorContext}/fonte/upload/${nome}`, input);
  }

  deletar(fonteId: number): Observable<any> {
    return this.http.delete(`${environment.api}/${environment.mineradorContext}/fonte/${fonteId}`);
  }
}
