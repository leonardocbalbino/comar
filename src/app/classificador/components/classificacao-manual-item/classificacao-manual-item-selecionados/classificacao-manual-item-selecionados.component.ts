import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { FonteService } from '@app/api/service/fonte.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-classificacao-manual-item-selecionados',
  templateUrl: './classificacao-manual-item-selecionados.component.html',
  styleUrls: ['./classificacao-manual-item-selecionados.component.css']
})
export class ClassificacaoManualItemSelecionadosComponent implements OnInit {
  //fontes$: Observable<Fonte[]>;
  colunas: any;

  constructor(/*private fonteService: FonteService,*/ private location: Location) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'fonteAlias', cabecalho: 'N° NF-e' },
      { campo: 'fonteSchema', cabecalho: 'Cnpj Dest' },
      { campo: 'fonteNome', cabecalho: 'Cnpj Emit' },
      { campo: 'fonteAlias', cabecalho: 'Dt Emissão' },
      { campo: 'fonteSchema', cabecalho: 'Dt Classificação' },
      { campo: 'fonteNome', cabecalho: 'NCM' },
      { campo: 'fonteAlias', cabecalho: 'GTIN' },
      { campo: 'fonteSchema', cabecalho: 'CST' },
    ];
    // this.fontes$ = this.fonteService.listar();
  }

  voltar() {
    this.location.back();
  }
}
