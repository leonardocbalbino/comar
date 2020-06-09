import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hierarquia } from '../models/hierarquia';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HierarquiaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Hierarquia>> {
    return this.http.get<Array<Hierarquia>>(`${environment.api}/${environment.classificadorContext}/hierarquia/listar`);
  }
}
