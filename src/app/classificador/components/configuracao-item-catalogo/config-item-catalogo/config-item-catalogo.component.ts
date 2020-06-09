import { Component, OnInit } from '@angular/core';
import { TreeNode, Button } from 'primeng/primeng';
import { sendRequest } from 'selenium-webdriver/http';
import { Location } from '@angular/common';
import {TreeModule} from 'primeng/tree';
import { Command } from 'protractor';



@Component({
  selector: 'app-config-item-catalogo',
  templateUrl: './config-item-catalogo.component.html',
  styleUrls: ['./config-item-catalogo.component.css']
})
export class ConfigItemCatalogoComponent implements OnInit {

  filesTree6: TreeNode[];
  items: { label: string; icon: string; command: (event: any) => any; }[];
  loading: boolean;
  pt: any;
  date1: Date;

  constructor(private location: Location) { }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.items = [
      {label: 'Excluir', icon: 'fa fa-close', command: (onClick) => this.ExcluirItem( )},
      {label: 'Editar', icon: 'fa fa-edit', command: (onclick) => this.Editaritem()}
    ];

    // tslint:disable-next-line: triple-equals

    this.filesTree6 = [{
    label: '+ Adicionar Segmento',
  }];

    this.pt = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

}
  // Metodo para o click do botão direito
  ExcluirItem() {}
  // Metodo para o click do botão direito
  Editaritem() {}

  adicionarSegmento(event) {
    // tslint:disable-next-line: triple-equals
    if (event.node.label == '+ Adicionar Segmento') {
      this.filesTree6 = Array.prototype.concat(this.filesTree6, [{
        label: 'Segmento - Teste',
        expandedIcon: 'fa fa-folder-open',
        collapsedIcon: 'fa fa-folder',
        children: [{
          label: '+ Adicionar Grupo',
        }]
      }]);
    // tslint:disable-next-line: triple-equals
    } else if (event.node.label == '+ Adicionar Grupo') {
      // tslint:disable-next-line: max-line-length
      this.filesTree6[this.filesTree6.indexOf(event.node.parent)].children = Array.prototype.concat(this.filesTree6[this.filesTree6.indexOf(event.node.parent)].children, [{
        label: 'Grupo - Teste',
        expandedIcon: 'fa fa-folder-open',
        collapsedIcon: 'fa fa-folder',
        children: [{
          label: '+ Adicionar Subgrupo',
        }],
      }]);
    // tslint:disable-next-line: triple-equals
    } else if (event.node.label == '+ Adicionar Subgrupo') {
      // tslint:disable-next-line: prefer-const
      let o = event.node.parent;
      // tslint:disable-next-line: prefer-const
      let c = o.parent;
      console.log(this.filesTree6[this.filesTree6.indexOf(c)].children[c.children.indexOf(o)].children);

      // tslint:disable-next-line: max-line-length
      this.filesTree6[this.filesTree6.indexOf(c)].children[c.children.indexOf(o)].children = Array.prototype.concat(this.filesTree6[this.filesTree6.indexOf(c)].children[c.children.indexOf(o)].children, [{
        label: 'Subgrupo - Teste',
        expandedIcon: 'fa fa-folder-open',
        collapsedIcon: 'fa fa-folder',
      }]);
    }
  }


voltar() {
    this.location.back();
  }

salvarCatalogo() {}
}

