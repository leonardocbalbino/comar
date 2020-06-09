import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Pageable } from '@app/shared/pagination/pageable';
import ItemClassificacaoManualResponse from '../models/item-classificacao-response';
import { ManutencaoClassificacao } from '../models/manutencao-reclassificacao';
import { ItemClassificacaoManual } from '../models/item-classificacao-manual';
import { UsuarioService } from '@app/api/service/usuario.service';
import { Algoritmo } from '@app/api/model/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemClassificacaoManualService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authenticationService: UsuarioService) { }

  buscar(manutParams: ManutencaoClassificacao, page: number, size: number) {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));


    for (let [param, value] of Object.entries(manutParams)) {
      if (value || value === 0) {
        if (param.includes('data')) {
          value = value.toISOString().substring(0, 10);
        }
        params.set(param, value);
      }
    }

    const endpoint = `${environment.api}/${environment.classificadorContext}`;

    return this.http.get<Pageable<ItemClassificacaoManualResponse>>(`${endpoint}/item_classificacao_manual/buscar?${params.toString()}`);

  }

  salvar(notaItemId: number, classAutoId: number, produtoId: number) {
    const currentUser = this.authenticationService.currentUserValue;
    const itemManual: ItemClassificacaoManual = {
      classificacaoAuto: {
        classificacaoAutoId: classAutoId
      },
      notaIten: {
        notasItensId: notaItemId
      },
      usuario: {
        usuarioId: currentUser.usuarioId
      },
      produto: {
        produtoId
      }
    };

    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.api}/${environment.classificadorContext}/item_classificacao_manual/salvar`, JSON.stringify(itemManual), this.httpOptions);

  }

  buscarPorId(itemClassificacaoManualId: number): Observable<ItemClassificacaoManualResponse> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<ItemClassificacaoManualResponse>(`${environment.api}/${environment.classificadorContext}/item_classificacao_manual/${itemClassificacaoManualId}`);
  }
}
