import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ng-select-table',
  templateUrl: './ng-select-table.component.html',
  styleUrls: ['./ng-select-table.component.css']
})
export class NgSelectTableComponent implements OnInit {
  @Input() itensValidos: any = []
  @Input() type: any
  @Output() enviarSelected: EventEmitter<any> = new EventEmitter();
  @Output() deletarSelected: EventEmitter<any> = new EventEmitter();
  @Input() atributoSelecionado: any;
  lastAttr: any;
  @Input() index: number;

  constructor() {  }

  ngOnInit() {
    if (this.atributoSelecionado) {
      this.atributoSelecionado.index = this.index
      this.lastAttr = this.atributoSelecionado
    }
  }

  saveLastAttr(event){
    this.lastAttr = this.atributoSelecionado
  }

  onChangeAttr(event) {
    if (this.atributoSelecionado) {
      this.atributoSelecionado.index = this.index
      this.lastAttr = this.atributoSelecionado
      this.enviarSelected.emit(this.atributoSelecionado)
    } else {
      this.deletarSelected.emit(this.lastAttr)
    }
  }
}
