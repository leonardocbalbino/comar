import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { pt } from '@app/shared/constants';
import { AcompanhamentoClassificacaoService } from '@app/api/classificador/service/acompanhamento-class.service';
import { AcompanhamentoClassificacaoAuto } from '@app/api/classificador/models/acompanhamento-classificacao-auto';
import { ColunaProdutoService } from '@app/api/classificador/service/coluna-produto.service';

@Component({
  selector: 'app-lista-classificacao-automatica-visualizar',
  templateUrl: './lista-classificacao-automatica-visualizar.component.html',
  styleUrls: ['./lista-classificacao-automatica-visualizar.component.css']
})
export class ListaClassificacaoAutomaticaVisualizarComponent implements OnInit {
  pt = pt;
  acompClassAuto: AcompanhamentoClassificacaoAuto;

  constructor(private location: Location, private colunaProdService: ColunaProdutoService) { }

  ngOnInit() {
    this.acompClassAuto = history.state.data;
    if (this.acompClassAuto) {
      this.colunaProdService.listarColunaProduto(this.acompClassAuto.produtoId).subscribe((res) => {
        this.acompClassAuto.itemNota.colunasProduto = res;
      });
    }
  }

  voltar() {
    this.location.back();
  }

}
