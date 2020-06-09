import { Component, OnInit, Input, ElementRef, ViewChildren } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analise-catalogo-automatico-tree-list',
  templateUrl: './analise-catalogo-automatico-tree-list.component.html',
  styleUrls: ['./analise-catalogo-automatico-tree-list.component.css']
})
export class AnaliseCatalogoAutomaticoTreeListComponent implements OnInit {

  @Input() input: any;
  @ViewChildren('nodeCell') nodeCell: any;
  filesTree5: TreeNode[];
  fileSelected: TreeNode;
  isShowingInput: boolean;
  items: MenuItem[];
  nodes: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    /*this.filesTree5 = [
      {
        "label": "Documents",
        "data": "Documents Folder",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "key": "1",
        "children": [{
          "label": "Work",
          "icon": "ti-plus",
          "key": "1-1"
        },
        {
          "label": "Home",
          "icon": "ti-plus",
          "key": "1-2"
        }]
      },
      {
        "label": "Cluster",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "key": "4",
        "children": [{
          "label": "Work",
          "icon": "ti-plus",
          "key": "4-1"
        },
        {
          "label": "Home",
          "icon": "ti-plus",
          "key": "4-2"
        }]
      },
      {
        "label": "Pictures",
        "data": "Pictures Folder",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "key": "2",
        "children": [
          {
            "label": "barcelona.jpg", "icon": "ti-plus", "key": "2-1"
          },
          {
            "label": "logo.jpg", "icon": "ti-plus", "key": "2-2"
          },
          {
            "label": "primeui.png", "icon": "ti-plus", "key": "2-3"
          }]
      },
      {
        "label": "Movies",
        "data": "Movies Folder",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "key": "3",
        "children": [{
          "label": "Al Pacino",
          "icon": "ti-plus",
          "key": "3-1"
        },
        {
          "label": "Robert De Niro",
          "icon": "ti-plus",
          "key": "3-2"
        }]
      },
      {
        "label": "Movies",
        "data": "Movies Folder",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "key": "4",
        "children": [{
          "label": "Al Pacino",
          "icon": "ti-plus",
          "key": "4-1"
        },
        {
          "label": "Robert De Niro",
          "icon": "ti-plus",
          "key": "4-2"
        }]
      },
      {
        "label": "Movies",
        "data": "Movies Folder",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "key": "5",
        "children": [{
          "label": "Al Pacino",
          "icon": "ti-plus",
          "key": "5-1"
        },
        {
          "label": "Robert De Niro",
          "icon": "ti-plus",
          "key": "5-2"
        }]
      },
      {
        "label": "Movies",
        "data": "Movies Folder",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "key": "6",
        "children": [{
          "label": "Al Pacino",
          "icon": "ti-plus",
          "key": "6-1"
        },
        {
          "label": "Robert De Niro",
          "icon": "ti-plus",
          "key": "6-2"
        }]
      }
    ];*/

    this.items = [
      { label: 'Adicionar', icon: 'pi pi-plus', command: (event) => this.addCuster() },
      { label: 'Renomear', icon: 'pi pi-pencil', command: (event) => this.handleShowInput() }
    ];

    if(localStorage.getItem("clusters")){
      this.nodes = JSON.parse(localStorage.getItem("clusters"));
    }
  }

  addCuster() {
    if (!this.nodes.includes(this.fileSelected)) {
      this.nodes.push(this.fileSelected);
      localStorage.setItem("clusters", JSON.stringify(this.nodes));
    } else {
      confirm('Você já adicionou este catálogo!')
    }
  }

  handleShowInput() {
    let aux = this.nodeCell._results[this.filesTree5.indexOf(this.fileSelected)];
    console.log(aux);
    aux.isHiddenInput = !(aux.isHiddenInput);
    (aux.inputNode.nativeElement as HTMLInputElement).value = aux.node.label;
    if (aux.isHiddenInput == false) {
      setTimeout(() => (aux.inputNode.nativeElement as HTMLInputElement).select(), 0);
    }
  }

  changeValueNode(event) {
    //update Tabela(CampoLabel) set files5.includes(event[0]).label  where primaryKey == files5.includes(event[0]).key;
  }

  setIsShowingCM(event) {
    this.isShowingInput = event;
    console.log(this.isShowingInput);
  }

  hideContextMenu(event: MouseEvent, contextMenu: any) {
    if ((event.target as HTMLElement).tagName !== "BUTTON" || this.filesTree5.indexOf(this.fileSelected) == -1) {
      contextMenu.hide();
    }
  }

  criarNovo(nodes: any){
    if( this.nodes.length > 0 ){
      this.router.navigate(['classificador/analise-catalogo-automatico/cadastrar'], { state: { nodes } });
    }else if( this.nodes.length == 0 ){
      confirm("Não há grupos selecionados!");
    }
  }
}
