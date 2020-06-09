import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { SchemaDTO } from '@app/api/classificador/models/schema-dto'
import { SchemaTabelaDTO } from '@app/api/classificador/models/schema-tabela-dto'
import { SchemaColunaDTO } from '@app/api/classificador/models/schema-coluna-dto'
import { Atributo } from '@app/api/classificador/models/atributo'
import { Fonte } from '@app/api/classificador/models/fonte'
import { AtributoStatusDTO } from '@app/api/classificador/models/atributo-status-dto'
import { SchemaService } from '@app/api/classificador/service/schema.service'
import { SchemaTabelaService } from '@app/api/classificador/service/schema-tabela.service'
import { SchemaColunaService } from '@app/api/classificador/service/schema-coluna.service'
import { FonteService } from '@app/api/classificador/service/fonte.service'
import { AtributoService } from '@app/api/classificador/service/atributo.service'

@Component({
  selector: 'app-configuracao-atributos-regras-manuais-list',
  templateUrl: './configuracao-atributos-regras-manuais-list.component.html',
  styleUrls: ['./configuracao-atributos-regras-manuais-list.component.css']
})
export class ConfiguracaoAtributosRegrasManuaisListComponent implements OnInit {

  schemas$: Observable<SchemaDTO[]>;
  schemasTabela$: Observable<SchemaTabelaDTO[]>;
  schemasColuna$: Observable<SchemaColunaDTO[]>;
  atributoStatus: AtributoStatusDTO = {};
  atributoStatusList: Atributo[] = [];
  fonte: Fonte = {};
  schemaSelecionado: SchemaDTO;
  schemaTabelaSelecionada: SchemaTabelaDTO;
  schemasColunas: SchemaColunaDTO[] = [];
  colunasParaSalvar: any[] = [];
  colunas: any;
  dados: Array<any>;
  selected: Array<any> = [];
  // loading: boolean = true;

  constructor(
    private schemaService: SchemaService,
    private schemaTabelaService: SchemaTabelaService,
    private schemaColunaService: SchemaColunaService,
    private fonteService: FonteService,
    private atributoService: AtributoService
  ) { }

  ngOnInit() {
    this.schemas$ = this.schemaService.listar();

    this.colunas = [
      { campo: 'columnName', cabecalho: 'Atributo' },
      { campo: 'dataType', cabecalho: 'Tipo (Tamanho)' },
      { campo: 'nullable', cabecalho: 'Obrigatório' },
      { campo: 'comments', cabecalho: 'Comentário' }
    ];
  }

  onChangeEsquema(){
    this.schemasTabela$ = this.schemaTabelaService.listar(this.schemaSelecionado.username)
    this.schemaTabelaSelecionada = null;
    this.schemasColuna$ = null;
    this.selected = [];
  }

  onChangeEsquemaTabela(){
    // this.loading = true
    this.schemasColuna$ = this.schemaColunaService.listar(this.schemaSelecionado.username, this.schemaTabelaSelecionada.tableName);
    this.schemasColuna$.subscribe( (res)=>{
      this.schemasColunas = res;
    });
    this.selected = [];
    this.colunasParaSalvar = []
    this.atributoStatus.fonteSchema = this.schemaSelecionado.username;
    this.atributoStatus.fonteNome = this.schemaTabelaSelecionada.tableName;
    this.atributoStatus.atributoStatus = 1;
    this.atributoService.atributo_por_status(this.atributoStatus).subscribe( (atributs)=>{
      this.schemasColuna$.subscribe( (coluna)=>{
        atributs.map( (attr)=>{
          coluna.map( (col, index)=>{
            if( col.columnName === String(attr.atributoNome) ){
              this.selected = [...this.selected, {
                columnId: col.columnId + '',
              }]
            }
          })
        });
      })
      this.atributoStatusList = atributs;
    });
    // this.loading = false
  }

  salvar(){
    if(!this.schemaSelecionado){
      swal.fire('Aviso', 'Você não selecionou um esquema!', 'warning');
      return
    }
    if(!this.schemaTabelaSelecionada){
      swal.fire('Aviso', 'Você não selecionou uma tabela!', 'warning');
      return
    }
    if(this.selected.length == 0){
      swal.fire('Aviso', 'Você não selecionou nenhum atributo!', 'warning');
      return
    }
    this.fonte.fonteSchema = this.schemaSelecionado.username;
    this.fonte.fonteNome = this.schemaTabelaSelecionada.tableName;
    this.fonte.atributos = [];
    this.fonteService.salvar(this.fonte).subscribe( (fonteSalva) => {
      this.fonteService.listarPorId(fonteSalva.fonteId).subscribe( (res)=>{
        fonteSalva = res

        this.schemasColunas.map( (coluna)=>{
          if(this.hasThisCol(coluna)){
            this.colunasParaSalvar = [...this.colunasParaSalvar, {
              atributoId: this.getIdAttr(coluna.columnName, fonteSalva),
              atributoNome: coluna.columnName,
              atributoTipo: coluna.dataType,
              atributoStatus: 1,
              fonte: {
                fonteId: fonteSalva.fonteId,
                fonteNome: fonteSalva.fonteNome,
                fonteSchema: fonteSalva.fonteSchema
              }
            }]
          }else{
            this.colunasParaSalvar = [...this.colunasParaSalvar, {
              atributoId: this.getIdAttr(coluna.columnName, fonteSalva),
              atributoNome: coluna.columnName,
              atributoTipo: coluna.dataType,
              atributoStatus: 0,
              fonte: {
                fonteId: fonteSalva.fonteId,
                fonteNome: fonteSalva.fonteNome,
                fonteSchema: fonteSalva.fonteSchema
              }
            }]
          }
        })
        this.colunasParaSalvar.map( (res)=>{
          if(res.atributoId){
            this.atributoService.alterar(res).subscribe( (r)=>{

            })
          }else{
            let resp: any
            resp.atributoNome  = res.atributoNome
            resp.atributoTipo = res.atributoTipo
            resp.atributoStatus  = res.atributoStatus
            resp.fonte  = res.fonte
            this.atributoService.salvar(resp).subscribe( (r) => {

            })
          }
        })
        swal.fire('Informação', 'Atributos salvos com sucesso!', 'success');
        this.selected = []
        this.schemaSelecionado = null
        this.schemaTabelaSelecionada = null
        this.schemasColuna$ = null
        this.colunasParaSalvar = []
      })
    })

  }

  namespace(object, path: string, padrao: any) {
    if (padrao !== undefined) {
      return padrao;
    }
    if (path.indexOf('.') === -1) {
      return object[path];
    }
    const result = path.split('.').reduce((value, index) => {
      return value[index];
    }, object);
    return result;
  }

  nullablePrint(object){
    if(object.nullable === 'N')
      return 'Não'
    if(object.nullable === 'Y')
      return 'Sim'
  }

  hasThisCol(coluna){
    let r: boolean = false
    this.selected.map( (res)=>{
      if(res.columnId == coluna.columnId)
        r = true
    })

    return r
  }

  hasAtributo(fonte){
    let a: boolean = false
    this.fonteService.listarPorId(fonte.fonteId).subscribe( (res)=>{
      if(res.atributos.length !== 0 && res.atributos !== null){
        a = true
        return
      }
    })

    return a
  }

  getIdAttr(coluna, fonteS){
    let r = null;

    fonteS.atributos.map( (resp)=>{
      if(resp.atributoNome == coluna){
        r = resp.atributoId
      }
    })

    return r
  }
}
