import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ModeloService } from '@app/api/service/modelo.service';
import { Modelo } from '@app/api/model/modelo';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AtributoGrupoService } from '@app/api/service/atributo-grupo.service';
import { AtributoGrupo } from '@app/api/model/models';
import { GrupoService } from '@app/api/service/grupo.service';
import { Grupo } from '@app/api/model/grupo';

// STATUS CADASTRADO - PODE TREINAR

// ERRO AO TREINAR -> PODE TREINAR
// EM TREINO - > NÃO PODE TESTAR NEM TREINAR, NEM EDITAR
// TREINADO -> ELE PODE TESTAR - O TREINO É EXECUTADO APENAS UMA VEZ

// ERRO AO TESTAR -> ELE PODE TESTAR NOVAMENTE
// EM TESTE - > NÃO PODE TESTAR NEM EDITAR
// TESTADO -> ELE PODE EDITAR

@Component({
  selector: 'app-modelos-list',
  templateUrl: './modelos-list.component.html',
  styleUrls: ['./modelos-list.component.css']
})
export class ModelosListComponent implements OnInit {

  modelos$: Observable<Modelo[]>;
  colunas: any;
  modelo: any[] = [];
  modeloTeste: any;
  grupoTeste: Grupo;
  modelos: any[] = [];
  modelosFuncao: any[] = [];
  modelosFuncao1: any[] = [];
  historicosComparacao: any[] = [];
  historicoComparacao: any[] = [];
  statushistorico: boolean;
  modelosComparacao: any[] = [];
  modelos1: any[] = [];
  historicosEventos: any[] = [];
  historicosEventosFinal: any[] = [];
  listaModelos: any[] = [];
  treino: boolean;
  listaComparacao: any[] = [];
  contador: number;
  antigo: number;
  p: number;
  verificaHistorico: boolean;
  acaoModal: string;
  closeResult: string;
  atributos$: Observable<AtributoGrupo[]>;
  grupo$: Observable<Grupo[]>;
  grupoSel: Grupo;
  @ViewChild('modalTeste', { static: true }) modalTeste: NgbModalRef;
  @ViewChild('modalErro', { static: true }) modalErro: NgbModalRef;
  tituloModal: '';
  percentGrupoModal: '';
  listaPercentual: any[] = [];
  grupoModal: Grupo;
  erro: string;
  listaHistoricosTemp: any[] = [];
  modeloTestado: boolean;



  constructor(
    private modeloService: ModeloService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private grupoService: GrupoService,
    private atributoGrupoService: AtributoGrupoService,
    // private modelo = []
  ) { }

  ngOnInit() {
    this.modeloTestado = false;
    for (let i = 0; i <= 100; i++) {
      this.listaPercentual.push({
        descricao: i + '%',
        valor: i
      });
    }
    this.modeloService.listar().subscribe((lista) => {
      lista.forEach(m => {
        this.historicosEventos = m.historicos.filter(h => h.historicoEvento !== 'PUBLICADO');
        this.historicosEventosFinal = this.historicosEventos.filter(h => h.historicoEvento !== 'DESPUBLICADO');
        this.historicosEventosFinal.forEach(historico => {
          if (historico.historicoUltimo === 1) {
            this.modelo.push({
              id: m.modeloId,
              nome: m.modeloNome,
              grupo: m.grupo.grupoNome,
              grupoId: m.grupo.grupoId,
              funcao: m.funcaoMineracao.funcaoMineracaoAlias,
              algoritmo: m.algoritmo.algoritmoAlias,
              publicado: m.modeloPublicado,
              historicoErro: historico.historicoErro,
              statusLista: historico.historicoEvento,
              status: historico.historicoEvento,
              descricaoHistorico: historico.descricaoHistorico,
              listaModelo: lista.find(model => model.modeloId === m.modeloId)
            });
          }
        });
      });
    });
    this.colunas = [
      { campo: 'nome', cabecalho: 'Nome' },
      { campo: 'grupo', cabecalho: 'Grupo' },
      { campo: 'funcao', cabecalho: 'Função' },
      { campo: 'algoritmo', cabecalho: 'Algoritmo' },
      { campo: 'publicado', cabecalho: 'Publicado' },
      { campo: 'status', cabecalho: 'Status' },
    ];
    //this.grupo$ = this.grupoService.listar();
  }

  editar(modelo: any, status: string) {       
    this.listaHistoricosTemp = modelo.listaModelo.historicos;
    const contador = this.listaHistoricosTemp.length;
    let validador = false;
    for (let i = 0; i < contador; i++) {     
      if(this.listaHistoricosTemp[i].historicoEvento.includes('TREINADO') === true){
        validador = true;
        break;        
      }      
    }
    if(validador){
      this.router.navigate(['/minerador/modelos-mineracao/form'], { state: { data: modelo.listaModelo, historico: status } });
    }else{
      this.router.navigate(['/minerador/modelos-mineracao/edit'], { state: { data: modelo.listaModelo, historico: status } });
    }

  }

  testa(modelo: any) {    
    this.modeloTestado = false;
    if(modelo.funcao === 'Clusterização'){
      const contador = modelo.listaModelo.historicos.length;
      for(let i=0;i<contador;i++){         
        if(modelo.listaModelo.historicos[i].historicoEvento === 'TESTADO'){
          this.modeloTestado =true;            
        }
      }
    }
    if(this.modeloTestado){
      swal.fire('Aviso', 'Este modelo não pode ser mais testado', 'warning');
    }else{
      this.router.navigate(['/minerador/modelos-mineracao/teste'], { state: { data: modelo.listaModelo } });
    }
    
  }

  deletarRegistro(obj: any) {
    if (confirm('Deseja realmente excluir o registro?')) {
    }
  }

  criarRegistro() {
    this.router.navigate(['/minerador/modelos-mineracao/form']);
  }

  historico(modelo: any) {
    this.router.navigate(['/minerador/modelos-mineracao/history'], { state: { lista: modelo } });
  }

  exibirErro(erro: string) {
    this.erro = erro;
    this.modalService.open(this.modalErro, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Ações para o Modelo
  abreModelo(modelo: any) {
    this.modalService.open(this.modalTeste, { ariaLabelledBy: 'modal-basic-title' });
    this.tituloModal = modelo.nome;
    this.grupoModal = modelo.listaModelo.grupo.grupoNome;
    this.percentGrupoModal = modelo.listaModelo.modeloPercentGrupo;
    this.modeloTeste = modelo;
  }
  testaModelo() {

    if (confirm('Deseja testar o modelo ' + this.modeloTeste.nome + ' ?')) {
      // this.router.navigate([`/minerador/modelos-mineracao/alert`], { state: { data: modelo, funcao: 'testaModelo' } });

      if (this.grupoModal === this.modeloTeste.listaModelo.grupo.grupoNome) {
        this.modalService.dismissAll();
        // tslint:disable-next-line: max-line-length
        this.router.navigate([`/minerador/modelos-mineracao/alert`], { state: { data: this.modeloTeste, funcao: 'testaModelo', grupo: this.modeloTeste.listaModelo.grupo.grupoId } });
      } else {
        this.modalService.dismissAll();
        // tslint:disable-next-line: max-line-length
        this.router.navigate([`/minerador/modelos-mineracao/alert`], { state: { data: this.modeloTeste, funcao: 'testaModelo', grupo: this.grupoModal.grupoId } });
      }
    }
  }

  treinaModelo(modelo: any) {   
    swal.fire({
      title: 'Aviso',
      text: 'Deseja treinar o modelo ' + modelo.nome + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        const modeloTreino = {
          grupoId: modelo.grupoId,
          modeloId: modelo.id
        };
        this.modeloService.treinar(modeloTreino).subscribe((res) => {
          swal.fire('Sucesso', 'Treino iniciado com sucesso', 'success').then(() => {
            this.modeloService.listar().subscribe((lista) => {
              this.modelo = [];
              lista.forEach(m => {
                this.historicosEventos = m.historicos.filter(h => h.historicoEvento !== 'PUBLICADO');
                this.historicosEventosFinal = this.historicosEventos.filter(h => h.historicoEvento !== 'DESPUBLICADO');
                this.historicosEventosFinal.forEach(historico => {
                  if (historico.historicoUltimo === 1) {
                    this.modelo.push({
                      id: m.modeloId,
                      nome: m.modeloNome,
                      grupo: m.grupo.grupoNome,
                      grupoId: m.grupo.grupoId,
                      funcao: m.funcaoMineracao.funcaoMineracaoAlias,
                      algoritmo: m.algoritmo.algoritmoAlias,
                      publicado: m.modeloPublicado,
                      historicoErro: historico.historicoErro,
                      statusLista: historico.historicoEvento,
                      status: historico.historicoEvento,
                      descricaoHistorico: historico.descricaoHistorico,
                      listaModelo: lista.find(model => model.modeloId === m.modeloId)
                    });
                  }
                });
              });
            });
          });
        });
      }
    });
  }

  comparaModelo() {
    const contador = this.listaModelos.length;
    const novoArray = [...new Set(this.listaModelos)];
    let validacao = false;    
    let validacaoH = false;
    if (this.listaModelos.length < 2) {
      swal.fire('Aviso', 'Você precisa selecionar ao menos 2 modelos', 'warning');
      validacao = true;
    } else {
      this.contador = this.listaModelos.length;
      // console.log(this.listaModelos);
      for (let i = 0; i < this.contador; i++) {
        this.antigo = i - 1;
        if (i !== 0) {
          this.historicosComparacao = this.modelo.find(modelo => modelo.id === this.listaModelos[i]).listaModelo.historicos;
          const contadorH = this.historicosComparacao.length;
          for(let j=0; j < contadorH; j++){
            if (this.historicosComparacao[j].historicoEvento.includes('TESTADO')) {              
              validacaoH = true;
              break;
            }
          }
          if(!validacaoH){
            swal.fire('Aviso', 'O modelo '+this.modelo.find(modelo => modelo.id === this.listaModelos[i]).nome+' não foi testado', 'warning');
            validacao = true;
            break;
          }          
          this.modelos = this.modelo.find(modelo => modelo.id === this.listaModelos[i]).grupoId;
          this.modelos1 = this.modelo.find(modelo => modelo.id === this.listaModelos[this.antigo]).grupoId;  
          this.modelosFuncao = this.modelo.find(modelo => modelo.id === this.listaModelos[i]).funcao;
          this.modelosFuncao1 = this.modelo.find(modelo => modelo.id === this.listaModelos[this.antigo]).funcao;          
          if (this.modelos !== this.modelos1) {
            swal.fire('Aviso', 'Você precisa selecionar Modelos de mesmo Grupo', 'warning');
            validacao = true;
            break;
          } else if(this.modelosFuncao !== this.modelosFuncao1) {
            swal.fire('Aviso', 'Você precisa selecionar Modelos de mesma Função de Mineração', 'warning');
            validacao = true;
            break;            
          }else{
            this.listaModelos.forEach(m => {
              this.modelosComparacao.push(m);
            });
          }
        }else{
          this.historicosComparacao = this.modelo.find(modelo => modelo.id === this.listaModelos[i]).listaModelo.historicos;
          const contadorH = this.historicosComparacao.length;
          for(let j=0; j < contadorH; j++){
            if (this.historicosComparacao[j].historicoEvento.includes('TESTADO')) {              
              validacaoH = true;
              break;
            }
          }
          if(!validacaoH){
            swal.fire('Aviso', 'O modelo '+this.modelo.find(modelo => modelo.id === this.listaModelos[i]).nome+' não foi testado', 'warning');
            validacao = true;
            break;
          }    
        }
      }
    }
    if (!validacao) {
      this.router.navigate([`/minerador/modelos-mineracao/consultaComparacao`], { state: { data: this.modelosComparacao } });
    }
  }

  atualizarListaModelo(listaIdModelos, id) {
    if (this.listaModelos.length === 0) {
      this.listaModelos.push(id);
    } else {
      if (this.listaModelos.find(p => p === id)) {
        const index = this.listaModelos.indexOf(id);
        this.listaModelos.splice(index, 1);
      } else {
        this.listaModelos.push(id);
      }
    }
  }

  selecionaModelo(modelo: any) {
    this.atualizarListaModelo(this.listaModelos, modelo.id);
  }

  deletaModelo(modelo: any) {
    swal.fire({
      title: 'Aviso',
      text: 'Deseja realmente remover o modelo ' + modelo.nome + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.modeloService.deletar(modelo.id).subscribe((res) => {
          swal.fire('Sucesso', 'Modelo removido com sucesso', 'success').then(() => {
            this.modeloService.listar().subscribe((lista) => {
              this.modelo = [];
              lista.forEach(m => {
                this.historicosEventos = m.historicos.filter(h => h.historicoEvento !== 'PUBLICADO');
                this.historicosEventosFinal = this.historicosEventos.filter(h => h.historicoEvento !== 'DESPUBLICADO');
                this.historicosEventosFinal.forEach(historico => {
                  if (historico.historicoUltimo === 1) {
                    this.modelo.push({
                      id: m.modeloId,
                      nome: m.modeloNome,
                      grupo: m.grupo.grupoNome,
                      grupoId: m.grupo.grupoId,
                      funcao: m.funcaoMineracao.funcaoMineracaoAlias,
                      algoritmo: m.algoritmo.algoritmoAlias,
                      publicado: m.modeloPublicado,
                      historicoErro: historico.historicoErro,
                      statusLista: historico.historicoEvento,
                      status: historico.historicoEvento,
                      descricaoHistorico: historico.descricaoHistorico,
                      listaModelo: lista.find(model => model.modeloId === m.modeloId)
                    });
                  }
                });
              });
            });
          });
        });
      }
    });


  }

  warning(mensgem: string) {
    swal.fire('Aviso', mensgem, 'warning');
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
