import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() dados: Array<any>;
  @Input() colunas: Array<any>;
  @Input() labelCriar: string;
  @Input() rotaForm: string;
  @Input() rotaSearch: string;
  @Input() rotaAlert: string;
  @Output() deletar: EventEmitter<any> = new EventEmitter();


  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  editarRegistro(obj: any) {
    this.router.navigate([`${this.rotaForm}`], { state: { data: obj } });
  }

  deletarRegistro(obj: any) {
    if (confirm('Deseja realmente excluir o registro?')) {
      this.deletar.emit(obj);
    }
  }

  criarRegistro() {
    this.router.navigate([`${this.rotaForm}`]);
  }

  buscaRegistro(obj: any) {
    this.router.navigate([`${this.rotaSearch}`], { state: { data: obj } });
  }


  namespace(object, path: string, padrao: any, type: any = null) {
    if (padrao !== undefined) {
      return padrao;
    }
    if (path.indexOf('.') === -1) {
      return this.parseType(object[path], type);
    }
    const result = path.split('.').reduce((value, index) => {
      try {
        return this.parseType(value[index], type);
      } catch (error) {
        return '';
      }
    }, object);

    return this.parseType(result, type);
  }

  private parseType(value: any, type: any) {

    if (type === 'boolean') {
      return value ? 'SIM' : 'NÃO';
    }

    return value;
  }
}
