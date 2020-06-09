import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Modelo } from '@app/api/model/modelo';
import { AtributoGrupoService } from '@app/api/service/atributo-grupo.service';
import { Grupo } from '@app/api/model/grupo';
import { Observable } from 'rxjs';
import { GrupoService } from '@app/api/service/grupo.service';
import { AtributoGrupo } from '@app/api/model/models';
import { AtributoService } from '@app/api/service/atributo.service';
import { ModeloService } from '@app/api/service/modelo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modelos-teste',
  templateUrl: './modelos-teste.component.html',
  styleUrls: ['./modelos-teste.component.css']
})
export class ModelosTesteComponent implements OnInit {

  modelo: Modelo = {};
  grupo$: Observable<Grupo[]>;
  atributos$: Observable<AtributoGrupo[]>;
  grupo: Grupo;
  grupoSel: Grupo;
  grupoTotalRegistro: string;
  listaAtributos: any[] = [];
  listaAtributosTemp: any[] = [];
  listaAtributosTeste: any[] = [];
  contador: number;
  listaPercentual: any[] = [];
  modeloPercentGrupo: number;
  atributosDefaults: boolean;
  listaHistoricos: any[] = [];
  modeloTestado:boolean;

  constructor(
    private router: Router,
    private location: Location,
    private atributoGrupoService: AtributoGrupoService,
    private grupoService: GrupoService,
    private atributoService: AtributoService,
    private modeloService: ModeloService,
  ) { }

  ngOnInit() {
    this.atributosDefaults = true;
    this.modeloTestado = false;
    for (let i = 1; i <= 100; i++) {
      this.listaPercentual.push({
        valor: i,
        descricao: i + '%'
      });
    }
    if (history.state.data) {
      this.contador = 0;
      this.modelo = history.state.data;
      this.listaHistoricos = history.state.data.historicos
      this.grupo = history.state.data.grupo;
      if (history.state.data.grupo.grupoTotalRegistros === null || history.state.data.grupo.grupoTotalRegistros === 0) {
        this.grupoTotalRegistro = 'Não Disponível';
      } else {
        this.grupoTotalRegistro = history.state.data.grupo.grupoTotalRegistros + ' Registros';
      }
      this.listaAtributosTeste.push({
        grupo: this.grupo,
        modelo: this.modelo,
        atributos: [],
        percentualTeste: 0
      });

      if(this.modelo.funcaoMineracao.funcaoMineracaoAlias === 'Clusterização'){
        const contador = this.listaHistoricos.length;
        for(let i=0;i<contador;i++){         
          if(this.listaHistoricos[i].historicoEvento === 'TESTADO'){
            this.modeloTestado =true;            
          }
        }
      }
      
      
      this.modeloService.listaAtributoModelo().subscribe((doc) => {
        doc.forEach((atributo) => {
          if (atributo.modelo.modeloId === this.modelo.modeloId) {
            this.listaAtributosTeste.forEach((doc)=>{
              doc.atributos.push(atributo);
            })
            this.contador = this.contador + 1;
            this.listaAtributos.push(atributo);
            this.listaAtributosTemp.push(atributo);
            this.atributos$ = this.atributoGrupoService.listarGrupo(history.state.data.grupo.grupoId);
            this.grupo$ = this.grupoService.listar('2');
          }
        });
      });      
    }
  }

  voltar() {
    this.location.back();
  }

  onChangeGrupo() {
    const contador = this.listaHistoricos.length;
    let verificaModelo = false;
    if(this.modelo.funcaoMineracao.funcaoMineracaoAlias === 'Clusterização' && (this.modelo.grupo !== this.grupo)){
      for(let i=0;i<contador;i++){
        if(this.listaHistoricos.filter(h => h.historicoEvento === 'ERRO_AO_TESTAR').length === 1){
            verificaModelo = true;
        }
      }
      if(verificaModelo){
        swal.fire('Aviso', 'Você não pode selecionar outro grupo para o modelo de Clusterização que teve erro no teste após o treino.', 'warning');
      }else{
        this.listaAtributos = [];
        this.atributosDefaults = false;
        this.modeloService.verificaGrupo(this.modelo.modeloId, this.grupo.grupoId).subscribe((res) => {          
          if (res) {
            this.listaAtributosTeste = [];
            this.listaAtributosTeste.push({
              grupo: this.grupo,
              modelo: this.modelo,
              atributos: [],
            });
            this.atributos$ = this.atributoGrupoService.listarGrupo(this.grupo.grupoId);
            if (this.grupo.grupoTotalRegistros === null || this.grupo.grupoTotalRegistros === 0) {
              this.grupoTotalRegistro = 'Não Disponível';
              swal.fire('Aviso', 'Este grupo não possui atributos a serem carregados', 'warning');
            } else {
              this.grupoTotalRegistro = this.grupo.grupoTotalRegistros + ' Registros';
              this.listaAtributos = this.listaAtributosTemp;
            }
          } else {
            
          }
        });
      }
    }else{
      this.listaAtributos = [];
      this.atributosDefaults = false;
      this.modeloService.verificaGrupo(this.modelo.modeloId, this.grupo.grupoId).subscribe((res) => {        
        if (res) {
          this.listaAtributosTeste = [];
          this.listaAtributosTeste.push({
            grupo: this.grupo,
            modelo: this.modelo,
            atributos: [],
          });
          this.atributos$ = this.atributoGrupoService.listarGrupo(this.grupo.grupoId);
          if (this.grupo.grupoTotalRegistros === null || this.grupo.grupoTotalRegistros === 0) {
            this.grupoTotalRegistro = 'Não Disponível';
            swal.fire('Aviso', 'Este grupo não possui atributos a serem carregados', 'warning');
          } else {
            this.grupoTotalRegistro = this.grupo.grupoTotalRegistros + ' Registros';
            this.listaAtributos = this.listaAtributosTemp;
          }
        } else {
          
        }
      });
    }    
    
  }

  selecionaPercent() {
    this.listaAtributosTeste.forEach((doc) => {
      doc.push({
        atributos: doc.atributos,
        grupo: doc.grupo,
        modelo: doc.modelo,
        percentualTeste: this.modeloPercentGrupo
      });
    });    
  }

  cadastraAtributo(atributo: any, atributoSel: any) {    
    this.listaAtributosTeste.forEach((doc) => {
      if (doc.atributos.length > 0) {
        if (atributo.atributo.atributoTipo === atributoSel.atributo.atributoTipo) {          
          if(doc.atributos.find(a => a.atributo.atributoNome === atributoSel.atributo.atributoAlias)){
            swal.fire('Aviso', 'Este atributo já foi selecionado em outro campo', 'warning');
          } else {
            const index = doc.atributos.find(p => p.atributoModelo === atributo.atributo.atributoId);
            if (index) {
              doc.atributos.splice(index, 1);
              doc.atributos.push({
                atributo: {
                  atributoAlias: atributo.atributo.atributoAlias,
                  atributoId: atributoSel.atributo.atributoId,
                  atributoLabel: atributoSel.atributo.atributoLabel,
                  atributoNome: atributoSel.atributo.atributoNome,
                  atributoTipo: atributoSel.atributo.atributoTipo,
                  fonte: atributoSel.atributo.fonte,
                  pasta: atributoSel.atributo.pasta
                },
                atributoModeloExpressao: null,
                atributoModeloId: null,
                atributoModeloReversao: null,
                atributoModeloTexto: null,
                atributoModeloTipo: atributo.atributoModeloTipo,
                modelo: atributo.modelo,
                atributoModelo: atributo.atributo.atributoId
              });
            } else {
              doc.atributos.push({
                atributo: {
                  atributoAlias: atributo.atributo.atributoAlias,
                  atributoId: atributoSel.atributo.atributoId,
                  atributoLabel: atributoSel.atributo.atributoLabel,
                  atributoNome: atributoSel.atributo.atributoNome,
                  atributoTipo: atributoSel.atributo.atributoTipo,
                  fonte: atributoSel.atributo.fonte,
                  pasta: atributoSel.atributo.pasta
                },
                atributoModeloExpressao: null,
                atributoModeloId: null,
                atributoModeloReversao: null,
                atributoModeloTexto: null,
                atributoModeloTipo: atributo.atributoModeloTipo,
                modelo: atributo.modelo,
                atributoModelo: atributo.atributo.atributoId
              });
            } 
          }
                   
        } else {
          // tslint:disable-next-line: max-line-length
          swal.fire('Aviso', 'Tipos de atributos diferentes\n' + atributo.atributo.atributoTipo + ' - ' + atributoSel.atributo.atributoTipo, 'warning');
        }
      } else {
        if (atributo.atributo.atributoTipo === atributoSel.atributo.atributoTipo) {
          this.listaAtributosTeste.forEach((atr) => {
            atr.atributos.push({
              atributo: {
                atributoAlias: atributo.atributo.atributoAlias,
                atributoId: atributoSel.atributo.atributoId,
                atributoLabel: atributoSel.atributo.atributoLabel,
                atributoNome: atributoSel.atributo.atributoNome,
                atributoTipo: atributoSel.atributo.atributoTipo,
                fonte: atributoSel.atributo.fonte,
                pasta: atributoSel.atributo.pasta
              },
              atributoModeloExpressao: null,
              atributoModeloId: null,
              atributoModeloReversao: null,
              atributoModeloTexto: null,
              atributoModeloTipo: atributo.atributoModeloTipo,
              modelo: atributo.modelo,
              atributoModelo: atributo.atributo.atributoId
            });
          });
          console.log(this.listaAtributosTeste);
        } else {
          // tslint:disable-next-line: max-line-length
          swal.fire('Aviso', 'Tipos de atributos diferentes\n' + atributo.atributo.atributoTipo + ' - ' + atributoSel.atributo.atributoTipo, 'warning');
        }
      }
    });
  }

  testaModelo() {
    if (this.modeloPercentGrupo == null) {
      swal.fire('Aviso', 'Favor selecionar o percentual do grupo', 'warning');
    } else {
      const lista = [];
      const listaAtr = [];
      this.listaAtributosTeste.forEach((doc) => {
        if (doc.atributos.length < this.contador) {
          swal.fire('Aviso', 'Para realizar o teste você precisa mapear corretamente todos os atributos.\n\n Verifique se não existe Atributo vazio ou repetido', 'warning');
        } else {
          swal.fire({
            title: 'Aviso',
            text: 'Deseja realmente testar o modelo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
          }).then((result) => {
            if (result.value) {

              doc.atributos.forEach((atr) => {
                listaAtr.push({
                  atributo: atr.atributo,
                  atributoModeloExpressao: null,
                  atributoModeloId: null,
                  atributoModeloReversao: null,
                  atributoModeloTexto: null,
                  atributoModeloTipo: atr.atributoModeloTipo,
                  modelo: atr.modelo,
                });
              });
              lista.push({
                atributos: listaAtr,
                grupo: doc.grupo,
                modelo: doc.modelo,
                percentualTeste: this.modeloPercentGrupo
              });
              lista.forEach((l) => {
                this.modeloService.verificaGrupo(l.modelo.modeloId, l.grupo.grupoId).subscribe((res) => {
                  if (res) {
                    this.modeloService.testar(l).subscribe((res1) => {
                      // tslint:disable-next-line: max-line-length
                      swal.fire('Sucesso', 'Teste iniciado com sucesso\n Para verificar o status do teste, verifique a lista de modelos', 'success').then(() => {
                        this.voltar();
                      });
                      console.log(res1);
                    });
                  } else {

                  }
                });

              });
            }
          });

        }
      });
    }
  }

}
