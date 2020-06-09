import { Component, OnInit } from '@angular/core';
import {ChartModule} from 'primeng/chart';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';


@Component({
  selector: 'app-painel-estatisticas-classificador',
  templateUrl: './painel-estatisticas-classificador.component.html',
  styleUrls: ['./painel-estatisticas-classificador.component.css']
})
export class PainelEstatisticasClassificadorComponent implements OnInit {

   dataPie: any;
   dataBarra: any;
   dataLinha: any;
   dataPie2: any;
   colunas: { campo: string; cabecalho: string; }[];
   fontes$: Observable<Fonte[]>;



  constructor() {
     this.dataPie = {
       labels: ['A', 'B', 'C'],
       datasets: [
           {
               data: [33, 33, 33],
               backgroundColor: [
                   '#FF6384',
                   '#36A2EB',
                   '#FFCE56'
               ],
               hoverBackgroundColor: [
                   '#FF6384',
                   '#36A2EB',
                   '#FFCE56'
               ]
           }]
         };

     this.dataPie2 = {
          labels: ['A', 'B', 'C'],
          datasets: [
              {
                  data: [33, 33, 33],
                  backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56'
                  ],
                  hoverBackgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56'
                  ]
              }]
            };

     this.dataBarra = {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
          datasets: [
              {
                  label: 'Name',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: 'Name',
                  backgroundColor: '#9CCC65',
                  borderColor: '#7CB342',
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };
     this.dataLinha = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        datasets: [
            {
                label: 'Name',
                data: [65, 58, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Name',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#565656'
            }
        ]
    };

     this.colunas = [
      { campo: 'grupoSegmento', cabecalho: 'Produto' },
      { campo: 'nomeGrupo', cabecalho: 'Segmento' },
      { campo: 'subGrupo', cabecalho: 'Grupo' },
      { campo: 'grupoItem', cabecalho: 'Subgrupo' },
      { campo: 'valorMedio', cabecalho: 'Qtde' },
    ];

  }

  ngOnInit() {}

}
