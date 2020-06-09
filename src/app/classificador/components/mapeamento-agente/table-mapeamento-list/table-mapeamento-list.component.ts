import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { FonteService } from '@app/api/service/fonte.service';
import { Catalogo } from '@app/api/classificador/models/catalogo';
import { CatalogoService } from '@app/api/classificador/service/catalogo.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pageable } from '@app/shared/pagination/pageable';
import { ModelosAutoService } from '@app/api/classificador/service/modelos-auto.service';
import { ModelosAutoResponse } from '@app/api/classificador/models/modelos-auto-response';
import { ModelosAutoRequest } from '@app/api/classificador/models/modelos-auto-request';


@Component({
  selector: 'app-table-mapeamento-list',
  templateUrl: './table-mapeamento-list.component.html',
  styleUrls: ['./table-mapeamento-list.component.css']
})
export class TableMapeamentoListComponent implements OnInit {
 
  fontes$: Observable<Fonte[]>;
  catalogo$: Observable<Catalogo[]>;
  @Input() dados: Pageable<any>;
  @Input() colunas: Array<any>;
  @Input() hasView: boolean = false;
  @Input() consultaForm: FormGroup;
  colList: any;
  page: number;
  colView: any;
  // @Input() dados: Array<any>;
  // @Input() colunas: Array<any>;
  @Input() colExpanded: Array<any>;
  @Input() colExpanded2: Array<any>;
  @Input() hasRadio: string;
  @Input() rowTable: number = 10;
  @Input() isAttributeScreen: boolean;
  @Input() activeIcons: any;
  @Output() deletar: EventEmitter<any> = new EventEmitter();
  @Output() editar = new EventEmitter();
  @Output() selectedRowRadio: EventEmitter<any> = new EventEmitter();
  @Input() rowExpanded: boolean = false;
  @Input() keyRow: string;
  @Input() scrollableAttr: boolean = false;
  selected: Array<any>;
  @ViewChild('dt', { static: false }) dataTable: any;

  constructor(private router: Router,
              private fonteService: FonteService,
              private catalogoService: CatalogoService,
              private modelosAutoService: ModelosAutoService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.colExpanded = [
      { campo: 'fonteAlias', cabecalho: 'Item Associado' },
      { campo: 'fonteSchema', cabecalho: '% de Classificação' },
      { campo: 'fonteNome', cabecalho: 'Qtde' },
    ];
    this.fontes$ = this.fonteService.listar('1');
         // LEONARDO
    this.colExpanded2 = [
      { campo: '', cabecalho: 'Produto' },
      { campo: '', cabecalho: 'Valor Minímo' },
      { campo: '', cabecalho: 'Valor Máximo' },
      { campo: '', cabecalho: 'Valor Médio' },
      { campo: '', cabecalho: 'Fator Minímo Aceitação' },
      { campo: '', cabecalho: 'Tipo Produto'},
      { campo: '', cabecalho: 'Portaria' },
      { campo: '', cabecalho: 'Início Vigência' },
      { campo: '', cabecalho: 'Fim Vigência' },
    ];
    this.catalogo$ = this.catalogoService.listar();
    // console.log(this.dados)
  }

  // crudRegistro(obj: any, icon: any) {
  //   if (icon.howFunction == 0) {
  //     if(this.isAttributeScreen){
  //       this.editarAtributo(obj);
  //     }else{
  //       this.editarRegistro(obj, icon);
  //     }
  //   } else if (icon.howFunction == 1) {
  //     this.deletarRegistro(obj);
  //   } else if (icon.howFunction == 2) {
  //     this.visualizarRegistro(obj, icon);
  //   } else if (icon.howFunction == 3) {
  //     this.reclassificarRegistro(obj, icon);
  //   }
  // }

  editarRegistro(obj: any, icon: any) {
    let hasEdit: boolean = true;
      this.router.navigate([icon.rota], { state: { data: obj, hasEdit } });
  }

  visualizarRegistro(obj: any) {
    // this.router.navigate([icon.rota, obj.modeloId]);
    this.router.navigate(['classificador/mapeamento-visualizar'], { state: { data: obj } });
  }


  deletarRegistro(obj: any) {
    if (confirm('Deseja realmente excluir o registro?')) {
      this.deletar.emit(obj);
    }
  }

  editarAtributo(obj: any) {
    this.editar.emit(obj);
  }

  reclassificarRegistro(obj: any, icon: any){
    this.router.navigate([icon.rota], { state: { data: obj } });
  }

  handleChangeSelected(event){
    let index = event.target.parentNode.parentNode.rowIndex;
    let produtoAtual = this.dataTable.value[index-1];
    this.selectedRowRadio.emit(produtoAtual);
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
    });
  }

}
