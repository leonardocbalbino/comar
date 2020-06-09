import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-classificacao-manual-item-visualizar',
  templateUrl: './classificacao-manual-item-visualizar.component.html',
  styleUrls: ['./classificacao-manual-item-visualizar.component.css']
})
export class ClassificacaoManualItemVisualizarComponent implements OnInit {
  nav: Navigation;
  cnpj: string;
  nfe: string;
  chave: string;
  protocolo: string;
  precisao: string;
  fator: string;
  produto: string;
  ncm: string;
  valor: string;
  date1: Date;
  pt: any;

  constructor(private router: Router, private location: Location) {
    this.nav = router.getCurrentNavigation();
  }

  ngOnInit() {
    if (this.nav.extras.state != null) {
      this.cnpj = this.nav.extras.state.data.fonteAlias;
      this.nfe = this.nav.extras.state.data.fonteNome;
      this.chave = this.nav.extras.state.data.fonteSchema;
      this.protocolo = this.nav.extras.state.data.fonteAlias;
      this.precisao = this.nav.extras.state.data.fonteNome;
      this.fator = this.nav.extras.state.data.fonteSchema;
      this.produto = this.nav.extras.state.data.fonteAlias;
      this.ncm = this.nav.extras.state.data.fonteNome;
      this.valor = this.nav.extras.state.data.fonteSchema;
    }

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  voltar() {
    this.location.back();
  }
}
