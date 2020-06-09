import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RegraManualRequest } from '@app/api/classificador/models/regra-manual-request'
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegraManualService } from '@app/api/classificador/service/regra-manual.service';
import { Pageable } from '@app/shared/pagination/pageable';

@Component({
  selector: 'app-table-regras-manuais',
  templateUrl: './table-regras-manuais.component.html',
  styleUrls: ['./table-regras-manuais.component.css'],
  animations: [
      trigger('rowExpansionTrigger', [
          state('void', style({
              transform: 'translateX(-10%)',
              opacity: 0
          })),
          state('active', style({
              transform: 'translateX(0)',
              opacity: 1
          })),
          transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
      ])
  ]
})
export class TableRegrasManuaisComponent implements OnInit {
  @Input() dados: Pageable<any>;
  @Input() colunas: Array<any>;
  @Input() hasView: boolean = false;
  @Input() consultaForm: FormGroup;
  colList: any;
  page: number;
  colView: any;
  @Input() rowTable: number = 10;
  @Input() activeIcons: any;
  @Output() deletar: EventEmitter<any> = new EventEmitter();
  @Output() editar = new EventEmitter();
  @Output() selectedRowRadio: EventEmitter<any> = new EventEmitter();
  @Input() rowExpanded: boolean = false;
  @Input() noActions: boolean = false;
  @Input() keyRow: string;
  selected: Array<any>;
  @ViewChild('dt', { static: false }) dataTable: any;

  constructor(private regraService: RegraManualService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.colList = [
      { campo: 'produto.produtoNome', cabecalho: 'Produto' },
      { campo: 'produto.produtoValorMinimo', cabecalho: 'Valor Minimo' },
      { campo: 'produto.produtoValorMedio', cabecalho: 'Valor Medio' },
      { campo: 'produto.produtoValorMaximo', cabecalho: 'Valor Maximo' },
      { campo: 'produto.produtoFatorAceitacao', cabecalho: 'Fator de Aceitação' },
    ];

    this.colView = [
      { campo: 'regrasDetalheOperadorLogico', cabecalho: 'Operador Logico' },
      { campo: 'atributo.atributoNome', cabecalho: 'Atributo' },
      { campo: 'regrasDetalheOperRelacional', cabecalho: 'Operador Relacional' },
      { campo: 'regrasDetalheCondicao', cabecalho: 'Condição' },
    ];
  }

  editarRegistro(obj: any) {
    let hasEdit: boolean = true;
      // this.router.navigate([icon.rota], { state: { data: obj, hasEdit } });
  }

  visualizarRegistro(obj) {
    this.router.navigate(['/classificador/regras-manuais-classificacao/visualizar'], { state: { data: obj } });
  }

  deletarRegistro(obj: any) {
    if (confirm('Deseja realmente excluir o registro?')) {
      this.deletar.emit(obj);
    }
  }

  editarAtributo(obj: any) {
    this.editar.emit(obj);
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
    const regra: RegraManualRequest = this.consultaForm.value;
    this.page = event;
    this.regraService.listar(regra, (event - 1), 10).subscribe((res) => {
      this.dados = res;
    });
  }
}
