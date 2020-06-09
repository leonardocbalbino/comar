import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FonteService } from '@app/api/service/fonte.service';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';


@Component({
  selector: 'app-portaria-list',
  templateUrl: './portaria-list.component.html',
  styleUrls: ['./portaria-list.component.css']
})
export class PortariaListComponent implements OnInit {

  pt: any;
  date1: Date;
  colunas: any;
  fontes$: Observable<Fonte[]>;


  constructor(private fonteService: FonteService, private location: Location) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'fonteAlias', cabecalho: 'Número' },
      { campo: 'fonteAlias', cabecalho: 'Finalidade' },
      { campo: 'fonteAlias', cabecalho: 'Data Publicação' },
      { campo: 'fonteAlias', cabecalho: 'Data Vencimento' },
      { campo: 'fonteAlias', cabecalho: 'Observação' },
    ];

    //this.fontes$ = this.fonteService.listar();

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
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
