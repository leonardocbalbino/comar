import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { DadosTeste } from '../model/dadosTeste';
import { Resultado, Acuracia } from '../model/resultado';



@Injectable({
  providedIn: 'root'
})
export class DadosTesteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  mediaacuracia(modeloId: number): Observable<Acuracia> {
    return this.http.get<Acuracia>(`${environment.api}/${environment.mineradorContext}/dadosteste/mediaacuracia/${modeloId}`)
      .pipe(
        retry(1)
      );
  }
  previsao(historicoId: number): Observable<Resultado> {
    return this.http.get<Resultado>(`${environment.api}/${environment.mineradorContext}/dadosteste/previsao/${historicoId}`);
  }
  analiseAcertos(historicoId: number): Observable<Resultado> {
    return this.http.get<Resultado>(`${environment.api}/${environment.mineradorContext}/dadosteste/analiseAcerto/${historicoId}`);
  }
  matrizDesempenho(historicoId: number): Observable<Resultado> {
    return this.http.get<Resultado>(`${environment.api}/${environment.mineradorContext}/dadosteste/matrizdesempenho/${historicoId}`);
  }
}
