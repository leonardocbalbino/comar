import { Component, OnInit } from '@angular/core';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { Location } from '@angular/common';



@Component({
  selector: 'app-portaria-cadastro',
  templateUrl: './portaria-cadastro.component.html',
  styleUrls: ['./portaria-cadastro.component.css']
})
export class PortariaCadastroComponent implements OnInit {


  pt: any;
  date1: Date;
  
  constructor(private location: Location) { }

  ngOnInit() {



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
