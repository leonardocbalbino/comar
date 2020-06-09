import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-selecao-modelos-catalogo-automatico-visualizar',
  templateUrl: './selecao-modelos-catalogo-automatico-visualizar.component.html',
  styleUrls: ['./selecao-modelos-catalogo-automatico-visualizar.component.css']
})
export class SelecaoModelosCatalogoAutomaticoVisualizarComponent implements OnInit {

  colunasAtributosRegra: any;



  constructor(private location: Location) { }

  ngOnInit() {
    this.colunasAtributosRegra = [
      { campo: 'fonteNome', cabecalho: 'Tipo Parâmetro' },
      { campo: 'fonteAlias', cabecalho: 'Parâmetro' },
      { campo: 'fonteSchema', cabecalho: 'Valor' },
    ];
  }

  voltar() {
    this.location.back();
  }

}
