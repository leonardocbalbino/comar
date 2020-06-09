import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { DbaSchema, DbaTable, DbaColumns } from '../model/models';
import Visibilidade from '../model/visibilidade';

@Injectable({
  providedIn: 'root'
})
export class VisibilidadeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  salvar(visibilidade: Visibilidade[]): Observable<Visibilidade[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<Visibilidade[]>(`${environment.api}/${environment.mineradorContext}/visibilidades`, JSON.stringify(visibilidade), this.httpOptions);
  }
}
