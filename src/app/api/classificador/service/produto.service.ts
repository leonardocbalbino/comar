import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ProdutoDTO } from '../models/produto-dto';
import { Produto } from '../models/produto';
import { Pageable } from '@app/shared/pagination/pageable';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listar(): Observable<Array<Produto>> {
    return this.http.get<Array<Produto>>(`${environment.api}/${environment.classificadorContext}/produto/listar`);
  }

  listarHierarquia(hierarquiaId: number): Observable<Array<Produto>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Array<Produto>>(`${environment.api}/${environment.classificadorContext}/produto/listar/hierarquia/${hierarquiaId}`);
  }

  buscar(page: number, size: number, hierarquiaId: number, produtoNome: string): Observable<Pageable<ProdutoDTO>> {
    // tslint:disable-next-line: max-line-length
    if(hierarquiaId == null && produtoNome == null)
      return this.http.get<Pageable<ProdutoDTO>>(`${environment.api}/${environment.classificadorContext}/produto/buscar?page=${page}&size=${size}&hierarquiaId&produtoNome`);

    return this.http.get<Pageable<ProdutoDTO>>(`${environment.api}/${environment.classificadorContext}/produto/buscar?page=${page}&size=${size}&hierarquiaId=${hierarquiaId}&produtoNome=${produtoNome}`);
  }
}
