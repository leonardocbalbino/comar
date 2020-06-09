import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { FonteService } from '@app/api/service/fonte.service';


@Component({
  selector: 'app-selecao-modelos-catalogo-automatico-list',
  templateUrl: './selecao-modelos-catalogo-automatico-list.component.html',
  styleUrls: ['./selecao-modelos-catalogo-automatico-list.component.css']
})
export class SelecaoModelosCatalogoAutomaticoListComponent implements OnInit {
  //fontes$: Observable<Fonte[]>;
  colunas: any;

  constructor(private location: Location/*, private fonteService: FonteService*/) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'fonteNome', cabecalho: 'Nome' },
      { campo: 'fonteAlias', cabecalho: 'Grupo' },
      { campo: 'fonteSchema', cabecalho: 'Função' },
      { campo: 'fonteNome', cabecalho: 'Algoritmo' },
      { campo: 'fonteSchema', cabecalho: 'Criação' },
    ];
    //this.fontes$ = this.fonteService.listar();
  }

  voltar() {
    this.location.back();
  }
}
