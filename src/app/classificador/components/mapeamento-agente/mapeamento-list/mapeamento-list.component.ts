import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Location } from '@angular/common';
import { Modelo } from '@app/api/model/modelo';
import { ModeloService } from '@app/api/service/modelo.service';
import { FuncaoMineracao } from '@app/api/model/funcaoMineracao';
import { FuncaoMineracaoService } from '@app/api/service/funcaomineracao.service';
import { Algoritmo } from '@app/api/model/models';
import { AlgoritmoService } from '@app/api/service/algoritmo.service';
import { map } from 'rxjs/operators';
import { ModelosAuto } from '@app/api/classificador/models/modelos-auto';
import { ModelosAutoService } from '@app/api/classificador/service/modelos-auto.service';
import { Pageable } from '@app/shared/pagination/pageable';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelosAutoResponse } from '@app/api/classificador/models/modelos-auto-response';
import { ModelosAutoRequest } from '@app/api/classificador/models/modelos-auto-request';
import * as moment from 'moment'


@Component({
  selector: 'app-mapeamento-list',
  templateUrl: './mapeamento-list.component.html',
  styleUrls: ['./mapeamento-list.component.css']
})
export class MapeamentoListComponent implements OnInit {

  colunas: any;
  modelos$: Observable<Modelo[]>;
  modelosAuto$: Observable<ModelosAuto[]>;
  funcao$: Observable<FuncaoMineracao[]>;
  algoritmos: any[] = [];
  sinais: any;
  valores: any[] = [];
  modelos: Pageable<ModelosAutoResponse>;
  consultaForm: FormGroup;
  allModelos: Pageable<ModelosAutoResponse>;
  sinaisConfianca: any;
  numeros0a100: any[] = [];
  // allModelos: Array<any> = []
  funcaoSelecionada: any;
  // algoritmoSelecionada: Algoritmo;
 



  constructor(private modeloService: ModeloService,
              private location: Location,
              private formBuilder: FormBuilder,
              private funcaoService: FuncaoMineracaoService,
              private algoritmoService: AlgoritmoService,
              private modeloAutoService: ModelosAutoService) { }


  ngOnInit() {

    this.consultaForm = this.formBuilder.group({
      algoritmoId: [],
      confiancaPreditiva: [],
      funcaoMineracaoId: [],
      modeloNome: [''],
      operador: [],
    });


    this.modeloAutoService.listar({}, 0, 10).subscribe( (res)=>{
      this.modelos = res
      console.log(res)
    });

     this.funcao$ = this.funcaoService.listar();

     this.colunas = [
      { campo: 'modeloNome', cabecalho: 'Nome' },
      { campo: 'grupoNome', cabecalho: 'Grupo' },
      { campo: 'funcaoMineracaoNome', cabecalho: 'Função' },
      { campo: 'algoritmoNome', cabecalho: 'Algoritmo' },
      { campo: 'confiancaPreditiva', cabecalho: '% Acurácia' },
      { campo: "dataCriacao", cabecalho: 'Data de Criação', date: true },
      { campo: 'dataInicioVigencia', cabecalho: 'Data de Inicio de Vigência', date: true  },
      { campo: 'dataFimVigencia', cabecalho: 'Data de Fim de Vigência', date: true  },
      { campo: 'modeloMapeado', cabecalho: 'Mapeado' },
    ];

    this.sinaisConfianca = [
      ">=",
      "<=",
      "=",
      "<",
      ">",
      "<>"
    ]

    for( let i = 0; i < 101; i++){
      this.numeros0a100.push(i)
    }

    // combineLatest(this.modeloService.listar(), this.modeloAutoService.listar())
    //   .pipe(
    //     map(([modelo, modeloAuto]) => ({modelo, modeloAuto}))
    //   )
    //   .subscribe((pair) => {
    //     pair.modelo.map( (mod)=>{
    //     this.allModelos.push(this.getModAuto(mod, pair.modeloAuto))
    //   })
    // })
  }

  localizar() {
    const modelos: ModelosAutoRequest = this.consultaForm.value;
    this.modeloAutoService.listar(modelos, 0, 10).subscribe((res) => {
      this.modelos = res;
    });
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

   onChangeSinais(){
    if(this.consultaForm.value.operador == null){
      this.consultaForm.patchValue({
        confiancaPreditiva: null,
      });
    }
  }

  // getModAuto(modelo, modelosAuto){
  //   let mod: any = modelo
  //   mod = {
  //     ...mod,
  //     modeloDataCriacao: null,
  //     modelosAutoId: null,
  //     modelosAutoInicioVigencia: null,
  //     modelosAutoFimVigencia: null
  //   }


  //   modelosAuto.map( ({ modeloId, modelosAutoId, modelosAutoInicioVigencia, modelosAutoFimVigencia })=>{
  //     if(mod.modeloId == modeloId){
  //       mod = {
  //         ...mod,
  //         modelosAutoId,
  //         modelosAutoInicioVigencia,
  //         modelosAutoFimVigencia
  //       }
  //     }
  //   })

  //   return mod
  // }


  voltar() {
    this.location.back();
  }

}
