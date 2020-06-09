import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AtributoService } from '@app/api/classificador/service/atributo.service';
import swal from 'sweetalert2';
import { Atributo } from '@app/api/classificador/models/atributo';
import { ConfigAgenteResponse } from '@app/api/classificador/models/config-agente-response';
import { AtributoModeloService } from '@app/api/service/atributo-modelo.service';
import { ConfigAgenteService } from '@app/api/classificador/service/config-agente.service';
import { Pageable } from '@app/shared/pagination/pageable';

@Component({
  selector: 'app-table-mapeamento',
  templateUrl: './table-mapeamento.component.html',
  styleUrls: ['./table-mapeamento.component.css']
})
export class TableMapeamentoComponent implements OnInit {

  @Output() enviarAtributos: EventEmitter<any> = new EventEmitter();
  @Output() enviarAlvoConfig: EventEmitter<any> = new EventEmitter();

  page: number;
  atributo$: Observable<Atributo[]>;
  listaAtributos: any[] = [];
  @Input() dados: Pageable<any>;
  @Input() modeloId: number;
  @Input() allAttr: any = {
    content: [],
    total: 0
  };
  @Input() colunas: Array<any>;
  @Input() rowTable: number = 10;
  atributosSelecionados: any = [];
  atributosNaoSelecionados: any = [];
  atributosValidos: any[] = [];
  atributosSelecionadosComp: any[] = [null, null, null, null, null, null, null, null, null, null];

  constructor(private router: Router, private atributoService: AtributoService, private configAgenteService: ConfigAgenteService) { }

  ngOnInit() {
    // if(!this.modeloId){
    //   this.modeloId = 989
    // }
    this.configAgenteService.listar(this.modeloId, 0, 10).subscribe((res) => {
      this.dados = res
      if(res.content[0].configAgente){
        this.enviarAlvoConfig.emit(res.content[0].configAgente.alvoConfigAgentes)
      }
      this.configAgenteService.listar(this.modeloId, 0, 0).subscribe((resp) => {
        resp.content.map((res, index) => {
          if (resp.content[index].configAgente != null) {
            this.atributosSelecionadosComp[index] = resp.content[index].configAgente.atributo
            this.atributosSelecionados.push(resp.content[index].configAgente.atributo)
            this.allAttr.content.push({
              ...resp.content[index],
              configAgente: {
                atributo: resp.content[index].configAgente.atributo,
                atributoModeloId: resp.content[index].configAgente.atributoModeloId,
                configAgenteId: resp.content[index].configAgente.configAgenteId
              }
            })
            this.allAttr.total = this.dados.totalElements
          }
        })
        this.enviarAtributos.emit(this.allAttr)
        this.getAtributos()
      })
    });
  }

  getAtributos() {
    this.atributoService.listarPorFonte(101).subscribe((res) => {
      this.listaAtributos = res

      this.atributosValidos = []

      this.dados.content.map((resp) => {
        this.atributosValidos = [...this.atributosValidos, this.getAttrByType(resp.atributo.atributoTipo)]
      })

      this.atributosValidos.map((res, index) => {
        let type: any[] = []
        type = res

        for (let j = 0; j < type.length; j++) {
          let at = type[j]

          if (this.atributosSelecionadosComp[index]) {
            if (this.atributosSelecionadosComp[index].atributoId != at.atributoId) {
              if (this.initialAttrIsInTheAtributesSelected(at, this.atributosSelecionados)) {
                type.splice(j, 1)
                j = -1
              }
            }
          }
        }
        this.atributosValidos[index] = type
      })

      // console.log(this.atributosValidos)
    });
  }

  getAttrByType(type) {
    let itens: any[] = []
    if (this.listaAtributos.length > 0) {
      this.listaAtributos.map((attr) => {
        let i1 = type.substr(0, (type.indexOf("(") > 0) ? type.indexOf("(") : type.length);
        let i2 = attr.atributoTipo.substr(0, (attr.atributoTipo.indexOf("(") > 0) ? attr.atributoTipo.indexOf("(") : attr.atributoTipo.length);
        if (i1 === i2) {
          itens.push(attr)
        }
      })
    }

    return itens
  }

  namespace(object, path: string, padrao: any) {
    if (padrao !== undefined) {
      return padrao;
    }
    if (path.indexOf('.') === -1) {
      return object[path];
    }
    const result = path.split('.').reduce((value, index) => {
      if (value[index]) {
        return value[index];
      } else {
        return ''
      }
    }, object);

    if (path === 'atributo.atributoNome') {
      return `${object.atributo.atributoNome} (${object['atributoModeloTipo']})`
    } else {
      return result;
    }

  }

  addAtributoSelecionado(event) {
    this.atributosSelecionados.push(event)
    this.atributosSelecionadosComp[event.index] = event

    let saveOrEdit = true
    this.allAttr.content.map((resp, index) => {
      if (resp.atributoModeloId == this.dados.content[event.index].atributoModeloId) {
        this.allAttr.content[index].configAgente.atributo = event
        saveOrEdit = false
        return
      }
    })
    if (saveOrEdit) {
      this.allAttr.content.push({
        ...this.dados.content[event.index],
        configAgente: {
          atributo: event,
          atributoModeloId: this.dados.content[event.index].atributoModeloId,
          configAgenteId: this.dados.content[event.index].configAgente ? this.dados.content[event.index].configAgente.configAgenteId : null
        }
      })
    }
    this.allAttr.total = this.dados.totalElements
    this.enviarAtributos.emit(this.allAttr)
    this.dados.content[event.index].configAgente = {
      atributo: event,
      atributoModeloId: this.dados.content[event.index].atributoModeloId
    }

    this.atributosValidos.map((res, index) => {
      if (event.index != index) {
        let type: any[] = this.getAttrByType(this.dados.content[index].atributo.atributoTipo)
        for (let j = 0; j < type.length; j++) {
          let at = type[j]

          if (this.initialAttrIsInTheAtributesSelected(at, this.atributosSelecionados)) {
            type.splice(j, 1)
            j = -1
          }
        }
        this.atributosValidos[index] = type
      }
    })
  }

  initialAttrIsInTheAtributesSelected(aux, attrs) {
    let a = false

    attrs.map((res) => {
      if (res.atributoId == aux.atributoId) {
        a = true
        return
      }
    })

    return a
  }

  removeAtributoSelecionado(event) {
    // console.log(event)
    this.atributosSelecionados.map((res, index) => {
      if (res.atributoId == event.atributoId) {
        this.atributosSelecionados.splice(index, 1)

        this.dados.content[event.index].configAgente = {
          atributo: null,
          atributoModeloId: null
        }
        this.allAttr.content.map((resp, index) => {
          if (resp.atributoModeloId === this.dados.content[event.index].atributoModeloId) {
            this.allAttr.content[index].configAgente.atributo = null
          }
        })
      }
    })

    this.atributosSelecionadosComp[event.index] = null

    this.enviarAtributos.emit(this.allAttr)

    this.atributosValidos.map((res, index) => {
      if (event.index != index) {
        let type: any[] = this.getAttrByType(this.dados.content[index].atributo.atributoTipo)
        for (let j = 0; j < type.length; j++) {
          let at = type[j]

          if (this.initialAttrIsInTheAtributesSelected(at, this.atributosSelecionados)) {
            type.splice(j, 1)
            j = -1
          }
        }
        this.atributosValidos[index] = type
      }
    })
  }

  pageChanged(event) {
    this.atributosSelecionadosComp.map((e, i) => {
      this.atributosSelecionadosComp[i] = null
    })

    this.page = event;
    this.configAgenteService.listar(this.modeloId, (event - 1), 10).subscribe((res) => {
      this.dados = res;

      res.content.map((resp, index) => {
        if (this.dados.content[index].configAgente && this.dados.content[index].configAgente.atributo) {
          this.atributosSelecionadosComp[index] = res.content[index].configAgente.atributo
          this.atributosSelecionados.push(res.content[index].configAgente.atributo)
        }
      })

      res.content.map((res, index) => {
        let dt: any = this.hasAtributoSelected(res)
        // console.log(dt)

        if (dt != null) {
          this.atributosSelecionadosComp[index] = dt.configAgente.atributo
          this.dados.content[index].configAgente = {
            atributo: dt.configAgente.atributo
          }
        }
      })

      // console.log("this.dados.content")
      // console.log(this.dados.content)

      this.atributosValidos = []

      this.dados.content.map((resp) => {
        this.atributosValidos = [...this.atributosValidos, this.getAttrByType(resp.atributo.atributoTipo)]
      })

      // console.log(this.atributosValidos)

      this.atributosValidos.map((res, index) => {
        let type: any[] = []
        // console.log(index)
        type = this.getAttrByType(this.dados.content[index].atributo.atributoTipo)
        for (let j = 0; j < type.length; j++) {
          let at = type[j]

          if (this.initialAttrIsInTheAtributesSelected(at, this.atributosSelecionados)) {
            type.splice(j, 1)
            j = -1
          }
        }
        this.atributosValidos[index] = type
      })


      // console.log(this.dados.content)
      // console.log(this.atributosSelecionadosComp)
      // console.log(this.allAttr)
      // console.log(this.atributosValidos)
    });
  }

  hasAtributoSelected(res) {
    let r = null
    // console.log(this.allAttr)
    this.allAttr.content.map((resp) => {
      // console.log(`${resp.atributoModeloId} $$ ${res.atributoModeloId}`)
      if (resp.atributoModeloId === res.atributoModeloId) {
        r = resp
        return
      }
    })

    return r
  }
}
