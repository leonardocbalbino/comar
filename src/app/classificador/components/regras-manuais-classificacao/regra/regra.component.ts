import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Atributo } from '@app/api/classificador/models/atributo';
import { RegrasDetalhe } from '@app/api/classificador/models/regras-detalhe';
import { AtributoService } from '@app/api/classificador/service/atributo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-regra',
  templateUrl: './regra.component.html',
  styleUrls: ['./regra.component.css']
})
export class RegraComponent implements OnInit {
  operadorLogico: any = "AND";
  orSelecionado: any;
  operadoresrelacionais: any;
  operadores: any;
  atributos$: Observable<Array<Atributo>>
  atributoSelecionado: Atributo;
  condicaoSelecionada: any;
  colunas: any
  isEditar: boolean = false
  btnAdd: string = "Adicionar regra"
  detalheEditar : any
  @Input() regraDetalhe: Array<RegrasDetalhe> = [];
  @Output() deletar: EventEmitter<any> = new EventEmitter();
  @Output() enviarDetalhe: EventEmitter<any> = new EventEmitter();
  @Output() editarDetalheEvt: EventEmitter<any> = new EventEmitter();

  constructor(private atributoService: AtributoService) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'regrasDetalheOperadorLogico', cabecalho: 'Operador lógico' },
      { campo: 'atributo.atributoNome', cabecalho: 'Atributo' },
      { campo: 'regrasDetalheOperRelacional', cabecalho: 'Operador relacional' },
      { campo: 'regrasDetalheCondicao', cabecalho: 'Condição' },
    ];

    this.operadoresrelacionais = {
      varchar: ['=', '<>', 'like', 'is null', 'is not null', 'not like'],
      number: ['=', '!=', '>', '>=', '<', '<=', 'is null', 'is not null', 'like', 'not like'],
      time: ['=', '!=', '>', '>=', '<', '<=', 'is null', 'is not null'],
      date: ['=', '!=', '>', '>=', '<', '<=', 'is null', 'is not null'],
      boolean: ['=']
    };

    this.atributos$ = this.atributoService.atributo_por_stat(1);
  }

  handleChangeAtribute(){
    this.orSelecionado = null
    this.condicaoSelecionada = ""

    if(this.atributoSelecionado.atributoTipo.split("(", 1)[0].trim() === "VARCHAR2"){
      this.operadores = this.operadoresrelacionais.varchar
      return
    }
    if(this.atributoSelecionado.atributoTipo.split("(", 1)[0].trim() === "NUMBER"){
      this.operadores = this.operadoresrelacionais.number
      return
    }
    if(this.atributoSelecionado.atributoTipo.split("(", 1)[0].trim() === "DATE"){
      this.operadores = this.operadoresrelacionais.date
      return
    }
    if(this.atributoSelecionado.atributoTipo.split("(", 1)[0].trim() === "TIME"){
      this.operadores = this.operadoresrelacionais.time
      return
    }
    if(this.atributoSelecionado.atributoTipo.split("(", 1)[0].trim() === "BOOLEAN"){
      this.operadores = this.operadoresrelacionais.boolean
      return
    }else{
      this.operadores = ['=', '!=', '>', '>=', '<', '<=', 'is null', 'is not null', 'like', 'not like']
    }
  }

  onChangeOperador(event){
    if(this.orSelecionado === 'is null'){
      this.condicaoSelecionada = ''
    }
  }

  addRegra(){
    if(!this.orSelecionado || !this.operadorLogico || !this.atributoSelecionado){
      swal.fire('Aviso', 'Dados de detalhe de regra não adicionados!', 'warning');

      return
    }

    if(this.orSelecionado != 'is null' && !this.condicaoSelecionada){
      swal.fire('Aviso', 'Dados de detalhe de regra não adicionados!', 'warning');

      return
    }

    if(this.hasDetalhe()){
      swal.fire('Aviso', 'Detalhe de regra já adicionado!', 'warning');

      return
    }

    if(!this.isEditar){
      this.regraDetalhe.push({
        regrasDetalheOperadorLogico: this.operadorLogico,
        regrasDetalheOperRelacional: this.orSelecionado,
        regrasDetalheCondicao: this.condicaoSelecionada ? this.condicaoSelecionada : null,
        atributo: {
          atributoId: this.atributoSelecionado.atributoId,
          atributoNome: this.atributoSelecionado.atributoNome
        }
      })
      this.enviarDetalhe.emit(this.regraDetalhe)
    }else{
      this.regraDetalhe[this.regraDetalhe.indexOf(this.detalheEditar)] = {
        regrasDetalheOperadorLogico: this.operadorLogico,
        regrasDetalheOperRelacional: this.orSelecionado,
        regrasDetalheCondicao: this.condicaoSelecionada ? this.condicaoSelecionada : null,
        atributo: {
          atributoId: this.atributoSelecionado.atributoId,
          atributoNome: this.atributoSelecionado.atributoNome
        }
      }
      this.editarDetalheEvt.emit(this.regraDetalhe)

      this.isEditar = false
      this.btnAdd = "Adicionar regra"
    }

    this.orSelecionado = null
    this.condicaoSelecionada = null
    this.atributoSelecionado = null
    this.operadorLogico = "AND"
  }

  removerDetalhe(r: any, index){
    this.regraDetalhe.splice(index, 1)
    this.deletar.emit(this.regraDetalhe);
  }

  editarDetalhe(obj){
    this.detalheEditar = obj
    this.btnAdd = "Atualizar regra"

    this.operadorLogico = obj.regrasDetalheOperadorLogico
    this.orSelecionado = obj.regrasDetalheOperRelacional
    this.condicaoSelecionada = obj.regrasDetalheCondicao
    this.atributoSelecionado = obj.atributo

    this.isEditar = true
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

  hasDetalhe(){
    let bool = false
    this.regraDetalhe.map( (res)=>{
      if( (this.condicaoSelecionada == res.regrasDetalheCondicao) &&
          (this.orSelecionado == res.regrasDetalheOperRelacional) &&
          (this.operadorLogico == res.regrasDetalheOperadorLogico) &&
          (this.atributoSelecionado.atributoId == res.atributo.atributoId)){
            bool = true
      }
    })

    return bool
  }
}
