import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { retry } from 'rxjs/operators';
import { Catalogo } from '../models/catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  listar(): Observable<Array<Catalogo>> {
    return this.http.get<Array<Catalogo>>(`${environment.api}/${environment.classificadorContext}/catalogo/listar`)
  }
}
