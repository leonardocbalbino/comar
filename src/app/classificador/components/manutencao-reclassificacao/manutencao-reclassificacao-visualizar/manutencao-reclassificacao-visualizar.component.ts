import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import ItemClassificacaoManualResponse from '@app/api/classificador/models/item-classificacao-response';
import { AtributoModeloService } from '@app/api/service/atributo-modelo.service';

@Component({
  selector: 'app-manutencao-reclassificacao-visualizar',
  templateUrl: './manutencao-reclassificacao-visualizar.component.html',
  styleUrls: ['./manutencao-reclassificacao-visualizar.component.css']
})
export class ManutencaoReclassificacaoVisualizarComponent implements OnInit {

  constructor(private location: Location, private atrModeloService: AtributoModeloService) { }

  itemClass: ItemClassificacaoManualResponse;

  ngOnInit() {
    this.itemClass = history.state.data;
    console.log(this.itemClass);
    if (this.itemClass) {
      this.atrModeloService.buscarAlvo(this.itemClass.modeloId).subscribe((res) => {
        this.itemClass.atributoAlvo = res.atributo.atributoAlias ? res.atributo.atributoAlias : res.atributo.atributoNome;
      });
    }
  }

  voltar() {
    this.location.back();
  }

}
