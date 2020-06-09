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
import { ProdutoService } from '@app/api/classificador/service/produto.service';

@Component({
  selector: 'app-table-escolha-produto',
  templateUrl: './table-escolha-produto.component.html',
  styleUrls: ['./table-escolha-produto.component.css']
})
export class TableEscolhaProdutoComponent implements OnInit {
  page: number;
  @Input() dados: Pageable<any>;
  @Input() colunas: Array<any>;
  @Input() rowTable: number = 5;
  @Input() segmentoSelecionado: any = null;
  @Input() descProd: any = "";
  @Output() selectedRowRadio: EventEmitter<any> = new EventEmitter();
  selected: any

  constructor(private produtoService: ProdutoService,) {
  }

  ngOnInit() {
  }

  onRowSelect(event) {
    this.selectedRowRadio.emit(this.selected);
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
    this.page = event;
    this.produtoService.buscar((event - 1), 5, this.segmentoSelecionado.hierarquiaId, this.descProd).subscribe( (res)=>{
      this.dados = res
    })
  }
}
