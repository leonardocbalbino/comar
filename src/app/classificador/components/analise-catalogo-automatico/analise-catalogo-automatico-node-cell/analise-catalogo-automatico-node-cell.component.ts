import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { TreeNode, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-analise-catalogo-automatico-node-cell',
  templateUrl: './analise-catalogo-automatico-node-cell.component.html',
  styleUrls: ['./analise-catalogo-automatico-node-cell.component.css']
})
export class AnaliseCatalogoAutomaticoNodeCellComponent implements OnInit {

  @Input() node: TreeNode;
  @ViewChild('inputNode', { static: false }) inputNode: ElementRef;
  @ViewChild('btnNode', { static: false }) btnNode: ElementRef;
  @Output() changeValueNode: EventEmitter<any> = new EventEmitter();
  @Output() hideContextMenu: EventEmitter<any> = new EventEmitter();
  isHiddenInput: boolean = true;
  isSelectedLabel: boolean = false;


  constructor() { }

  ngOnInit() {

  }


  handleShowInput() {
    if (!this.node.parent) {
      this.isHiddenInput = !this.isHiddenInput;
      (this.inputNode.nativeElement as HTMLInputElement).value = this.node.label;
      if (this.isHiddenInput == false) {
        setTimeout(() => (this.inputNode.nativeElement as HTMLInputElement).select(), 0);
      }
      console.log("aparecer INPUT");
    }else{
      console.log("INPUT não aparece pq tem parent, ou seja, não é da primeira ramificação de nodes.");
    }
  }

  renomearNode(event) {
    let name: string = this.inputNode.nativeElement.value;
    if (name != '' && name.trim().length != 0) {
      this.isHiddenInput = !this.isHiddenInput;
      this.node.label = name.trim();
      this.changeValueNode.emit(this.node);
      this.hideContextMenu.emit(false);
      //salva no banco
    } else {
      this.isHiddenInput = !this.isHiddenInput;
    }
  }

  blurInput(event) {
    setTimeout(() => (this.inputNode.nativeElement as HTMLInputElement).blur(), 0);
  }
}
