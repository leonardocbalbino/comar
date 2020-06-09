import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { FonteService } from '@app/api/service/fonte.service';

@Component({
  selector: 'app-table-regras-produto',
  templateUrl: './table-regras-produto.component.html',
  styleUrls: ['./table-regras-produto.component.css']
})
export class TableRegrasProdutoComponent implements OnInit {
  fontes$: Observable<Fonte[]>;


  @Input() dados: Array<any>;
  @Input() hasDetail: boolean = false;
  @Input() colunas: Array<any>;
  @Input() rowTable: number = 10;
  @Input() keyRow: string;
  @ViewChild('dt', { static: false }) dataTable: any;

  constructor(private fonteService: FonteService) {
  }

  ngOnInit() {}

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
}
