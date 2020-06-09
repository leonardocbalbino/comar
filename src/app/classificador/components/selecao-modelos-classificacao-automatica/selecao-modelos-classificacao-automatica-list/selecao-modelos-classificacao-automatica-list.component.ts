import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Modelo } from '@app/api/model/modelo';
import { FuncaoMineracao } from '@app/api/model/funcaoMineracao';
import { Algoritmo } from '@app/api/model/algoritmo';
import { ModeloService } from '@app/api/service/modelo.service';
import { ModelosAutoService } from '@app/api/classificador/service/modelos-auto.service';
import { ModelosAutoResponse } from '@app/api/classificador/models/modelos-auto-response';
import { ModelosAutoRequest } from '@app/api/classificador/models/modelos-auto-request';
import { FuncaoMineracaoService } from '@app/api/service/funcaomineracao.service';
import { AlgoritmoService } from '@app/api/service/algoritmo.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pageable } from '@app/shared/pagination/pageable';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-selecao-modelos-classificacao-automatica-list',
  templateUrl: './selecao-modelos-classificacao-automatica-list.component.html',
  styleUrls: ['./selecao-modelos-classificacao-automatica-list.component.css']
})
export class SelecaoModelosClassificacaoAutomaticaListComponent implements OnInit {
  modelos: Pageable<ModelosAutoResponse>;
  funcao$: Observable<FuncaoMineracao[]>;
  algoritmos: any[] = [];
  funcaoSelecionada: any;
  consultaForm: FormGroup;
  sinaisConfianca: any;
  numeros0a100: any[] = [];
  allModelos: Pageable<ModelosAutoResponse>;
  // algoritmoSelecionado: Algoritmo;
  colunas: any;
  pt: any;
  date1: Date;
  date2: Date;
  datasLimit: any[] = []

  constructor(private modeloService: ModeloService, private formBuilder: FormBuilder, private modeloAutoService: ModelosAutoService, private funcaoService: FuncaoMineracaoService, private algoritmoService: AlgoritmoService) {
  }

  ngOnInit() {
    this.consultaForm = this.formBuilder.group({
      algoritmoId: [],
      confiancaPreditiva: [],
      funcaoMineracaoId: [],
      modeloNome: [''],
      operador: [],
    });

    this.modeloAutoService.listar({}, 0, 10).subscribe((res) => {
      this.modelos = res

      this.modelos.content.forEach((res, index) => {
        this.datasLimit = [...this.datasLimit, {
          date1: null,
          date2: null
        }]
        if (res.dataInicioVigencia) {
          let d = new Date(moment(res.dataInicioVigencia).format("LLLL"))
          d.setDate(d.getDate() + 1)
          this.datasLimit[index].date2 = d
        }
        if (res.dataFimVigencia) {
          let d = new Date(moment(res.dataFimVigencia).format("LLLL"))
          d.setDate(d.getDate() - 1)
          this.datasLimit[index].date1 = d
        }
      })
    });

    this.colunas = [
      { campo: 'modeloNome', cabecalho: 'Nome' },
      { campo: 'grupoNome', cabecalho: 'Grupo' },
      { campo: 'funcaoMineracaoNome', cabecalho: 'Função' },
      { campo: 'algoritmoNome', cabecalho: 'Algoritmo' },
      { campo: 'confiancaPreditiva', cabecalho: 'Acurácia' },
      { campo: "dataCriacao", cabecalho: 'Data de Criação', date: true },
      { campo: 'dataInicioVigencia', cabecalho: 'Data de Inicio de Vigência' },
      { campo: 'dataFimVigencia', cabecalho: 'Data de Fim de Vigência' },
      { campo: 'modeloMapeado', cabecalho: 'Mapeado' },
    ];

    this.funcao$ = this.funcaoService.listar();

    this.sinaisConfianca = [
      ">=",
      "<=",
      "=",
      "<",
      ">",
      "<>"
    ]

    for (let i = 0; i < 101; i++) {
      this.numeros0a100.push(i)
    }

    this.modeloAutoService.listar({}, 0, 10).subscribe((res) => {
      this.allModelos = res
      console.log(this.allModelos)
    });

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
  }

  localizar() {
    const modelos: ModelosAutoRequest = this.consultaForm.value;
    this.modeloAutoService.listar(modelos, 0, 10).subscribe((res) => {
      console.log(res)
      console.log(this.consultaForm)
      this.allModelos = res;
    });
  }

  onChangeSinais() {
    if (this.consultaForm.value.operador == null) {
      this.consultaForm.patchValue({
        confiancaPreditiva: null,
      });
    }
  }

  changeFuncao() {
    this.consultaForm.patchValue({
      algoritmoId: null,
    });
    this.funcao$.subscribe((res) => {
      res.map((r) => {
        if (r.funcaoMineracaoId == this.consultaForm.value.funcaoMineracaoId) {
          this.funcaoSelecionada = r
          return
        }
      })
      if(!this.consultaForm.value.funcaoMineracaoId){
        this.funcaoSelecionada = null
        this.consultaForm.patchValue({
          algoritmoId: null,
        });
      }

      if (this.funcaoSelecionada) {
        this.algoritmos = this.funcaoSelecionada.funcaoMineracaoAlgoritmos
      } else {
        this.algoritmos = []
      }
    })
  }

  deletar(event: any) {
    alert('Não é possível remover uma fonte');
  }
}
