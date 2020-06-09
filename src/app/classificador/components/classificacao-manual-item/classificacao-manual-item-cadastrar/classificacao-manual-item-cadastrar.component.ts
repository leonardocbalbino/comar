import { Component, OnInit } from '@angular/core';
import { FonteService } from '@app/api/service/fonte.service';
import { Router, Navigation } from '@angular/router';
import { Fonte } from '@app/api/model/fonte';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-classificacao-manual-item-cadastrar',
  templateUrl: './classificacao-manual-item-cadastrar.component.html',
  styleUrls: ['./classificacao-manual-item-cadastrar.component.css']
})
export class ClassificacaoManualItemCadastrarComponent implements OnInit {
  nav: Navigation;
  data: string;
  nfe: string;
  precisao: string;
  produto: string;
  //fontes$: Observable<Fonte[]>;
  colunas: any;

  constructor(/*private fonteService: FonteService,*/ private router: Router, private location: Location) {
    this.nav = router.getCurrentNavigation();
  }

  ngOnInit() {
    if (this.nav.extras.state != null) {
      this.nfe = this.nav.extras.state.data.fonteAlias;
      this.precisao = this.nav.extras.state.data.fonteNome;
      this.produto = this.nav.extras.state.data.fonteSchema;
      this.data = this.nav.extras.state.data.fonteSchema;
    }
    this.colunas = [
      { campo: 'fonteNome', cabecalho: 'Item' },
      { campo: 'fonteAlias', cabecalho: 'Classificação' },
      { campo: 'fonteAlias', cabecalho: 'Segmento' },
    ];
    //this.fontes$ = this.fonteService.listar();
  }

  voltar() {
    this.location.back();
  }
}
