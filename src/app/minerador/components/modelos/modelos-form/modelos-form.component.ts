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

// uando for constante mostrar a caixa de input pra digitar o valor em relaçao ao mínimo e maximo ja cadastrados.
// Ao selecionar por ATRIBUTO carregar as combos do atributo do grupo mineração selecionado no cadastro



@Component({
  selector: 'app-modelos-form',
  templateUrl: './modelos-form.component.html',
  styleUrls: ['./modelos-form.component.css']
})
export class ModelosFormComponent implements OnInit {

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
  funcaoAlgoritmo: FuncaoMineracaoAlgoritmo;
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
  atributoSel: Atributo;
  modeloForm: FormGroup;
  modelo: Modelo = {};
  modeloEdicao: Modelo;
  colunas: any;
  listaParametros: any[] = [];
  listaParametrosEdicao: any[] = [];
  parametros: Parametro = {};
  listaParametrosModelo: any[] = [];
  listaParametrosModeloCompleto: Parametro[] = [];
  parametrosObrigatorio: any[] = [];
  listaParametrosObrigatorio: any[] = [];
  parametroObrigatorio = false;
  qtdParametroObrigatorio = 0;
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
  listaGrupoAtributosTemp: any[] = [];
  grupoTotalRegistro: string;
  listaAtributo: any[] = [];
  verificaAtributo: boolean;
  listaPreditivos: any[] = [];
  dadosParametro: ParametroModelo = {};
  dadosAtributo: AtributoModelo = {};
  opcaoParametroList: Observable<OpcaoParametro[]>;
  opcaoParametro: OpcaoParametro;
  historicoTeste: boolean;
  historico: string;
  clusterizacao: boolean;
  number = /^[0-9]+$/;
  textNumber: boolean;

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
    this.textNumber = false;
    this.clusterizacao = false;
    for (let i = 0; i <= 100; i++) {
      this.listaPercentual.push({
        descricao: i + '%',
        valor: i
      });
    }

    if (history.state.data) {
      this.historico = history.state.historico;
      this.historicoTeste = false;
      const listaHistorico: any[] = [];
      listaHistorico.push(history.state.data.historicos);
      this.edicao = true;
      this.modelo = history.state.data;
      this.modeloId = history.state.data.modeloId;
      this.modeloNome = history.state.data.modeloNome;
      this.grupoSel = history.state.data.grupo.grupoNome;
      this.grupoTotalRegistro = history.state.data.grupo.grupoTotalRegistros;
      this.funcaoMineracaoModel = history.state.data.funcaoMineracao;
      this.funcaoAlgoritmo = history.state.data.algoritmo.algoritmoAlias;
      this.modeloPercentGrupo = history.state.data.modeloPercentGrupo;
      this.modeloPercentTreino = history.state.data.modeloPercentTreino;
      this.publicacaoSelEdit = history.state.data.modeloPublicado;
      if (history.state.data.grupo.grupoTotalRegistros === null || history.state.data.grupo.grupoTotalRegistros === 0) {
        this.grupoTotalRegistro = '0 Registros';
      } else {
        this.grupoTotalRegistro = history.state.data.grupo.grupoTotalRegistros + ' Registros';
      }
      this.atributos$ = this.atributoGrupoService.listarGrupo(history.state.data.grupo.grupoId);
      // tslint:disable-next-line: max-line-length
      this.parametroService.listaParametroFuncaoAlgoritmo(history.state.data.algoritmo.algoritmoId, history.state.data.funcaoMineracao.funcaoMineracaoId).subscribe((parametro) => {
        parametro.forEach((doc) => {
          if (doc.parametroObrigatorio) {
            this.parametroObrigatorio = true;
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
        })
      });
      this.parametroService.listaParametroModelo(history.state.data.modeloId).subscribe((doc) => {
        // console.log(doc);
        doc.forEach((parametro) => {
          this.listaParametrosEdicao.push({
            parametroAlias: parametro.parametro.parametroAlias,
            parametroModeloValor: parametro.parametroModeloValor,
            parametroModeloId: parametro.parametroModeloId
          });
        });
      });
      this.modeloService.listaAtributoModelo().subscribe((doc) => {
        doc.forEach((atributo) => {
          if (atributo.atributoModeloTipo === 'ALVO' && atributo.modelo.modeloId === this.modeloId) {
            this.atributoAlvoNome = atributo.atributo.atributoAlias;
          }
          if (atributo.atributoModeloTipo === 'CHAVE' && atributo.modelo.modeloId === this.modeloId) {
            this.atributoChaveNome = atributo.atributo.atributoAlias;
          }
          if (atributo.atributoModeloTipo === 'PREDITIVO' && atributo.modelo.modeloId === this.modeloId) {
            this.listaPreditivos.push(atributo);
          }
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
      this.clusterizacao = false;
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

  onChangeGrupo() {
    if (this.grupoSel) {      
      this.listaGrupoAtributos = [];
      this.listaAtributo = [];
      this.listaPreditivos = [];
      this.atributoAlvoNome = '',
        this.atributoChaveNome = '',
        this.atributoChave = {};
      this.atributoAlvo = {};
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

  atualizaListaAtributos(listaIdModelos, id) {
    //if (listaIdModelos.indexOf(id) === -1) {
    //listaIdModelos.push(id);
    // console.log('Nova coleção de listaIdModelos é : ' + listaIdModelos);
    //} else if (listaIdModelos.indexOf(id) > -1) {
    //const index = listaIdModelos.indexOf(id);
    //if (index === 0) {
    //listaIdModelos.splice(0);
    //} else {
    //listaIdModelos.splice(index);
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
    // console.log('Nova coleção de listaIdModelos é : ' + listaIdModelos);
    //}
    console.log(this.listaAtributo);
  }

  selecionaModelo(atributo: any) {
    this.atualizaListaAtributos(this.listaAtributo, atributo.atributoId);
  }


  onChangeAlgoritmo() {
    this.listaTipoParametro = null;
    this.tipoParametro = '';
    this.tipoMinimoParametro = 0;
    this.tipoMaximoParametro = 0;
    this.funcaoAlgoritmo = {};
    this.listaParametrosObrigatorio = [];
    this.listaParametrosModelo = [];
    this.listaParametrosModeloCompleto = [];
    this.listaParametros = [];
    if (this.funcaoMineracaoModel) {
      if (this.funcaoMineracaoModel.funcaoMineracaoAlias === 'Clusterização') {
        this.clusterizacao = true;
        this.modeloPercentTreino = { descricao: '100%', valor: '100' };
        this.atributoAlvoNome = '';
      } else {
        this.clusterizacao = false;
        this.modeloPercentTreino = null;
        this.atributoAlvoNome = '';
      }
      // this.funcaoAlgoritmo = {};
      this.funcaoAlgoritmo$ = this.funcaoMineracaoAlgoritmoService.listar(this.funcaoMineracaoModel.funcaoMineracaoId);
    }
  }
  onChangeParametros() {
    this.listaTipoParametro = null;
    this.parametros = {};
    this.parametroObrigatorio = false;
    if (this.funcaoAlgoritmo) {
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
      });
    }
  }
  onChangeTipoParametro(evento) {
    // tslint:disable-next-line: max-line-length    
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
        const contadorPred = this.listaPreditivos.length;
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
            for (let i = 0; i < contadorPred; i++) {
              if (doc.atributo.atributoId === this.listaPreditivos[i].atributo.atributoId) {
                const remove = this.listaGrupoAtributos.indexOf(this.listaPreditivos[i].atributo.atributoId);
                this.listaGrupoAtributos.splice(remove, 1);
              } else {
                if (this.atributoChaveNome !== '') {
                  if (this.atributoChave.atributo.atributoId === doc.atributo.atributoId) {
                    const removeChave = this.listaGrupoAtributos.indexOf(this.atributoChave.atributo.atributoId);
                    this.listaGrupoAtributos.splice(removeChave, 1);
                  }
                }
                if (this.atributoAlvoNome !== '') {
                  if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
                    const removeChave = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
                    this.listaGrupoAtributos.splice(removeChave, 1);
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
                  if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
                    const removeChave = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
                    this.listaGrupoAtributos.splice(removeChave, 1);
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
        // this.listaGrupoAtributos.sort(function (a: any, b: any) {
        //  if (a.atributo.atributoAlias < b.atributo.atributoAlias) { return -1; }
        //  if (a.atributo.atributoAlias > b.atributo.atributoAlias) { return 1; }
        //  return 0;
        // });
        if (this.atributoChaveNome !== '') {
          if (this.atributoChave.atributo.atributoId === doc.atributo.atributoId) {
            const removeChave = this.listaGrupoAtributos.indexOf(this.atributoChave.atributo.atributoId);
            this.listaGrupoAtributos.splice(removeChave, 1);
          }
        }
        if (this.atributoAlvoNome !== '') {
          if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
            const removeChave = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
            this.listaGrupoAtributos.splice(removeChave, 1);
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

  onChangeAtributo1() {
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
              if (this.atributoAlvo.atributo.atributoId === doc.atributo.atributoId) {
                const removeAlvo = this.listaGrupoAtributos.indexOf(this.atributoAlvo.atributo.atributoId);
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

    }
  }

  onChangeAtributo2() {
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
    if (this.edicao) {
      this.dadosParametro.modelo = this.modelo;
      this.dadosParametro.parametro = this.listaTipoParametro;
      this.dadosParametro.parametroModeloValor = valor;
      this.modeloService.salvarParametro(this.dadosParametro).subscribe((res) => {
        // tslint:disable-next-line: max-line-length
        this.parametroService.listaParametroModelo(this.modelo.modeloId).subscribe((doc) => {
          // console.log(doc);
          this.listaParametrosEdicao = [];
          doc.forEach((parametro) => {
            this.listaParametrosEdicao.push({
              parametroAlias: parametro.parametro.parametroAlias,
              parametroModeloValor: parametro.parametroModeloValor,
              parametroModeloId: parametro.parametroModeloId
            });
          });
        });
      });
    } else {
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
        valorParametro: valor,
      });
    }
  }

  removeParametro(valor) {
    if (this.edicao) {
      if (confirm('Deseja remover o parâmetro?')) {
        this.modeloService.removeParametroModelo(valor).subscribe((res) => {
          // tslint:disable-next-line: max-line-length
          this.parametroService.listaParametroModelo(this.modelo.modeloId).subscribe((doc) => {
            // console.log(doc);
            this.listaParametrosEdicao = [];
            doc.forEach((parametro) => {
              this.listaParametrosEdicao.push({
                parametroAlias: parametro.parametro.parametroAlias,
                parametroModeloValor: parametro.parametroModeloValor,
                parametroModeloId: parametro.parametroModeloId
              });
            });
          });
        });
      }
    } else {
      this.listaParametros.forEach((m) => {
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
          if (m.valorParametro === valor) {
            const index: number = this.listaParametros.indexOf(m);
            this.listaParametros.pop();
          }
          this.tipoParametro = '';
          this.tipoMinimoParametro = 0;
          this.tipoMaximoParametro = 0;
        } else {
          this.listaTipoParametro = null;
          if (m.valorParametro === valor) {
            const index: number = this.listaParametros.indexOf(m);
            this.listaParametros.pop();
          }
          this.tipoParametro = '';
          this.tipoMinimoParametro = 0;
          this.tipoMaximoParametro = 0;
        }

      });
    }

  }

  salvarParametro() {
    const contador = this.listaParametros.length;
    for (let i = 0; i <= contador; i++) {
      if (contador === 1) {
        this.dadosParametro.modelo = this.modeloEdicao;
        this.dadosParametro.parametro = this.listaParametros[i].parametro;
        this.dadosParametro.parametroModeloValor = this.listaParametros[i].valorParametro;
        this.modeloService.salvarParametro(this.dadosParametro).subscribe((res) => {
          swal.fire('Sucesso', 'Modelo cadastrado com sucesso', 'success').then(() => {
            this.voltar();
          });
        });
      } else {
        if (i === contador) {
          swal.fire('Sucesso', 'Modelo cadastrado com sucesso', 'success').then(() => {
            this.voltar();
          });
        } else {
          this.dadosParametro.modelo = this.modeloEdicao;
          this.dadosParametro.parametro = this.listaParametros[i].parametro;
          this.dadosParametro.parametroModeloValor = this.listaParametros[i].valorParametro;
          this.modeloService.salvarParametro(this.dadosParametro).subscribe((res) => {
            console.log('salvei ' + this.listaParametros[i].valorParametro);
          });
        }
      }
    }
  }

  salvarPreditivo() {
    if (this.clusterizacao === false) {
      this.dadosAtributo.atributo = this.atributoAlvo.atributo;
      this.dadosAtributo.modelo = this.modeloEdicao;
      this.dadosAtributo.atributoModeloTipo = 'ALVO';
      this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
        console.log('Atributo alvo salvo ');
      });
    }

    this.dadosAtributo.atributo = this.atributoChave.atributo;
    this.dadosAtributo.modelo = this.modeloEdicao;
    this.dadosAtributo.atributoModeloTipo = 'CHAVE';
    this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
      console.log('Atributo Chave salvo ');
    });
    const contador = this.listaPreditivos.length;
    for (let i = 0; i <= contador; i++) {
      if (contador === 1) {
        this.dadosAtributo.atributo = this.listaPreditivos[i].atributo;
        this.dadosAtributo.modelo = this.modeloEdicao;
        this.dadosAtributo.atributoModeloTipo = 'PREDITIVO';
        this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
          this.salvarParametro();
        });
      } else {
        if (i === contador) {
          this.salvarParametro();
        } else {
          this.dadosAtributo.atributo = this.listaPreditivos[i].atributo;
          this.dadosAtributo.modelo = this.modeloEdicao;
          this.dadosAtributo.atributoModeloTipo = 'PREDITIVO';
          this.modeloService.salvarAtributoModelo(this.dadosAtributo).subscribe((res) => {
            console.log('cadastra preditivo');
          });
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
    console.log(this.modelo.modeloAcuraciaMedia);
    console.log(this.modelo.modeloDataCriacao);
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

  cadModelo() {
    const validaParametro = false;
    console.log(this.listaParametrosObrigatorio);

  }
  cadastraModelo() {
    if (this.edicao === true) {
      this.voltar();
    } else {
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

      // if (!this.edicao === true) {
      //   if (!this.atributoChave) {
      //     swal.fire('Aviso', 'Selecione o atributo Chave', 'warning');
      //     return;
      //   }
      //   if (!this.atributoAlvo) {
      //     swal.fire('Aviso', 'Selecione o atributo Alvo', 'warning');
      //     return;
      //   }
      //   if (this.listaPreditivos.length === 0) {
      //     swal.fire('Aviso', 'Selecione ao menos um Preditivo', 'warning');
      //     return;
      //   }
      // }
      if (!this.atributoChave) {
        swal.fire('Aviso', 'Selecione o atributo Chave', 'warning');
        return;
      }
      if (this.clusterizacao === true) {
        this.atributoAlvo = null;
      } else {
        if (!this.atributoAlvo) {
          swal.fire('Aviso', 'Selecione o atributo Alvo', 'warning');
          return;
        }
      }
      if (this.listaPreditivos.length === 0) {
        swal.fire('Aviso', 'Selecione ao menos um Preditivo', 'warning');
        return;
      }

      if (!this.funcaoMineracaoModel) {
        swal.fire('Aviso', 'Selecione uma função de Mineração', 'warning');
        return;
      }
      if (!this.funcaoAlgoritmo) {
        swal.fire('Aviso', 'Selecione o Algoritmo', 'warning');
        return;
      }
      if (!this.modeloPercentGrupo) {
        swal.fire('Aviso', 'Selecione o percentual do Grupo', 'warning');
        return;
      }
      if (!this.modeloPercentTreino) {
        swal.fire('Aviso', 'Selecione o percentual do Treino', 'warning');
        return;
      }
      if (this.parametrosObrigatorio.length > 0) {
        swal.fire('Aviso', 'Você precisa cadastrar os parâmetros obrigatórios', 'warning');
        return;
      }
      let pulbicacaoRef = 0;
      if (this.publicacaoSel === true) {
        pulbicacaoRef = 0;
      } else {
        pulbicacaoRef = 1;
      }
      const modelo: Modelo = {};
      modelo.modeloNome = this.modeloNome;
      modelo.grupo = this.grupoSel;
      modelo.modeloPublicado = 1;
      modelo.modeloPercentGrupo = this.modeloPercentGrupo.valor;
      modelo.modeloPercentTreino = this.modeloPercentTreino.valor;
      modelo.funcaoMineracao = { ...this.funcaoMineracaoModel };
      modelo.algoritmo = this.funcaoAlgoritmo.algoritmo;
      modelo.usuario = this.usuarioService.currentUserValue;
      modelo.parametroModelos = this.listaParametros;
      this.modeloService.salvar(modelo).subscribe((res) => {
        this.modeloEdicao = res;
        this.salvarPreditivo();
      });
    }


  }


}
