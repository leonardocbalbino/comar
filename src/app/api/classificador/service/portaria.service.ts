import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Portaria } from '../models/portaria';

@Injectable({
  providedIn: 'root'
})
export class PortariaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Portaria>> {
    return this.http.get<Array<Portaria>>(`${environment.api}/${environment.classificadorContext}/portaria/listar`)
  }

}
