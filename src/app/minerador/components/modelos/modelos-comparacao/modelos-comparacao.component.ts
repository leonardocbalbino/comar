import { Component, OnInit, ViewChild } from '@angular/core';
import { ModeloService } from '@app/api/service/modelo.service';
import { Location } from '@angular/common';
import { DadosTesteService } from '@app/api/service/dadosTeste.service';
import { Resultado } from '@app/api/model/resultado';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modelos-comparacao',
  templateUrl: './modelos-comparacao.component.html',
  styleUrls: ['./modelos-comparacao.component.css']
})
export class ModelosComparacaoComponent implements OnInit {
  nomeModelo: string;
  chart: boolean;
  data: any;
  dataMedia: any;
  previsaoCorreta: any;
  options: any;
  labels = [];
  porcentagem = [];
  porcentagemMedia = [];
  listaIdHistoricos = [];
  listaPrevisao = [];
  listaPrevisaoFinal = [];
  modelo: any[] = [];
  listaModelos: any[] = [];
  analise: Resultado = null;
  matriz: Resultado = null;
  historicoId = [];
  analiseResult: string;
  filtros = false;
  @ViewChild('dtAnalise', { static: false }) private dataTableAnalise: Table;
  @ViewChild('dtMatriz', { static: false }) private dataTableMatriz: Table;

  constructor(
    private modeloService: ModeloService,
    private dadosTesteService: DadosTesteService,
    private location: Location,
    private router: Router,
  ) { }

  voltar() {
    this.listaPrevisao = [];
    //this.location.back();
    this.router.navigate([`/minerador/modelos-mineracao/consultaComparacao`], { state: { data: history.state.consulta } });
  }

  ngOnInit() {
    if (history.state.data) {
      this.chart = false;
      const novoArray = [...new Set(history.state.data)];
      const novoArrayH = [...new Set(history.state.historico)];
      this.modeloService.comparaModelo(novoArray).subscribe((comparacao) => {
        comparacao.forEach(m => {
          const lista = [];
          const contador = novoArrayH.length;
          m.historicos.forEach(historico => {
            if (historico.historicoEvento.includes('TESTADO')) {
              if (lista.length > 0) {
                if (!lista.find((l) => l === historico.dadosTeste.dadosTesteAcuracia)) {
                  lista.push(historico.dadosTeste.dadosTesteAcuracia * 100);
                }
              } else {
                lista.push(historico.dadosTeste.dadosTesteAcuracia * 100);
              }
            }
            const total = lista.reduce((totalL, valor) => totalL + valor, 0);
            let prevC = 0;
            if (historico.dadosTeste !== null) {
              if (novoArrayH.find((h) => h === historico.historicoId)) {
                this.dadosTesteService.previsao(historico.historicoId).subscribe((previsao) => {
                  previsao.linhas.forEach((l) => {
                    const c = 0;
                    this.listaPrevisao.push({
                      previsao: (l[0] * 100),
                      historico: historico.historicoId
                    });
                    prevC = c + l[0];
                  });
                });

                this.modeloService.listaAtributoModelo().subscribe((doc) => {
                  const soma = lista.length;
                  doc.forEach((atributo) => {
                    if (atributo.atributoModeloTipo === 'ALVO' && atributo.modelo.modeloId === m.modeloId) {
                      if (atributo.atributo.atributoAlias === null || atributo.atributo.atributoAlias === '') {
                        this.modelo.push({
                          id: m.modeloId,
                          nome: m.modeloNome,
                          grupo: historico.dadosTeste.grupo.grupoNome,
                          funcao: m.funcaoMineracao.funcaoMineracaoAlias,
                          algoritmo: m.algoritmo.algoritmoAlias,
                          publicado: m.modeloPublicado,
                          acuraciaModelo: (historico.dadosTeste.dadosTesteAcuracia * 100),
                          previsao: (prevC * 100).toFixed(2),
                          acuraciaMedia: (total / soma).toFixed(2),
                          atributoAlvo: 'Não avaliado'
                        });
                      } else {
                        this.modelo.push({
                          id: m.modeloId,
                          nome: m.modeloNome,
                          grupo: historico.dadosTeste.grupo.grupoNome,
                          funcao: m.funcaoMineracao.funcaoMineracaoAlias,
                          algoritmo: m.algoritmo.algoritmoAlias,
                          publicado: m.modeloPublicado,
                          acuraciaModelo: (historico.dadosTeste.dadosTesteAcuracia * 100),
                          previsao: (prevC * 100).toFixed(2),
                          acuraciaMedia: (total / soma).toFixed(2),
                          atributoAlvo: atributo.atributo.atributoAlias
                        });
                      }

                    }
                  });
                  this.labels.push(m.modeloNome);
                  this.porcentagem.push((historico.dadosTeste.dadosTesteAcuracia * 100));
                  this.porcentagemMedia.push((total / soma).toFixed(2));
                  this.listaIdHistoricos.push(historico.historicoId);
                  this.listaPrevisao.filter((p) => p.historico === historico.historicoId).forEach((p) => {
                    this.listaPrevisaoFinal.push(p.previsao.toFixed(2));
                    const index = this.listaPrevisao.indexOf(p);
                    this.listaPrevisao.splice(index, 0);
                  });
                  console.log(this.listaPrevisaoFinal);
                  // this.listaPrevisaoFinal.push(this.listaPrevisao.filter((p) => p.historico === historico.historicoId))
                  this.data = {
                    labels: this.labels,
                    datasets: [
                      {
                        label: false,
                        data: this.porcentagem,
                        id: this.listaIdHistoricos,
                        modelo: m.modeloNome,
                        backgroundColor: '#42A5F5',
                      },
                    ]
                  };

                  this.dataMedia = {
                    labels: this.labels,
                    datasets: [
                      {
                        label: false,
                        data: this.porcentagemMedia,
                        id: this.listaIdHistoricos,
                        modelo: m.modeloNome,
                        backgroundColor: '#42A5F5',
                      },
                    ]
                  };
                  this.previsaoCorreta = {
                    labels: this.labels,
                    datasets: [
                      {
                        label: false,
                        data: this.listaPrevisaoFinal,
                        id: this.listaIdHistoricos,
                        modelo: m.modeloNome,
                        backgroundColor: '#42A5F5',
                      },
                    ]
                  };

                });
              }

            }


            // if (historico.historicoId === novoArrayH[i]) {

            // }
          });
          // for (let i = 0; i < contador; i++) {

          // }

        });

        this.options = {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 100,
                min: 0
              }
            }]
          },
        };

      });
    } else {
      this.voltar();
    }
  }

  seleciona(item, i) {
    this.filtros = true;
    this.analiseResult = item;
    this.dataTableAnalise.filter(item, i, 'equals');
    this.dataTableMatriz.filter(item, i, 'equals');
  }

  limpaFiltros() {
    this.filtros = false;
    this.analiseResult = null;
    this.dataTableAnalise.filter(0, 0, 'contains');
    this.dataTableMatriz.filter(0, 0, 'contains');
  }

  selectData(event) {
    const index = event.element._index;
    const idHistorico = event.element._chart.config.data.datasets[0].id[index];

    this.dadosTesteService.analiseAcertos(idHistorico).subscribe((listaAnalise) => {
      this.nomeModelo = event.element._model.label;
      this.analise = listaAnalise;
      this.chart = true;
    });
    this.dadosTesteService.matrizDesempenho(idHistorico).subscribe((listaMatriz) => {
      this.matriz = listaMatriz;
    });

  }



}
