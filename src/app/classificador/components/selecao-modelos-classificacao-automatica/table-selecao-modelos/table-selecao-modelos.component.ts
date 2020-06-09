import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelosAuto } from '@app/api/classificador/models/modelos-auto';
import { ModelosAutoService } from '@app/api/classificador/service/modelos-auto.service';
import { ModelosAutoRequest } from '@app/api/classificador/models/modelos-auto-request';
import * as moment from 'moment'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pageable } from '@app/shared/pagination/pageable';
import swal from 'sweetalert2';

@Component({
  selector: 'app-table-selecao-modelos',
  templateUrl: './table-selecao-modelos.component.html',
  styleUrls: ['./table-selecao-modelos.component.css']
})
export class TableSelecaoModelosComponent implements OnInit {

  pt: any;
  page: number;
  @Input() consultaForm: FormGroup;
  @Input() dados: Pageable<any>;
  @Input() colunas: Array<any>;
  @Input() rowTable: number = 10;
  @Output() deletar: EventEmitter<any> = new EventEmitter();
  @Output() editar = new EventEmitter();
  @Input() keyRow: string;
  @ViewChild('dt', { static: false }) dataTable: any;
  @Input() datasLimit: any[] = []

  constructor(private router: Router, private modelosAutoService: ModelosAutoService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
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

  // getMinDate(obj){
  //   let d = new Date(obj.modelosAutoInicioVigencia)
  //   d.setDate(d.getDate() + 1)

  //   return d
  // }

  // getMaxDate(obj){
  //   let d = new Date(obj.modelosAutoFimVigencia)
  //   d.setDate(d.getDate() - 1)

  //   return d
  // }

  handleChangeDate1(event, obj, index) {
    let d = new Date(event)
    d.setDate(d.getDate() + 1)
    this.datasLimit[index] = {
      date1: this.datasLimit[index].date1,
      date2: d
    }

    let mod: ModelosAuto = {
      modeloId: obj.modeloId,
      modelosAutoFimVigencia: obj.dataFimVigencia,
      modelosAutoId: obj.modelosAutoId,
      modelosAutoUtilizacao: obj.modelosAutoUtilizacao,
      modelosAutoInicioVigencia: moment(event).format("YYYY-MM-DD")
    }

    if (!obj.modelosAutoId) {
      this.modelosAutoService.salvar(mod).subscribe((res) => {
        obj = {
          ...obj,
          modeloId: res.modeloId,
          dataInicioVigencia: res.modelosAutoInicioVigencia,
          dataFimVigencia: res.modelosAutoFimVigencia,
          modelosAutoId: res.modelosAutoId,
          modelosAutoUtilizacao: res.modelosAutoUtilizacao,
        }
        this.dados.content[index] = obj
      })
    } else {
      this.modelosAutoService.alterar(mod).subscribe((res) => {
        obj.modeloId = res.modeloId
        obj.dataFimVigencia = res.modelosAutoFimVigencia
        obj.modelosAutoId = res.modelosAutoId
        obj.dataInicioVigencia = res.modelosAutoInicioVigencia
        obj.modelosAutoUtilizacao = res.modelosAutoUtilizacao
        this.dados.content[index] = obj
      })
    }
  }

  handleChangeDate2(event, obj, index) {
    let d = new Date(event)
    d.setDate(d.getDate() - 1)
    this.datasLimit[index] = {
      date1: d,
      date2: this.datasLimit[index].date2
    }

    let mod: ModelosAuto = {
      modeloId: obj.modeloId,
      modelosAutoInicioVigencia: obj.dataInicioVigencia,
      modelosAutoId: obj.modelosAutoId,
      modelosAutoUtilizacao: obj.modelosAutoUtilizacao,
      modelosAutoFimVigencia: moment(event).format("YYYY-MM-DD")
    }

    if (!obj.modelosAutoId) {
      this.modelosAutoService.salvar(mod).subscribe((res) => {
        obj = {
          ...obj,
          modeloId: res.modeloId,
          dataInicioVigencia: res.modelosAutoInicioVigencia,
          dataFimVigencia: res.modelosAutoFimVigencia,
          modelosAutoId: res.modelosAutoId,
          modelosAutoUtilizacao: res.modelosAutoUtilizacao
        }
        this.dados.content[index] = obj
      })
    } else {
      this.modelosAutoService.alterar(mod).subscribe((res) => {
        obj.modeloId = res.modeloId
        obj.dataFimVigencia = res.modelosAutoFimVigencia
        obj.modelosAutoId = res.modelosAutoId
        obj.dataInicioVigencia = res.modelosAutoInicioVigencia
        obj.modelosAutoUtilizacao = res.modelosAutoUtilizacao
        this.dados.content[index] = obj
      })
    }
  }

  visualizarModelo(obj: any) {
    this.router.navigate(['/classificador/selecao-modelos-classificacao-automatica/visualizar'], { state: { data: obj } });
  }

  removerModelo(obj: any, index) {
    let mod: ModelosAuto = {
      modeloId: obj.modeloId,
      modelosAutoInicioVigencia: obj.dataInicioVigencia,
      modelosAutoFimVigencia: obj.dataFimVigencia,
      modelosAutoId: obj.modelosAutoId,
      modelosAutoUtilizacao: 0
    }

    if (!obj.modelosAutoId) {
      this.modelosAutoService.salvar(mod).subscribe((res) => {
        obj = {
          ...obj,
          modeloId: res.modeloId,
          dataInicioVigencia: res.modelosAutoInicioVigencia,
          dataFimVigencia: res.modelosAutoFimVigencia,
          modelosAutoId: res.modelosAutoId,
          modelosAutoUtilizacao: res.modelosAutoUtilizacao
        }
        this.dados.content[index] = obj
      })
    } else {
      this.modelosAutoService.alterar(mod).subscribe((res) => {
        obj.modeloId = res.modeloId
        obj.dataFimVigencia = res.modelosAutoFimVigencia
        obj.modelosAutoId = res.modelosAutoId
        obj.dataInicioVigencia = res.modelosAutoInicioVigencia
        obj.modelosAutoUtilizacao = res.modelosAutoUtilizacao
        this.dados.content[index] = obj
      })
    }
  }

  aplicarModelo(obj: any, index) {

    if (!obj.dataInicioVigencia || !obj.dataFimVigencia) {
      swal.fire('Aviso', 'Não foi selecionado um data de inicio ou fim de vigência!', 'warning');
      return
    }

    // if (obj.modeloMapeado !== 'Sim') {
    //   swal.fire('Aviso', 'Para aplicar seleção o modelo deve estar mapeado!', 'warning');
    //   return
    // }

    let mod: ModelosAuto = {
      modeloId: obj.modeloId,
      modelosAutoInicioVigencia: obj.dataInicioVigencia,
      modelosAutoFimVigencia: obj.dataFimVigencia,
      modelosAutoId: obj.modelosAutoId,
      modelosAutoUtilizacao: 1
    }

    if (!obj.modelosAutoId) {
      this.modelosAutoService.salvar(mod).subscribe((res) => {
        obj = {
          ...obj,
          modeloId: res.modeloId,
          dataInicioVigencia: res.modelosAutoInicioVigencia,
          dataFimVigencia: res.modelosAutoFimVigencia,
          modelosAutoId: res.modelosAutoId,
          modelosAutoUtilizacao: res.modelosAutoUtilizacao
        }
        this.dados.content[index] = obj
      })
    } else {
      this.modelosAutoService.alterar(mod).subscribe((res) => {
        obj.modeloId = res.modeloId
        obj.modelosAutoFimVigencia = res.modelosAutoFimVigencia
        obj.modelosAutoId = res.modelosAutoId
        obj.modelosAutoInicioVigencia = res.modelosAutoInicioVigencia
        obj.modelosAutoUtilizacao = res.modelosAutoUtilizacao
        this.dados.content[index] = obj
      })
    }
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

  pageChanged(event) {
    const modelos: ModelosAutoRequest = this.consultaForm.value;
    this.page = event;
    this.modelosAutoService.listar(modelos, (event - 1), 10).subscribe((res) => {
      this.dados = res;

      this.datasLimit = []
      this.dados.content.forEach((res, index) => {
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
  }
}
