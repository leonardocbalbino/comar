import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Pageable } from '@app/shared/pagination/pageable';
import { RegraManualService } from '@app/api/classificador/service/regra-manual.service'

@Component({
  selector: 'app-regras-manuais-classificacao-visualizar',
  templateUrl: './regras-manuais-classificacao-visualizar.component.html',
  styleUrls: ['./regras-manuais-classificacao-visualizar.component.css']
})
export class RegrasManuaisClassificacaoVisualizarComponent implements OnInit {

  dados: any;
  prod: any = [];
  colunasAtributosRegra: any;
  colunasRegras: any;

  constructor(private location: Location, private router: Router, private regraManualService: RegraManualService) { }

  ngOnInit() {
    this.dados = history.state.data;
    if(!this.dados){
      this.dados = JSON.parse(localStorage.getItem("regraManual"))
    }else{
      localStorage.setItem("regraManual", JSON.stringify(this.dados));
    }
    if(this.dados)
      this.prod = this.dados.regraProdutos;

    this.colunasRegras = [
      { campo: 'produto.produtoNome', cabecalho: 'Produto' },
      { campo: 'produto.produtoValorMinimo', cabecalho: 'Valor Minimo' },
      { campo: 'produto.produtoValorMedio', cabecalho: 'Valor Medio' },
      { campo: 'produto.produtoValorMaximo', cabecalho: 'Valor Maximo' },
      { campo: 'produto.produtoFatorAceitacao', cabecalho: 'Fator de Aceitação' },
    ];
  }

  getAplicacao() {
    if (this.dados) {
      if (this.dados.regraManualAplicacao == 1) {
        return 'Preceder sobre as Regras do Modelo de Mineração'
      } else if (this.dados.regraManualAplicacao == 2) {
        return 'Aplicar sobre os Itens com Classificação Automática Não Aceita'
      } else {
        return 'Aplicar sobre Grupo Pré-definido com Classificação Automática Não Aceita'
      }
    }else{
      return ''
    }
  }

  deletar(event: any) {
    alert('Não é possível remover uma fonte');
  }

  voltar() {
    this.location.back();
  }
}
