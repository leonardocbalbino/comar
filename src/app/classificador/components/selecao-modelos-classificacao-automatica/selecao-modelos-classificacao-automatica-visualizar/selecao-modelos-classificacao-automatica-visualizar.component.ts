import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ParametroModeloService } from '@app/api/service/parametro-modelo.service';
import { ModeloService } from '@app/api/service/modelo.service';
import { Observable } from 'rxjs';
import { ParametroModelo } from '@app/api/model/parametroModelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecao-modelos-classificacao-automatica-visualizar',
  templateUrl: './selecao-modelos-classificacao-automatica-visualizar.component.html',
  styleUrls: ['./selecao-modelos-classificacao-automatica-visualizar.component.css']
})
export class SelecaoModelosClassificacaoAutomaticaVisualizarComponent implements OnInit {
  parametros$: Observable<ParametroModelo[]>;
  colunasAtributosRegra: any;
  dados: any
  pt: any
  atributoAlvo: any
  atributoChave: any

  constructor(private location: Location, private router: Router, private modeloService: ModeloService, private parametroModeloService: ParametroModeloService) { }

  ngOnInit() {
    this.dados = history.state.data
    if(!this.dados){
      this.dados = JSON.parse(localStorage.getItem("modeloSelecaoAuto"))
    }else{
      localStorage.setItem("modeloSelecaoAuto", JSON.stringify(this.dados));
    }

    if (this.dados) {
      this.modeloService.listaAtributoModelo().subscribe((doc) => {
        doc.forEach((atributo) => {
          if (atributo.atributoModeloTipo === 'ALVO' && atributo.modelo.modeloId === this.dados.modeloId) {
            this.atributoAlvo = atributo;
          }
          if (atributo.atributoModeloTipo === 'CHAVE' && atributo.modelo.modeloId === this.dados.modeloId) {
            this.atributoChave = atributo;
          }
        });
      });
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

    this.colunasAtributosRegra = [
      { campo: 'parametro.parametroTipo', cabecalho: 'Tipo Parâmetro' },
      { campo: 'parametro.parametroAlias', cabecalho: 'Parâmetro' },
      { campo: 'parametroModeloValor', cabecalho: 'Valor' },
    ];

    if (this.dados)
      this.parametros$ = this.parametroModeloService.listaPorModelo(this.dados.modeloId)
  }

  voltar() {
    this.location.back();
  }

  mapear() {
    this.router.navigate(['classificador/mapeamento-visualizar'], { state: { data: this.dados } });
  }
}
