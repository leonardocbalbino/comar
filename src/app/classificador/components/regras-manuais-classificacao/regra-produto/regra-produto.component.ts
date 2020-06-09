import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { FonteService } from '@app/api/service/fonte.service';
import { Catalogo } from '@app/api/classificador/models/catalogo';
import { CatalogoService } from '@app/api/classificador/service/catalogo.service';

@Component({
  selector: 'app-regra-produto',
  templateUrl: './regra-produto.component.html',
  styleUrls: ['./regra-produto.component.css']
})
export class RegraProdutoComponent implements OnInit {

  fontes$: Observable<Fonte[]>;
  catalogo$: Observable<Catalogo[]>;


  @Input() dados: Array<any>;
  @Input() prodSelected: any;
  @Input() colunas: Array<any>;
  @Input() rowTable: number = 10;
  @Input() isAttributeScreen: boolean;
  @Output() selectedRowRadio: EventEmitter<any> = new EventEmitter();
  @Output() verifyRegraDetalhe: EventEmitter<any> = new EventEmitter();
  @Output() removeProd: EventEmitter<any> = new EventEmitter();
  @Input() keyRow: string;
  selected: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  removerProduto(obj: any) {
    this.dados.splice(this.dados.indexOf(obj), 1)
    this.removeProd.emit(obj);
    if(this.dados.length == 0){
      this.selected = null
    }
    if(obj == this.selected){
      this.selected = null
    }
  }

  handleChangeSelected(event){
    console.log("teste")
    this.selectedRowRadio.emit(this.selected);
  }

  handleChangeSelectedBefore(event){
    console.log("antes")
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
}
