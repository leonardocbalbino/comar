import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GrupoService } from '@app/api/service/grupo.service';
import { AtributoService } from '@app/api/service/atributo.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs';
import { Grupo } from '@app/api/model/grupo';
import { Atributo } from '@app/api/model/atributo';
import { Modelo } from '@app/api/model/modelo';
import { ParametroModelo } from '@app/api/model/parametroModelo';
import { OpcaoParametro } from '@app/api/model/opcaoParametro';
import { AtributoModelo } from '@app/api/model/atributoModelo';
import { ModeloService } from '@app/api/service/modelo.service';
import { Parametro } from '@app/api/model/parametro';
import { FuncaoMineracaoService } from '@app/api/service/funcaomineracao.service';
import { FuncaoMineracao } from '@app/api/model/funcaoMineracao';
import { FuncaoMineracaoAlgoritmoService } from '@app/api/service/funcaomineracaoalgoritmo.service';
import { FuncaoMineracaoAlgoritmo } from '@app/api/model/funcaoMineracaoAlgoritmo';
import { AlgoritmoService } from '@app/api/service/algoritmo.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Algoritmo } from '@app/api/model/algoritmo';
import { AtributoGrupoService } from '@app/api/service/atributo-grupo.service';
import { AtributoGrupo } from '@app/api/model/models';
import { UsuarioService } from '@app/api/service/usuario.service';
import { ParametroService } from '@app/api/service/parametro.service';
import { OpcaoParametroApi } from '@app/api/service/opcaoParametroApi.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modelos-edicao',
  templateUrl: './modelos-edicao.component.html',
  styleUrls: ['./modelos-edicao.component.css']
})
export class ModelosEdicaoComponent implements OnInit {

  cities = [];

  modeloNome: string;
  edicao: boolean;
  modeloId: number;
  grupoId: number;
  transformacao: string;
  publicacaoSel = false;
  publicacaoSelEdit: string;
  atributoAlvo: AtributoGrupo;
  atributoChave: AtributoGrupo;
  atributoAlvoNome: string;
  atributoChaveNome: string;
  atributoParametro: AtributoGrupo;
  funcaoMineracaoModel: FuncaoMineracao;
  modeloPercentTreino: { descricao, valor };
  modeloPercentGrupo: { descricao, valor };
  percentTreino: number;
  percentGrupo: number;
  funcaoAlgoritmo: FuncaoMineracaoAlgoritmo;
  algoritmoEdicao: Algoritmo;
  algoritmo: Algoritmo;
  items: MenuItem[];
  grupo$: Grupo[] = [];
  listaGrupo: any[] = [];
  atributos$: Observable<AtributoGrupo[]>;
  mineracao$: Observable<FuncaoMineracao[]>;
  listaMineracao: any[] = [];
  listaMineracao1: any[] = [];
  listaMineracao2: any[] = [];
  listaMineracao3: any[] = [];
  listaMineracao4: any[] = [];
  funcaoAlgoritmo$: Observable<FuncaoMineracaoAlgoritmo[]>;
  listaTipoParametro$: Observable<any>;
  grupoSel: Grupo;
  grupoEdicao: Grupo;
  atributoSel: Atributo;
  modeloForm: FormGroup;
  modelo: Modelo = {};
  modeloEdicao: Modelo;
  colunas: any;
  listaParametros: any[] = [];
  listaParametrosEdicao: any[] = [];
  listaParametrosRemovidos: any[] = [];
  parametros: Parametro = {};
  listaParametrosModelo: any[] = [];
  listaParametrosModeloCompleto: Parametro[] = [];
  parametrosObrigatorio: any[] = [];
  parametroObrigatorio = false;
  qtdParametroObrigatorio = 0;
  listaParametrosObrigatorio: any[] = [];
  valorParametro: number;
  listaPercentual: any[] = [];
  contador: number;
  listaDiv: any[] = [];
  listaAtributos: any[] = [];
  tipoParametro: string;
  listaTipoParametro: Parametro = {};
  tipoMaximoParametro: number;
  tipoMinimoParametro: number;
  listaGrupoAtributos: any[] = [];
  listaGrupoAtributosEdicao: any[] = [];
  listaGrupoAtributosTemp: any[] = [];
  grupoTotalRegistro: string;
  listaAtributo: any[] = [];
  verificaAtributo: boolean;
  listaPreditivos: any[] = [];
  listaPreditivosRemovidos: any[] = [];
  listaDadosChave: any[] = [];
  listaDadosAlvo: any[] = [];
  dadosParametro: ParametroModelo = {};
  dadosAtributo: AtributoModelo = {};
  opcaoParametroList: Observable<OpcaoParametro[]>;
  opcaoParametro: OpcaoParametro;
  historicoTeste: boolean;
  historico: string;
  parametroEdicao: boolean;
  clusterizacao: boolean;
  number = /^[0-9]+$/;

  constructor(
    private toastr: ToastrService,
    private grupoService: GrupoService,
    private atributoService: AtributoService,
    private atributoGrupoService: AtributoGrupoService,
    private modeloService: ModeloService,
    private funcaoMineracaoService: FuncaoMineracaoService,
    private algoritmoService: AlgoritmoService,
    private funcaoMineracaoAlgoritmoService: FuncaoMineracaoAlgoritmoService,
    private router: Router,
    private location: Location,
    private usuarioService: UsuarioService,
    private parametroService: ParametroService,
    private opcaoParametroApi: OpcaoParametroApi,
  ) { }

  ngOnInit() {

    for (let i = 0; i <= 100; i++) {
      this.listaPercentual.push({
        descricao: i + '%',
        valor: i
      });
    }
    

    if (history.state.data) {
      this.clusterizacao = false;
      this.parametroEdicao = false;
      this.historico = history.state.historico;
      this.historicoTeste = false;
      const listaHistorico: any[] = [];
      listaHistorico.push(history.state.data.historicos);
      this.edicao = true;
      this.modelo = history.state.data;
      this.modeloId = history.state.data.modeloId;
      this.modeloNome = history.state.data.modeloNome;
      this.grupoSel = history.state.data.grupo.grupoNome;
      this.grupoEdicao = history.state.data.grupo;
      this.grupoTotalRegistro = history.state.data.grupo.grupoTotalRegistros;
      this.funcaoMineracaoModel = history.state.data.funcaoMineracao;
      this.funcaoAlgoritmo = history.state.data.algoritmo.algoritmoAlias;
      this.algoritmoEdicao = history.state.data.algoritmo;
      this.modeloPercentGrupo = history.state.data.modeloPercentGrupo;
      this.modeloPercentTreino = history.state.data.modeloPercentTreino;
      this.percentGrupo = history.state.data.modeloPercentGrupo;
      this.percentTreino = history.state.data.modeloPercentTreino;
      this.publicacaoSelEdit = history.state.data.modeloPublicado;
      if (history.state.data.grupo.grupoTotalRegistros === null || history.state.data.grupo.grupoTotalRegistros === 0) {
        this.grupoTotalRegistro = '0 Registros';
      } else {
        this.grupoTotalRegistro = history.state.data.grupo.grupoTotalRegistros + ' Registros';
      }
      this.atributos$ = this.atributoGrupoService.listarGrupo(history.state.data.grupo.grupoId);
      this.atributoGrupoService.listarGrupo(history.state.data.grupo.grupoId).subscribe((atr) => {
        Promise.all([
          atr.forEach((d) => {
            this.listaGrupoAtributosEdicao.push(d);
          })
        ]).then(() =>
          Promise.all([this.carregaAtributos()]).then(() => console.log('foi'))
        );
      });

      this.parametroService.listaParametroModelo(history.state.data.modeloId).subscribe((d) => {
        // console.log(doc);
        d.forEach((p) => {
          this.listaParametros.push({
            parametro: p.parametro,
            parametroAlias: p.parametro.parametroAlias,
            parametroModeloValor: p.parametroModeloValor,
            parametroModeloId: p.parametroModeloId
          });
        });       
        // tslint:disable-next-line: max-line-length
        
        this.parametroService.listaParametroFuncaoAlgoritmo(history.state.data.algoritmo.algoritmoId, history.state.data.funcaoMineracao.funcaoMineracaoId).subscribe((parametro) => {          
          parametro.forEach((doc) => {            
            if (this.listaParametros.length === 0) {
              if (doc.parametroObrigatorio) {                
                this.parametrosObrigatorio.push({
                  algoritmos: doc.algoritmo,
                  funcoesMineracao: doc.funcaoMineracao,
                  listaAlgoritmos: doc.listaAlgoritmos,
                  listaFuncoes: doc.listaFuncoes,
                  opcaoParametros: doc.opcaoParametros,
                  parametroAlias: doc.parametroAlias,
                  parametroId: doc.parametroId,
                  parametroMaximo: doc.parametroMaximo,
                  parametroMinimo: doc.parametroMinimo,
                  parametroNome: doc.parametroNome,
                  parametroObrigatorio: doc.parametroObrigatorio,
                  parametroOrigem: doc.parametroOrigem,
                  parametroOrigemDescricao: doc.parametroOrigemDescricao,
                  parametroTipo: doc.parametroTipo,
                  parametroTipoDescricao: doc.parametroTipoDescricao
                });
                this.parametroObrigatorio = true;
                this.qtdParametroObrigatorio = this.qtdParametroObrigatorio + 1;
              }
              this.cities.push(doc);
              this.listaParametrosModelo.push({
                algoritmos: doc.algoritmo,
                funcoesMineracao: doc.funcaoMineracao,
                listaAlgoritmos: doc.listaAlgoritmos,
                listaFuncoes: doc.listaFuncoes,
                opcaoParametros: doc.opcaoParametros,
                parametroAlias: doc.parametroAlias,
                parametroId: doc.parametroId,
                parametroMaximo: doc.parametroMaximo,
                parametroMinimo: doc.parametroMinimo,
                parametroNome: doc.parametroNome,
                parametroObrigatorio: doc.parametroObrigatorio,
                parametroOrigem: doc.parametroOrigem,
                parametroOrigemDescricao: doc.parametroOrigemDescricao,
                parametroTipo: doc.parametroTipo,
                parametroTipoDescricao: doc.parametroTipoDescricao
              })
            } else {
              const contador = this.listaParametros.length;
              for (let i = 0; i < contador; i++) {                
                if (this.listaParametros[i].parametro.parametroId === doc.parametroId) {                  
                  if (this.listaParametros[i].parametro.parametroObrigatorio === doc.parametroObrigatorio) {                   
                    this.listaParametrosModelo.push({
                      algoritmos: doc.algoritmo,
                      funcoesMineracao: doc.funcaoMineracao,
                      listaAlgoritmos: doc.listaAlgoritmos,
                      listaFuncoes: doc.listaFuncoes,
                      opcaoParametros: doc.opcaoParametros,
                      parametroAlias: doc.parametroAlias,
                      parametroId: doc.parametroId,
                      parametroMaximo: doc.parametroMaximo,
                      parametroMinimo: doc.parametroMinimo,
                      parametroNome: doc.parametroNome,
                      parametroObrigatorio: doc.parametroObrigatorio,
                      parametroOrigem: doc.parametroOrigem,
                      parametroOrigemDescricao: doc.parametroOrigemDescricao,
                      parametroTipo: doc.parametroTipo,
                      parametroTipoDescricao: doc.parametroTipoDescricao
                    })
                  }else{
                    this.listaParametros.splice(i,0)
                    d.forEach((p) => {
                      this.listaParametros.push({
                        parametro: doc,
                        parametroAlias: p.parametro.parametroAlias,
                        parametroModeloValor: p.parametroModeloValor,
                        parametroModeloId: p.parametroModeloId
                      });
                    });
                  }
                } else {
                  if (doc.parametroObrigatorio) {
                    this.parametrosObrigatorio.push({
                      algoritmos: doc.algoritmo,
                      funcoesMineracao: doc.funcaoMineracao,
                      listaAlgoritmos: doc.listaAlgoritmos,
                      listaFuncoes: doc.listaFuncoes,
                      opcaoParametros: doc.opcaoParametros,
                      parametroAlias: doc.parametroAlias,
                      parametroId: doc.parametroId,
                      parametroMaximo: doc.parametroMaximo,
                      parametroMinimo: doc.parametroMinimo,
                      parametroNome: doc.parametroNome,
                      parametroObrigatorio: doc.parametroObrigatorio,
                      parametroOrigem: doc.parametroOrigem,
                      parametroOrigemDescricao: doc.parametroOrigemDescricao,
                      parametroTipo: doc.parametroTipo,
                      parametroTipoDescricao: doc.parametroTipoDescricao
                    });
                    this.parametroObrigatorio = true;
                    this.qtdParametroObrigatorio = this.qtdParametroObrigatorio + 1;
                  }                  
                  this.listaParametrosModelo.push({
                    algoritmos: doc.algoritmo,
                    funcoesMineracao: doc.funcaoMineracao,
                    listaAlgoritmos: doc.listaAlgoritmos,
                    listaFuncoes: doc.listaFuncoes,
                    opcaoParametros: doc.opcaoParametros,
                    parametroAlias: doc.parametroAlias,
                    parametroId: doc.parametroId,
                    parametroMaximo: doc.parametroMaximo,
                    parametroMinimo: doc.parametroMinimo,
                    parametroNome: doc.parametroNome,
                    parametroObrigatorio: doc.parametroObrigatorio,
                    parametroOrigem: doc.parametroOrigem,
                    parametroOrigemDescricao: doc.parametroOrigemDescricao,
                    parametroTipo: doc.parametroTipo,
                    parametroTipoDescricao: doc.parametroTipoDescricao
                  })
                }
              }
            }              
          })          
          this.listaParametrosModeloCompleto = this.listaParametrosModelo;          
        });        
      });

      const contadorH = listaHistorico[0].length;
      for (let i = 0; i < contadorH; i++) {
        if (listaHistorico[0][i].historicoEvento === 'TESTADO') {
          this.historicoTeste = true;
          break;
        }
      }

    } else {
      this.historicoTeste = false;
      this.edicao = false;
    }  
    this.grupoService.listar('2').subscribe((lista) => {
      lista.forEach((doc) => {
        this.listaGrupo.push({
          grupoId: doc.grupoId,
          grupoNome: doc.grupoNome,
          grupoTotalRegistros:doc.grupoTotalRegistros
        })        
      })
      this.grupo$ = this.listaGrupo;
    });
    
    this.mineracao$ = this.funcaoMineracaoService.listar();
    this.parametroService.listaParametroTipo().subscribe((m) => {
      this.listaTipoParametro$ = m;
    });
    this.colunas = this.listaParametros;
  }

  verificaNumber(newValue) {
    if (this.number.test(newValue.substr(0, 1))) {
      swal.fire('Aviso', 'O modelo não pode ser iniciado por números', 'warning');
    }
  }

  carregaAtributos() {
    this.modeloService.listaAtributoModelo().subscribe((doc) => {
      doc.forEach((atributo) => {
        if (atributo.atributoModeloTipo === 'ALVO' && atributo.modelo.modeloId === this.modeloId) {
          this.atributoAlvoNome = atributo.atributo.atributoAlias;
          this.atributoAlvo = atributo;
          this.listaDadosAlvo.push({
            atributoModeloId: atributo.atributoModeloId,
            modelo: this.modelo,
            atributo: atributo.atributo,
            atributoModeloTipo: atributo.atributoModeloTipo,
            atributoModeloExpressao: atributo.atributoModeloExpressao,
            atributoModeloReversao: atributo.atributoModeloReversao,
            atributoModeloTexto: atributo.atributoModeloTexto
          });
          const remove = this.listaGrupoAtributosEdicao.indexOf(atributo.atributo.atributoId);
          this.listaGrupoAtributosEdicao.splice(remove, 1);
          this.listaGrupoAtributosTemp.push(atributo);          
        }
        if (atributo.atributoModeloTipo === 'CHAVE' && atributo.modelo.modeloId === this.modeloId) {
          this.atributoChaveNome = atributo.atributo.atributoAlias;
          this.atributoChave = atributo;
          this.listaDadosChave.push({
            atributoModeloId: atributo.atributoModeloId,
            modelo: this.modelo,
            atributo: atributo.atributo,
            atributoModeloTipo: atributo.atributoModeloTipo,
            atributoModeloExpressao: atributo.atributoModeloExpressao,
            atributoModeloReversao: atributo.atributoModeloReversao,
            atributoModeloTexto: atributo.atributoModeloTexto
          });
          const remove = this.listaGrupoAtributosEdicao.indexOf(atributo.atributo.atributoId);
          this.listaGrupoAtributosEdicao.splice(remove, 1);
          this.listaGrupoAtributosTemp.push(atributo);
        }
        if (atributo.atributoModeloTipo === 'PREDITIVO' && atributo.modelo.modeloId === this.modeloId) {
          this.listaPreditivos.push({
            atributoModeloId: atributo.atributoModeloId,
            modelo: this.modelo,
            atributo: atributo.atributo,
            atributoModeloTipo: atributo.atributoModeloTipo,
            atributoModeloExpressao: atributo.atributoModeloExpressao,
            atributoModeloReversao: atributo.atributoModeloReversao,
            atributoModeloTexto: atributo.atributoModeloTexto
          });
          const remove = this.listaGrupoAtributosEdicao.indexOf(atributo.atributo.atributoId);
          this.listaGrupoAtributosEdicao.splice(remove, 1);
          this.listaGrupoAtributosTemp.push(atributo);
        }
      });
      // this.listaGrupoAtributos = [];
      const contador = this.listaGrupoAtributosEdicao.length;
      for (let i = 0; i < contador; i++) {
        if (!this.listaGrupoAtributosTemp.find(p => p.atributo.atributoId === this.listaGrupoAtributosEdicao[i].atributo.atributoId)) {
          this.listaGrupoAtributos.push(this.listaGrupoAtributosEdicao[i]);
          if (!this.atributoAlvo) {
            this.clusterizacao = true;
          }
        }
      }
      
      this.listaGrupoAtributos.sort(function (a: any, b: any) {
        if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
        if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
        return 0;
      });
    });
  }

  onChangeGrupo() {
    if (this.grupoSel) {
      const contador = this.listaPreditivos.length;
      for (let i = 0; i < contador; i++) {
        if (this.listaPreditivos[i].atributoModeloId) {
          this.listaPreditivosRemovidos.push(this.listaPreditivos[i]);
        }
      }
      this.listaPreditivosRemovidos.push(this.listaDadosAlvo[0]);
      this.listaPreditivosRemovidos.push(this.listaDadosChave[0]);
      this.listaGrupoAtributos = [];
      this.listaAtributo = [];
      this.listaPreditivos = [];
      this.atributoAlvoNome = '',
        this.atributoChaveNome = '',
        this.atributoChave = {};
      this.atributoAlvo = {};
      this.grupoEdicao = this.grupoSel;
      this.atributos$ = this.atributoGrupoService.listarGrupo(this.grupoSel.grupoId);
      this.atributoGrupoService.listarGrupo(this.grupoSel.grupoId).subscribe((atr) => {
        atr.forEach((doc) => {
          this.listaGrupoAtributos.push(doc);
        });
        this.listaGrupoAtributos.sort(function (a: any, b: any) {
          if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
          if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
          return 0;
        });
        if (this.grupoSel.grupoTotalRegistros === null || this.grupoSel.grupoTotalRegistros === 0) {
          this.grupoTotalRegistro = '0 Registros';
        } else {
          this.grupoTotalRegistro = this.grupoSel.grupoTotalRegistros + ' Registros';
        }
      });
      
    }
  }

  onChangePercentGrupo() {
    this.percentGrupo = this.modeloPercentGrupo.valor;
  }
  onChangePercentTreino() {
    this.percentTreino = this.modeloPercentTreino.valor;
  }

  atualizaListaAtributos(listaIdModelos, id) {
   // if (listaIdModelos.indexOf(id) === -1) {
     // listaIdModelos.push(id);
      // console.log('Nova coleção de listaIdModelos é : ' + listaIdModelos);
    //} else if (listaIdModelos.indexOf(id) > -1) {
      //const index = listaIdModelos.indexOf(id);
      //if (index === 0) {
        //listaIdModelos.splice(0);
      //} else {
        //listaIdModelos.splice(index);
      //}
      // console.log('Nova coleção de listaIdModelos é : ' + listaIdModelos);
    //}
    if (this.listaAtributo.length === 0) {
      this.listaAtributo.push(id);
    } else {
      if (this.listaAtributo.find(p => p === id)) {
        const index = this.listaAtributo.indexOf(id);
        this.listaAtributo.splice(index, 1);
      } else {
        this.listaAtributo.push(id);
      }
    }
  }

  selecionaModelo(atributo: any) {
    this.atualizaListaAtributos(this.listaAtributo, atributo.atributoId);
  }


  onChangeAlgoritmo() {
    this.listaTipoParametro = {};
    this.tipoParametro = '';
    this.tipoMinimoParametro = 0;
    this.tipoMaximoParametro = 0;
    this.funcaoAlgoritmo = {};
    this.algoritmoEdicao = {};
    this.listaParametrosObrigatorio = [];
    this.listaParametrosModelo = [];    
    this.listaParametrosModeloCompleto = [];
    if (this.funcaoMineracaoModel) {
      // this.funcaoAlgoritmo = {};
      if (this.funcaoMineracaoModel.funcaoMineracaoAlias === 'Clusterização') {
        this.clusterizacao = true;
        this.modeloPercentTreino = { descricao: '100%', valor: '100' };
        this.percentTreino = 100;
        this.atributoAlvoNome = '';
      } else {
        this.clusterizacao = false;
        this.modeloPercentTreino = null;
        this.percentTreino = null;
        this.atributoAlvoNome = '';
      }
      this.funcaoAlgoritmo$ = this.funcaoMineracaoAlgoritmoService.listar(this.funcaoMineracaoModel.funcaoMineracaoId);
    }
  }
  changeAlgoritmo() {
    this.algoritmoEdicao = this.funcaoAlgoritmo.algoritmo;
  }
  changeGrupo() {
    this.grupoEdicao = this.grupoSel;
  }
  onChangeParametros() {
    this.parametroEdicao = true;
    const contador = this.listaParametros.length;
    for (let i = 0; i < contador; i++) {
      if (this.listaParametros[i].parametroModeloId) {
        this.listaParametrosRemovidos.push(this.listaParametros[i]);
      }
    }
    
    this.listaTipoParametro = {};
    this.listaParametros = [];
    this.tipoParametro = '';
    this.tipoMinimoParametro = 0;
    this.tipoMaximoParametro = 0;
    this.parametros = {};
    this.parametrosObrigatorio = [];
    this.parametroObrigatorio = false;
    if (this.funcaoAlgoritmo) {
      this.algoritmoEdicao = this.funcaoAlgoritmo.algoritmo;
      // tslint:disable-next-line: max-line-length
      this.parametroService.listaParametroFuncaoAlgoritmo(this.funcaoAlgoritmo.algoritmo.algoritmoId, this.funcaoMineracaoModel.funcaoMineracaoId).subscribe((parametro) => {
        parametro.forEach((doc) => {
          this.listaParametrosModelo.push({
            algoritmos: doc.algoritmo,
            funcoesMineracao: doc.funcaoMineracao,
            listaAlgoritmos: doc.listaAlgoritmos,
            listaFuncoes: doc.listaFuncoes,
            opcaoParametros: doc.opcaoParametros,
            parametroAlias: doc.parametroAlias,
            parametroId: doc.parametroId,
            parametroMaximo: doc.parametroMaximo,
            parametroMinimo: doc.parametroMinimo,
            parametroNome: doc.parametroNome,
            parametroObrigatorio: doc.parametroObrigatorio,
            parametroOrigem: doc.parametroOrigem,
            parametroOrigemDescricao: doc.parametroOrigemDescricao,
            parametroTipo: doc.parametroTipo,
            parametroTipoDescricao: doc.parametroTipoDescricao
          })
          if (doc.parametroObrigatorio) {
            this.parametrosObrigatorio.push({
              algoritmos: doc.algoritmo,
              funcoesMineracao: doc.funcaoMineracao,
              listaAlgoritmos: doc.listaAlgoritmos,
              listaFuncoes: doc.listaFuncoes,
              opcaoParametros: doc.opcaoParametros,
              parametroAlias: doc.parametroAlias,
              parametroId: doc.parametroId,
              parametroMaximo: doc.parametroMaximo,
              parametroMinimo: doc.parametroMinimo,
              parametroNome: doc.parametroNome,
              parametroObrigatorio: doc.parametroObrigatorio,
              parametroOrigem: doc.parametroOrigem,
              parametroOrigemDescricao: doc.parametroOrigemDescricao,
              parametroTipo: doc.parametroTipo,
              parametroTipoDescricao: doc.parametroTipoDescricao
            });
            this.parametroObrigatorio = true;
            this.qtdParametroObrigatorio = this.qtdParametroObrigatorio + 1;
          }
        })
        this.listaParametrosModeloCompleto = this.listaParametrosModelo;
      console.log(this.listaParametrosModeloCompleto);
      });      
      
    }
    

  }
  onChangeTipoParametro(evento) {
    
    // tslint:disable-next-line: max-line-length
    this.listaTipoParametro = evento;
    this.tipoParametro = this.listaParametrosModelo.find(p => p.parametroAlias === evento.parametroAlias).parametroTipo;
    this.tipoMinimoParametro = this.listaParametrosModelo.find(p => p.parametroAlias === evento.parametroAlias).parametroMinimo;
    this.tipoMaximoParametro = this.listaParametrosModelo.find(p => p.parametroAlias === evento.parametroAlias).parametroMaximo;
    this.opcaoParametroList = this.opcaoParametroApi.listar(this.listaParametrosModelo.find(p => p.parametroAlias === evento.parametroAlias).parametroId);
    this.listaTipoParametro = this.listaParametrosModelo.find(p => p.parametroAlias === evento.parametroAlias);
  }

  onchangePreditivo() {
    if (this.listaAtributo.length === 0) {
      swal.fire('Aviso', 'Selecione pelo menos 1 atributo', 'warning');
    } else {
      if (this.listaPreditivos.length > 0) {
        this.listaGrupoAtributos = [];
        const contador = this.listaAtributo.length;
        this.atributos$.subscribe((query) => {
          query.forEach((doc) => {
            this.listaGrupoAtributos.push(doc);
            for (let i = 0; i < contador; i++) {
              if (doc.atributo.atributoId === this.listaAtributo[i]) {
                this.listaPreditivos.push(doc);
                this.listaAtributo.splice(i, 1);
                const remove = this.listaGrupoAtributos.indexOf(this.listaPreditivos[i].atributo.atributoId);
                this.listaGrupoAtributos.splice(remove, 1);
              }
            }
            if (this.atributoChaveNome !== '') {
              if (this.atributoChave.atributo.atributoId === doc.atributo.atributoId) {
                const removeChave = this.listaGrupoAtributos.indexOf(this.atributoChave.atributo.atributoId);
                this.listaGrupoAtributos.splice(removeChave, 1);
              }
            }
            if (this.atributoAlvoNome !== '') {
              if(this.atributoAlvo){
                if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
                  const removeChave = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
                  this.listaGrupoAtributos.splice(removeChave, 1);
                }
              }                    
            }
            if (this.listaPreditivos.length > 0) {
              const contadorPre = this.listaPreditivos.length;
              for (let i = 0; i < contadorPre; i++) {
                if (doc.atributo.atributoId === this.listaPreditivos[i].atributo.atributoId) {
                  const remove = this.listaGrupoAtributos.indexOf(this.listaPreditivos[i].atributo.atributoId);
                  this.listaGrupoAtributos.splice(remove, 1);
                }
              }
            } else {
              this.listaPreditivos = [];
            }
          });
          this.listaGrupoAtributos.sort(function (a: any, b: any) {
            if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
            if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
            return 0;
          });
        });
      } else {
        this.listaGrupoAtributos = [];
        this.listaPreditivos = [];
        const contador = this.listaAtributo.length;
        this.atributos$.subscribe((query) => {
          query.forEach((doc) => {
            this.listaGrupoAtributos.push(doc);
            for (let i = 0; i < contador; i++) {
              if (doc.atributo.atributoId === this.listaAtributo[i]) {
                const remove = this.listaGrupoAtributos.indexOf(this.listaPreditivos[i]);
                this.listaPreditivos.push(doc);
                this.listaGrupoAtributos.splice(remove, 1);
                this.listaAtributo.splice(i, 1);
              } else {
                if (this.atributoChaveNome !== '') {
                  if (this.atributoChave.atributo.atributoId === doc.atributo.atributoId) {
                    const removeChave = this.listaGrupoAtributos.indexOf(this.atributoChave.atributo.atributoId);
                    this.listaGrupoAtributos.splice(removeChave, 1);
                  }
                }
                if (this.atributoAlvoNome !== '') {
                  if(this.atributoAlvo){
                    if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
                      const removeChave = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
                      this.listaGrupoAtributos.splice(removeChave, 1);
                    }
                  }                    
                }
              }
            }
          });
          this.listaGrupoAtributos.sort(function (a: any, b: any) {
            if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
            if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
            return 0;
          });
        });
      }
    }
  }

  removePreditivo(preditivo) {        
    const removePred = this.listaPreditivos.findIndex(p => p.atributo.atributoId === preditivo);
    this.listaPreditivos.splice(removePred, 1);

    this.listaGrupoAtributos = [];
    this.atributos$.subscribe((query) => {
      query.forEach((doc) => {
        this.listaGrupoAtributos.push(doc);
        if (this.atributoChaveNome !== '') {
          if (this.atributoChave.atributo.atributoId === doc.atributo.atributoId) {
            const removeChave = this.listaGrupoAtributos.indexOf(this.atributoChave.atributo.atributoId);
            this.listaGrupoAtributos.splice(removeChave, 1);
          }
        }        
        if (this.atributoAlvoNome !== '' || this.atributoAlvoNome !== null) {
          if(this.atributoAlvo){
            if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
              const removeChave = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
              this.listaGrupoAtributos.splice(removeChave, 1);
            }
          }          
        }
        if (this.listaPreditivos.length > 0) {
          const contador = this.listaPreditivos.length;
          for (let i = 0; i < contador; i++) {
            if (doc.atributo.atributoId === this.listaPreditivos[i].atributo.atributoId) {
              const remove = this.listaGrupoAtributos.indexOf(this.listaPreditivos[i].atributo.atributoId);
              this.listaGrupoAtributos.splice(remove, 1);
            }
          }
        } else {
          this.listaPreditivos = [];
        }

      });
      this.listaGrupoAtributos.sort(function (a: any, b: any) {
        if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
        if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
        return 0;
      });
    });
  }

  onChangeChave() {
    if (this.listaAtributo.length === 0) {
      swal.fire('Aviso', 'Selecione pelo menos 1 atributo', 'warning');
    } else if (this.listaAtributo.length > 1) {
      swal.fire('Aviso', 'Você pode selecionar apenas um item para o Atributo Chave', 'warning');
    } else {
      this.listaGrupoAtributos = [];
      this.atributos$.subscribe((query) => {
        query.forEach((doc) => {
          this.listaGrupoAtributos.push(doc);
          if (doc.atributo.atributoId === this.listaAtributo[0]) {
            const removeId = this.listaGrupoAtributos.indexOf(this.listaAtributo[0]);
            this.atributoChaveNome = doc.atributo.atributoAlias;
            this.atributoChave = doc;
            this.listaGrupoAtributos.splice(removeId, 1);
            this.listaAtributo = [];
          } else {
            if (this.atributoAlvoNome !== '') {
              if(this.atributoAlvo){
                if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
                  const removeChave = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
                  this.listaGrupoAtributos.splice(removeChave, 1);
                }
              }                    
            }
            if (this.listaPreditivos.length > 0) {
              const contador = this.listaPreditivos.length;
              for (let i = 0; i < contador; i++) {
                if (doc.atributo.atributoId === this.listaPreditivos[i].atributo.atributoId) {
                  const remove = this.listaGrupoAtributos.indexOf(this.listaPreditivos[i].atributo.atributoId);
                  this.listaGrupoAtributos.splice(remove, 1);
                }
              }
            }
          }
        });
        this.listaGrupoAtributos.sort(function (a: any, b: any) {
          if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
          if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
          return 0;
        });
      });

    }
  }

  onChangeAlvo() {
    if (this.listaAtributo.length === 0) {
      swal.fire('Aviso', 'Selecione pelo menos 1 atributo', 'warning');
    } else if (this.listaAtributo.length > 1) {
      swal.fire('Aviso', 'Você pode selecionar apenas um item para o Atributo Alvo', 'warning');
    } else {
      this.listaGrupoAtributos = [];
      this.atributos$.subscribe((query) => {
        query.forEach((doc) => {
          this.listaGrupoAtributos.push(doc);
          if (doc.atributo.atributoId === this.listaAtributo[0]) {
            const removeId = this.listaGrupoAtributos.indexOf(this.listaAtributo[0]);
            this.atributoAlvoNome = doc.atributo.atributoAlias;
            this.atributoAlvo = doc;
            this.listaGrupoAtributos.splice(removeId, 1);
            this.listaAtributo = [];
          } else {
            if (this.atributoChaveNome !== '') {
              if (this.atributoChave.atributo.atributoId === doc.atributo.atributoId) {
                const removeAlvo = this.listaGrupoAtributos.indexOf(this.atributoChave.atributo.atributoId);
                this.listaGrupoAtributos.splice(removeAlvo, 1);
              }
            }
            if (this.listaPreditivos.length > 0) {
              const contador = this.listaPreditivos.length;
              for (let i = 0; i < contador; i++) {
                if (doc.atributo.atributoId === this.listaPreditivos[i].atributo.atributoId) {
                  const remove = this.listaGrupoAtributos.indexOf(this.listaPreditivos[i].atributo.atributoId);
                  this.listaGrupoAtributos.splice(remove, 1);
                }
              }
            }
          }
        });
        this.listaGrupoAtributos.sort(function (a: any, b: any) {
          if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
          if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
          return 0;
        });
      });
      // this.atributoChave
    }
  }

  cadastraParametro() {
    let valor = '';    
    if (this.listaParametros.filter(id => id.parametro.parametroId === this.listaTipoParametro.parametroId).length > 0) {
      swal.fire('Aviso', 'Você não pode cadastrar o mesmo parâmentro', 'warning');
      return;
    }
    if (!this.listaTipoParametro) {
      swal.fire('Aviso', 'Selecione o Parâmetro', 'warning');
      return;
    }
    if (this.listaTipoParametro.parametroTipo === 'ATRIBUTO') {
      if (!this.atributoParametro) {
        swal.fire('Aviso', 'Selecione o Atributo', 'warning');
        return;
      } else {
        valor = this.atributoParametro.atributo.atributoAlias;
      }
    }
    if (this.listaTipoParametro.parametroTipo === 'LISTA_OPCOES') {
      if (!this.opcaoParametro) {
        swal.fire('Aviso', 'Selecione a Opção parâmetro', 'warning');
        return;
      } else {
        valor = this.opcaoParametro.opcaoParametroAlias;
        // valor = 'teste';
      }
    }
    if (this.listaTipoParametro.parametroTipo === 'CONSTANTE') {
      if (!this.valorParametro) {
        swal.fire('Aviso', 'Digite o valor', 'warning');
        return;
      } else if (this.valorParametro < this.tipoMinimoParametro || this.valorParametro > this.tipoMaximoParametro) {
        // tslint:disable-next-line: max-line-length
        swal.fire('Aviso', 'O valor deve ser maior que ' + this.tipoMinimoParametro + ' e menor ou igual ' + this.tipoMaximoParametro, 'warning');
        return;
      } else {
        valor = '' + this.valorParametro;
      }
    }
    const contador = this.parametrosObrigatorio.length;
    for (let i = 0; i < contador; i++) {
      if (this.parametrosObrigatorio[i].parametroId === this.listaTipoParametro.parametroId) {
        if (this.parametrosObrigatorio.length === 1) {
          this.parametrosObrigatorio = [];
        } else {
          this.parametrosObrigatorio.splice(i, 0)
        }
      }
    }
    if (this.parametrosObrigatorio.length === 0) {
      this.parametroObrigatorio = false;
    }
    this.listaParametros.push({
      parametro: this.listaTipoParametro,
      parametroAlias: this.listaTipoParametro.parametroAlias,
      parametroModeloValor: valor,
      parametroModeloId: null
    });
  }

  removeParametro(valor) {
    swal.fire({
      title: 'Aviso',
      text: 'Deseja realmente remover o parametro ' + valor.parametroAlias + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.listaParametros.forEach((m) => {
          if (m.parametroAlias === valor.parametroAlias) {
            if (m.parametro.parametroObrigatorio === true) {
              this.parametrosObrigatorio.push({
                algoritmos: m.parametro.algoritmo,
                funcoesMineracao: m.parametro.funcaoMineracao,
                listaAlgoritmos: m.parametro.listaAlgoritmos,
                listaFuncoes: m.parametro.listaFuncoes,
                opcaoParametros: m.parametro.opcaoParametros,
                parametroAlias: m.parametro.parametroAlias,
                parametroId: m.parametro.parametroId,
                parametroMaximo: m.parametro.parametroMaximo,
                parametroMinimo: m.parametro.parametroMinimo,
                parametroNome: m.parametro.parametroNome,
                parametroObrigatorio: m.parametro.parametroObrigatorio,
                parametroOrigem: m.parametro.parametroOrigem,
                parametroOrigemDescricao: m.parametro.parametroOrigemDescricao,
                parametroTipo: m.parametro.parametroTipo,
                parametroTipoDescricao: m.parametro.parametroTipoDescricao
              })
              this.parametroObrigatorio = true;
              this.listaTipoParametro = null;
              if (m.parametroModeloId) {
                this.listaParametrosRemovidos.push(m);
                const index: number = this.listaParametros.indexOf(m);
                this.listaParametros.splice(index, 1);
              } else {
                const index: number = this.listaParametros.indexOf(m);
                this.listaParametros.splice(index, 1);
              }
              this.tipoParametro = '';
              this.tipoMinimoParametro = 0;
              this.tipoMaximoParametro = 0;
            } else {
              this.parametroObrigatorio = false;
              this.listaTipoParametro = null;
              if (m.parametroModeloId) {
                this.listaParametrosRemovidos.push(m);
                const index: number = this.listaParametros.indexOf(m);
                this.listaParametros.splice(index, 1);
              } else {
                const index: number = this.listaParametros.indexOf(m);
                this.listaParametros.splice(index, 1);
              }
              this.tipoParametro = '';
              this.tipoMinimoParametro = 0;
              this.tipoMaximoParametro = 0;
            }

          }
        });
      }
    });
  }

  salvarParametro(modelo) {
    const contador = this.listaParametros.length;
    for (let i = 0; i <= contador; i++) {
      if (contador === 1) {
        if (this.listaParametros[i].parametroModeloId === null) {
          this.dadosParametro.modelo = modelo;
          this.dadosParametro.parametro = this.listaParametros[i].parametro;
          this.dadosParametro.parametroModeloValor = this.listaParametros[i].parametroModeloValor;
          this.dadosParametro.parametroModeloId = this.listaParametros[i].parametroModeloid;
          this.modeloService.salvarParametro(this.dadosParametro).subscribe((res) => {
            swal.fire('Sucesso', 'Modelo alterado com sucesso', 'success').then(() => {
              this.voltar();
            });
          });
        } else {
          swal.fire('Sucesso', 'Modelo alterado com sucesso', 'success').then(() => {
            this.voltar();
          });
        }
      } else {
        if (i === contador) {
          swal.fire('Sucesso', 'Modelo alterado com sucesso', 'success').then(() => {
            this.voltar();
          });
        } else {
          if (this.listaParametros[i].parametroModeloId === null) {
            this.dadosParametro.modelo = modelo;
            this.dadosParametro.parametro = this.listaParametros[i].parametro;
            this.dadosParametro.parametroModeloValor = this.listaParametros[i].parametroModeloValor;
            this.dadosParametro.parametroModeloId = this.listaParametros[i].parametroModeloid;
            this.modeloService.salvarParametro(this.dadosParametro).subscribe((res) => {
              console.log('salvei ' + this.listaParametros[i].valorParametro);
            });
          }
        }
      }
    }
  }
  removeParametroOld(modelo) {    
    const contadorRemovidos = this.listaParametrosRemovidos.length;
    if (this.listaParametrosRemovidos.length > 0) {
      if(this.listaParametrosRemovidos.length === 1){
        this.modeloService.removeParametroModelo(this.listaParametrosRemovidos[0].parametroModeloId).subscribe((res) => {
          this.salvarParametro(modelo);
        });
      } else{
        for (let i = 0; i <= contadorRemovidos; i++) {
          if (i === contadorRemovidos) {
            this.salvarParametro(modelo);
          } else {
            this.modeloService.removeParametroModelo(this.listaParametrosRemovidos[i].parametroModeloId).subscribe((res) => {
              console.log('aqui '+res);
            });
          }
        }
      }     
    } else {
      this.salvarParametro(modelo);
    }
  }
  salvaPreditivo(modelo) {
    if (this.clusterizacao === false) {
      this.dadosAtributo.atributo = this.atributoAlvo.atributo;
      this.dadosAtributo.modelo = modelo;
      this.dadosAtributo.atributoModeloTipo = 'ALVO';
      this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
        console.log('Atributo alvo salvo ');
      });
    }
    this.dadosAtributo.atributo = this.atributoChave.atributo;
    this.dadosAtributo.modelo = modelo;
    this.dadosAtributo.atributoModeloTipo = 'CHAVE';
    this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
      console.log('Atributo Chave salvo ');
    });
    const contador = this.listaPreditivos.length;
    for (let i = 0; i <= contador; i++) {
      if (contador === 1) {
        this.dadosAtributo.atributo = this.listaPreditivos[i].atributo;
        this.dadosAtributo.modelo = modelo;
        this.dadosAtributo.atributoModeloTipo = 'PREDITIVO';
        this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
          this.removeParametroOld(modelo);
        });
      } else {
        if (i === contador) {
          this.removeParametroOld(modelo);
        } else {
          this.dadosAtributo.atributo = this.listaPreditivos[i].atributo;
          this.dadosAtributo.modelo = modelo;
          this.dadosAtributo.atributoModeloTipo = 'PREDITIVO';
          this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
            console.log('cadastra preditivo');
          });
        }
      }

    }
  }
  removePreditivoOld(modelo) {
    const contadorRemovidos = this.listaGrupoAtributosTemp.length;
    if (this.listaGrupoAtributosTemp.length > 0) {
      if(this.listaGrupoAtributosTemp.length === 1){
        this.modeloService.removeAtributoModelo(this.listaGrupoAtributosTemp[0].atributoModeloId).subscribe((res) => {
          this.salvaPreditivo(modelo);
        });
      }else{
        for (let i = 0; i <= contadorRemovidos; i++) {
          if (i === contadorRemovidos) {
            this.salvaPreditivo(modelo);
          } else {
            this.modeloService.removeAtributoModelo(this.listaGrupoAtributosTemp[i].atributoModeloId).subscribe((res) => {
              console.log(res);
            });
          }          
        }
      }      
    }
  }

  publicacao(e) {
    this.publicacaoSel = e.target.checked;
  }
  voltar() {
    this.location.back();
  }
  atualizaPublicacao(pub) {
    const modelo: Modelo = {};
    modelo.modeloId = this.modelo.modeloId;
    modelo.modeloNome = this.modelo.modeloNome;
    modelo.historicos = this.modelo.historicos;
    modelo.grupo = this.modelo.grupo;
    modelo.funcaoMineracao = this.modelo.funcaoMineracao;
    modelo.algoritmo = this.modelo.algoritmo;
    modelo.modeloPublicado = pub;
    modelo.modeloTabelaConfig = this.modelo.modeloTabelaConfig;
    modelo.modeloSchemaConfig = this.modelo.modeloSchemaConfig;
    modelo.modeloPercentGrupo = this.modelo.modeloPercentGrupo;
    modelo.modeloPercentTreino = this.modelo.modeloPercentTreino;
    modelo.modeloAcuraciaMedia = this.modelo.modeloAcuraciaMedia;
    modelo.modeloDataCriacao = this.modelo.modeloDataCriacao;
    modelo.usuario = this.usuarioService.currentUserValue;

    this.modeloService.alterar(modelo).subscribe((res) => {
      if (pub === 0) {
        swal.fire('Sucesso', 'Modelo publicado com suceso', 'success').then(() => {
          this.publicacaoSelEdit = 'SIM';
        });
      } else {
        swal.fire('Sucesso', 'Modelo despublicado com suceso', 'success').then(() => {
          this.publicacaoSelEdit = 'NÃO';
        });
      }
    });
  }
  cadastraModelo() {
    if (!this.modeloNome) {
      swal.fire('Aviso', 'Informe o nome do Modelo', 'warning');
      return;
    }
    if (this.number.test(this.modeloNome.substr(0, 1))) {
      swal.fire('Aviso', 'O modelo não pode ser iniciado por números', 'warning');
      return;
    }
    if (!this.grupoSel) {
      swal.fire('Aviso', 'Selecione o grupo de Mineração', 'warning');
      return;
    }
    if (this.listaPreditivos.length === 0) {
      swal.fire('Aviso', 'Selecione ao menos um Preditivo', 'warning');
      return;
    }
    if (this.atributoChaveNome === '') {
      swal.fire('Aviso', 'Selecione o atributo Chave', 'warning');
      return;
    }
    if (this.clusterizacao === true) {
      this.atributoAlvo = null;
    } else {
      if (this.atributoAlvoNome === '') {
        swal.fire('Aviso', 'Selecione o atributo Alvo', 'warning');
        return;
      }
    }
    if (!this.funcaoMineracaoModel) {
      swal.fire('Aviso', 'Selecione uma função de Mineração', 'warning');
      return;
    }
    if (!this.algoritmoEdicao) {
      swal.fire('Aviso', 'Selecione o Algoritmo', 'warning');
      return;
    }
    if (!this.percentGrupo) {
      swal.fire('Aviso', 'Selecione o percentual do Grupo', 'warning');
      return;
    }
    if (!this.percentTreino) {
      swal.fire('Aviso', 'Selecione o percentual do Treino', 'warning');
      return;
    }
    if (this.parametrosObrigatorio.length > 0) {
      swal.fire('Aviso', 'Você precisa cadastrar os parâmetros obrigatórios', 'warning');
      return;
    }
    const modelo: Modelo = {};
    modelo.modeloId = this.modelo.modeloId;
    modelo.modeloNome = this.modeloNome;
    modelo.grupo = this.grupoEdicao;
    if (this.modelo.modeloPublicado.toString() === 'NÃO') {
      modelo.modeloPublicado = 1;
    } else {
      modelo.modeloPublicado = 0;
    }
    modelo.modeloTabelaConfig = this.modelo.modeloTabelaConfig;
    modelo.modeloSchemaConfig = this.modelo.modeloSchemaConfig;
    modelo.modeloPercentGrupo = this.percentGrupo;
    modelo.modeloPercentTreino = this.percentTreino;
    modelo.funcaoMineracao = { ...this.funcaoMineracaoModel };
    modelo.algoritmo = this.algoritmoEdicao;
    modelo.usuario = this.usuarioService.currentUserValue;
    modelo.modeloAcuraciaMedia = this.modelo.modeloAcuraciaMedia;
    modelo.modeloDataCriacao = this.modelo.modeloDataCriacao;
    this.modeloService.alterar(modelo).subscribe((res) => {
      this.removePreditivoOld(res);
    });
  }

}
