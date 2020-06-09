import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoricoService } from '@app/api/service/historico.service';
import { DadosTesteService } from '@app/api/service/dadosTeste.service';
import { Historico } from '@app/api/model/historico';
import { Modelo } from '@app/api/model/modelo';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { DadosTeste } from '@app/api/model/models';
import { Resultado, Acuracia } from '@app/api/model/resultado';
import { Table } from 'primeng/table';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModeloService } from '@app/api/service/modelo.service';

@Component({
  selector: 'app-modelos-historico',
  templateUrl: './modelos-historico.component.html',
  styleUrls: ['./modelos-historico.component.css']
})
export class ModelosHistoricoComponent implements OnInit {
  listaHistorico: any[] = [];
  historico: Historico;
  historicos: Observable<Historico[]>;
  acuracia: Acuracia;
  previsao1: number;
  previsao2: number;
  previsao3: number;
  analise: Resultado = null;
  matriz: Resultado = null;
  modelo: Modelo = {};
  modelos: any[] = [];
  colunas: any;
  tab: boolean;
  usuario: string;
  mediaacuracia; number;
  analiseResult: string;
  filtros = false;
  erro: string;
  grupoTeste: string;
  @ViewChild('dtAnalise', { static: false }) private dataTableAnalise: Table;
  @ViewChild('dtMatriz', { static: false }) private dataTableMatriz: Table;
  @ViewChild('modalErro', { static: true }) modalErro: NgbModalRef;
  atributoAlvo: string;
  clusterizacao: boolean;


  constructor(
    private historicoService: HistoricoService,
    private dadosTesteService: DadosTesteService,
    private location: Location,
    private modalService: NgbModal,
    private modeloService: ModeloService,
  ) { }

  ngOnInit() {
    if (history.state.lista) {
      this.clusterizacao = false;
      this.atributoAlvo = '';
      this.modelo = history.state.lista;
      this.usuario = this.modelo.usuario.usuarioNome;
      this.historicos = this.historicoService.listar(this.modelo.modeloId);
      this.modeloService.listaAtributoModelo().subscribe((doc) => {
        doc.forEach((atributo) => {
          if (atributo.atributoModeloTipo === 'ALVO' && atributo.modelo.modeloId === this.modelo.modeloId) {
            this.atributoAlvo = atributo.atributo.atributoAlias;
          }
        });
      });
      if (this.modelo.funcaoMineracao.funcaoMineracaoAlias === 'Clusterização') {
        this.atributoAlvo = 'Não avaliado';
        //this.clusterizacao = true;
      }
    } else {
      this.location.back();
    }
  }

  voltar() {
    this.location.back();
  }

  detalheHistorico(historicoId: number, $t) {
    // this.router.navigate(['/minerador/modelos-mineracao/history'], { state: { lista: modelo } });
    this.tab = true;
    this.historicoService.detalhe(historicoId).subscribe((res) => {
      this.historico = res;
      $t.select('detalhe');
    });
    this.dadosTesteService.mediaacuracia(this.modelo.modeloId).subscribe((dados) => {
      this.acuracia = dados;
    });
    this.dadosTesteService.previsao(historicoId).subscribe((previsaco) => {
      previsaco.linhas.forEach((listaPrevisao) => {
        this.previsao1 = listaPrevisao[0];
        // this.previsao1 = Math.floor((listaPrevisao[0]) * 100).toFixed(2);
        this.previsao2 = listaPrevisao[1];
        this.previsao3 = listaPrevisao[2];
      });
    });
    this.dadosTesteService.analiseAcertos(historicoId).subscribe((listaAnalise) => {
      this.analise = listaAnalise;
    });
    this.dadosTesteService.matrizDesempenho(historicoId).subscribe((listaMatriz) => {
      this.matriz = listaMatriz;
    });
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

  exibirErro(erro: string) {
    this.erro = erro;
    this.modalService.open(this.modalErro, { ariaLabelledBy: 'modal-basic-title' });
  }

}
