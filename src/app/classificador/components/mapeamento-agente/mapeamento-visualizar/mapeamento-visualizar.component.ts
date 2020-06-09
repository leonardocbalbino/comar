import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Atributo } from '@app/api/model/models';
import { AtributoService } from '@app/api/classificador/service/atributo.service';
import { Modelo } from '@app/api/model/modelo';
import { ModeloService } from '@app/api/service/modelo.service';
import { ModelosAuto } from '@app/api/classificador/models/modelos-auto';
import { ModelosAutoService } from '@app/api/classificador/service/modelos-auto.service';
import { ConfigAgenteService } from '@app/api/classificador/service/config-agente.service';
import { AtributoModeloService } from '@app/api/service/atributo-modelo.service';
import { ConfigAgente } from '@app/api/classificador/models/config-agente';
import { Pageable } from '@app/shared/pagination/pageable';
import { Coluna } from '@app/api/classificador/models/coluna';
import { ColunaService } from '@app/api/classificador/service/coluna.service';
import { runInThisContext } from 'vm';
import * as moment from 'moment'
import { AlvoConfigAgente } from '@app/api/classificador/models/alvo-config-agente';
import { AlvoConfigAgenteService } from '@app/api/classificador/service/alvo-config-agente.service';


@Component({
  selector: 'app-mapeamento-visualizar',
  templateUrl: './mapeamento-visualizar.component.html',
  styleUrls: ['./mapeamento-visualizar.component.css']
})
export class MapeamentoVisualizarComponent implements OnInit {

  modelos$: Observable<Modelo[]>;
  modelosAuto$: Observable<ModelosAuto[]>;
  coluna$: Observable<Coluna[]>;
  pt: any;
  date1: string;
  date2: string;
  dt1: Date;
  dt2: Date;
  coluna: any;
  nav: Navigation;
  nomeModelo: String;
  grupoMineracao: String;
  algoritmo: String;
  funcMineracao: String;
  confianca: String;
  dtcriacao: String;
  dtinicio: String;
  dtfim: String;
  atributo$: Observable<Atributo[]>;
  atributoAgenteSelecionado: Atributo;
  atributo: Atributo = {};
  listaAtributos: any[] = [];
  allModelos: any[] = [];
  modeloAtual: any;
  atributosList: Array<any> = [];
  atributosToSave: any;
  alvoRelacaoToSave: any;
  alvoRelacaoSelecionada: Coluna;
  dados: Pageable<any>;
  colunaAlvo: any;

  constructor(private location: Location,
    private atributoService: AtributoService,
    private modeloService: ModeloService,
    private modeloAutoService: ModelosAutoService,
    private atributoModeloService: AtributoModeloService,
    private router: Router,
    private configAgenteService: ConfigAgenteService,
    private colunaService: ColunaService,
    private modelosAutoService: ModelosAutoService,
    private alvoConfigAgenteService: AlvoConfigAgenteService ) { }

  ngOnInit() {
    this.modeloAtual = history.state.data;
    if(!this.modeloAtual){
      this.modeloAtual = JSON.parse(localStorage.getItem("modeloMapeamento"))
    }else{
      localStorage.setItem("modeloMapeamento", JSON.stringify(this.modeloAtual));
    }

    this.date1 = moment(this.modeloAtual.dataInicioVigencia, "YYYY-MM-DD").format("YYYY/MM/DD")
    let d = new Date(this.date1)
    d.setDate(d.getDate() + 1)
    this.dt2 = d

    this.date2 = moment(this.modeloAtual.dataFimVigencia, "YYYY-MM-DD").format("YYYY/MM/DD")
    d = new Date(this.date2)
    d.setDate(d.getDate() - 1)
    this.dt1 = d

    // this.configAgenteService.listar(this.modeloAtual.modeloId, 0, 10).subscribe( (res)=>{
    //   this.atributoService.atributo_por_stat(1).subscribe( (attr)=>{
    //     if(attr.length < res.totalElements){
    //       swal.fire('Informação', 'Atributos configurados insuficientes para mapeamento!', 'warning').then( (t)=>{
    //         this.router.navigate(['/classificador/configuracao-atributos-regras-manuais/list']);
    //       });
    //     }
    //   });
    // });


    this.coluna$ = this.colunaService.listar();

    this.coluna = [
      { campo: 'atributo.atributoNome', cabecalho: 'Atributo do Modelo' },
      { campo: 'atributo.atributoTipo', cabecalho: 'Tipo Atributo' },
      { campo: '', cabecalho: 'Atributo do Agente de Classificação' },
      { campo: 'configAgente.atributo.atributoTipo', cabecalho: 'Tipo Atributo' }
    ];

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      // clear: 'Limpar'
    };

  }


  voltar() {
    this.location.back();
  }

  atribuirAlvoConfigAgente(event){
    if(this.modeloAtual.modeloMapeado === 'Sim'){
      this.colunaAlvo = event[0].coluna
    }
  }

  mapear() {
    console.log(this.atributosToSave)
    console.log(this.modeloAtual)

    if(!this.modeloAtual.dataInicioVigencia){
      swal.fire('Informação', 'Para salvar você deve selecionar a data de Inicio de Vigência!', 'warning')
      return
    }
    if(!this.modeloAtual.dataFimVigencia){
      swal.fire('Informação', 'Para salvar você deve selecionar a data de Fim de Vigência!', 'warning')
      return
    }
    if(!this.colunaAlvo){
      swal.fire('Informação', 'Para salvar você deve selecionar um Alvo Relação!', 'warning')
      return
    }

     this.modeloAtual.dataFimVigencia = this.date2
     this.modeloAtual.dataInicioVigencia = this.date1

     let mod: ModelosAuto = {
       modeloId: this.modeloAtual.modeloId,
       modelosAutoFimVigencia: moment(this.modeloAtual.dataFimVigencia, "YYYY/MM/DD").format("YYYY-MM-DD"),
       modelosAutoInicioVigencia: moment(this.modeloAtual.dataInicioVigencia, "YYYY/MM/DD").format("YYYY-MM-DD"),
       modelosAutoUtilizacao: this.modeloAtual.modelosAutoUtilizacao,
     }

     if(!this.modeloAtual.modelosAutoId){
       this.modeloAutoService.salvar(mod).subscribe((res) =>{

       })
     }else{
       mod = {
         ...mod,
         modelosAutoId: this.modeloAtual.modelosAutoId,
       }
       this.modelosAutoService.alterar(mod).subscribe((res) => {

       })
     }


    if (this.canSave()) {
      this.atributosToSave.content.map((res) => {
        let cA: ConfigAgente

        if (!res.configAgente.configAgenteId) {
          cA = {
            atributoModeloId: res.atributoModeloId,
            atributo: res.configAgente.atributo
          }

          this.configAgenteService.salvar(cA).subscribe( (res)=>{
            console.log("save")
            //salvar alvo
              let agente: AlvoConfigAgente = {
               coluna: this.colunaAlvo,
               configAgente: res
             }
             this.alvoConfigAgenteService.salvar(agente).subscribe ( (res) =>{

             })
          })
        } else {
          cA = {
            atributoModeloId: res.atributoModeloId,
            configAgenteId: res.configAgente.configAgenteId,
            atributo: {
              atributoId: res.configAgente.atributo.atributoId
            }
          }
          console.log(cA)

          this.configAgenteService.alterar(cA).subscribe( (res)=>{
            console.log("edit")
            //update alvo
            let agente: AlvoConfigAgente = {
             coluna: this.colunaAlvo,
             configAgente: res
           }
           this.alvoConfigAgenteService.salvar(agente).subscribe ( (res) =>{

           })
          })
        }
        swal.fire('Informação', 'Atributos mapeados com sucesso!', 'success')
      })
    } else {
      swal.fire('Informação', 'Para salvar você deve mapear todos os atributos!', 'warning')
    }

     this.modeloAtual.dataInicioVigencia = this.date1
     this.modeloAtual.dataFimVigencia = this.date2
    console.log(this.modeloAtual)
   }

  canSave() {
    let save = true

    this.atributosToSave.content.map( (res)=>{
      if(res.configAgente.atributo == null){
        save = false
        return
      }
    })
    if (this.atributosToSave.total != this.atributosToSave.content.length) {
      save = false
    }
    if (this.atributosToSave.content.length === 0) {
      save = false
    }

    return save
  }

   changeDate1(event) {
    this.date1 = moment(event, "DD/MM/YYYY").format("YYYY/MM/DD")
    let d = new Date(this.date1)
    d.setDate(d.getDate() + 1)
    this.dt2 = d
   }

   changeDate2(event) {
    this.date2 = moment(event, "DD/MM/YYYY").format("YYYY/MM/DD")
    let d = new Date(this.date2)
    d.setDate(d.getDate() - 1)
    this.dt1 = d
   }

 getModAuto(modelo, modelosAuto) {
   let mod: any = modelo
   mod = {
     ...mod,
     modeloDataCriacao: null,
     modelosAutoId: null,
     modelosAutoInicioVigencia: null,
     modelosAutoFimVigencia: null
   }



    mod.historicos.map((res) => {
      if (res.historicoEvento === 'CADASTRADO')
        mod.modeloDataCriacao = (res.historicoData as string).substr(0, 10)
    })

    modelosAuto.map(({ modeloId, modelosAutoId, modelosAutoInicioVigencia, modelosAutoFimVigencia, modelosAutoUtilizacao }) => {
      if (mod.modeloId == modeloId) {
        mod = {
          ...mod,
          modelosAutoId,
          modelosAutoInicioVigencia,
          modelosAutoFimVigencia,
          modelosAutoUtilizacao
        }
      }
    })

    return mod
  }

  setAtributosToSave(event) {
    this.atributosToSave = event
  }

  // setAlvoRelacaoToSave(event) {
  //   this.alvoRelacaoToSave = event
  // }

}
