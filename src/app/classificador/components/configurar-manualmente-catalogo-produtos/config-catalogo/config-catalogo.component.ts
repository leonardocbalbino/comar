import { Component, OnInit } from '@angular/core';
import { TreeNode, MenuItem } from 'primeng/primeng';
import { Location } from '@angular/common';
import { lab } from 'd3';
import {TreeModule} from 'primeng/tree';
import {FieldsetModule} from 'primeng/fieldset';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FonteService } from '@app/api/service/fonte.service';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import {SelectItem} from 'primeng/api';
import { Catalogo } from '@app/api/classificador/models/catalogo';
import { CatalogoService } from '@app/api/classificador/service/catalogo.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';





// interface City {
//   name: string;
//   code: string;
// }

@Component({
  selector: 'app-config-catalogo',
  templateUrl: './config-catalogo.component.html',
  styleUrls: ['./config-catalogo.component.css']
})
export class ConfigCatalogoComponent implements OnInit {

  messageService: any;
  filesTree5: TreeNode[];
  items: MenuItem[];
  fileSelected: TreeNode;
  pt: any;
  date1: Date;
  fontes$: Observable<Fonte[]>;
  catalogo$: Observable<Catalogo[]>;
  colunas: any;
  // cities1: SelectItem[];
  // cities2: City[];
  // selectedCity1: City;
  // selectedCity2: City;



  constructor(private location: Location, 
               private fonteService: FonteService,
              private catalogoService: CatalogoService) { }

  ngOnInit() {

  //   this.items = [
  //     {label: 'Editar', icon: 'fa fa-pencil', command: (event) => this.editarFile()},
  //     {label: 'Remover', icon: 'fa fa-close', command: (event) => this.unselectFile()}
  // ];

//   this.cities1 = [
//     {label:'Select City', value:null},
//     {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
//     {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
//     {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
//     {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
//     {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
// ];

  this.colunas = [
    { campo: 'fonteAlias', cabecalho: 'Segmento' }
    // { campo: '', cabecalho: 'Segmento' }
  ];

  // this.fontes$ = this.fonteService.listar();
  // this.catalogo$ = this.catalogoService.listar();

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

  //   this.filesTree5 = [
  //     {
  //       label: 'Segmento 01 - Agricultura',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //       children: [
  //         {
  //           label: 'Grupo 1',
  //           collapsedIcon: 'fa fa-folder',
  //           expandedIcon: 'fa fa-folder-open',
  //           children: [
  //             {
  //               label: 'Subgrupo 1',
  //               collapsedIcon: 'fa fa-folder',
  //               expandedIcon: 'fa fa-folder-open',
  //               children: [{label: 'Valor Mínimo:', icon: 'far fa-file-alt'},
  //               {label: 'Valor Máximo:', icon: 'far fa-file-alt'},
  //               {label: 'Valor Médio:', icon: 'far fa-file-alt'},
  //               {label: 'Fator de Aceitação:', icon: 'far fa-file-alt'},
  //               {label: 'Tipo de Produto:', icon: 'far fa-file-alt'},
  //               {label: 'Portaria:', icon: 'far fa-file-alt'},
  //               {label: 'Inicio Vigência:', icon: 'far fa-file-alt'},
  //               {label: 'Fim Vigência:', icon: 'far fa-file-alt'},
  //               {label: 'Unidade:', icon: 'far fa-file-alt'},
  //               {label: 'NCM:', icon: 'far fa-file-alt'},
  //               {label: 'GTIN:', icon: 'far fa-file-alt'},
  //               {label: 'Valor Unitário:', icon: 'far fa-file-alt'}],
  //             }
  //           ]
  //         },
  //         {
  //           label: 'Grupo 2',
  //           collapsedIcon: 'fa fa-folder',
  //           expandedIcon: 'fa fa-folder-open',
  //           children: [
  //             {
  //               label: 'Subgrupo 2',
  //               collapsedIcon: 'fa fa-folder',
  //               expandedIcon: 'fa fa-folder-open',
  //               children: [
  //                 {label: 'Valor Mínimo:', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Máximo:', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Médio:', icon: 'far fa-file-alt'},
  //                 {label: 'Fator de Aceitação', icon: 'far fa-file-alt'}]
  //             }
  //           ]
  //         },
  //       ]
  //     },
  //     {
  //       label: 'Segmento 02 - Bebidas',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //       children: [
  //         {
  //           label: 'Grupo 01 - Água Mineral',
  //           collapsedIcon: 'fa fa-folder',
  //           expandedIcon: 'fa fa-folder-open',
  //         },
  //         {
  //           label: 'Grupo 02 - Refrigerantes',
  //           collapsedIcon: 'fa fa-folder',
  //           expandedIcon: 'fa fa-folder-open',
  //           children: [
  //             {
  //               label: 'Coca-Cola 3000ml',
  //               collapsedIcon: 'fa fa-folder',
  //               expandedIcon: 'fa fa-folder-open',
  //               children: [
  //                 {label: 'Valor Mínimo: 6.90', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Máximo: 7.20', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Médio: 7.04', icon: 'far fa-file-alt'},
  //                 {label: 'Fator de Aceitação: 90%', icon: 'far fa-file-alt'}]
  //             },
  //             {
  //               label: 'Coca-Cola 350ml',
  //               collapsedIcon: 'fa fa-folder',
  //               expandedIcon: 'fa fa-folder-open',
  //               children: [
  //                 {label: 'Valor Mínimo:', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Máximo:', icon: 'far fa-file-alt'},
  //                 {label: 'Fator de Aceitação', icon: 'far fa-file-alt'}]
  //             },
  //             {
  //               label: 'Guaraná Jesus 2000ml',
  //               collapsedIcon: 'fa fa-folder',
  //               expandedIcon: 'fa fa-folder-open',
  //               children: [
  //                 {label: 'Valor Mínimo:', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Máximo:', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Médio:', icon: 'far fa-file-alt'},
  //                 {label: 'Fator de Aceitação', icon: 'far fa-file-alt'}]
  //             },
  //             {
  //               label: 'Guanará Jesus 500ml',
  //               collapsedIcon: 'fa fa-folder',
  //               expandedIcon: 'fa fa-folder-open',
  //               children: [
  //                 {label: 'Valor Mínimo:', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Máximo:', icon: 'far fa-file-alt'},
  //                 {label: 'Valor Médio:', icon: 'far fa-file-alt'},
  //                 {label: 'Fator de Aceitação', icon: 'far fa-file-alt'}]
  //             }
  //           ]
  //         },
  //       ]
  //     },
  //     {
  //       label: 'Segmento 03 - Materiais de Construção',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     },
  //     {
  //       label: 'Segmento 04 - Frutos do Mar e Rios',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     },
  //     {
  //       label: 'Segmento 05 - Hortifrutigranjeiro',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     },
  //     {
  //       label: 'Segmento 06 - Pecúaria',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     },
  //     {
  //       label: 'Segmento 07 - Madeira',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     },
  //     {
  //       label: 'Segmento 08 - Sucada e Vasilhame',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     }, {
  //       label: 'Segmento 09 - Sovertes e Picolés',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     },
  //     {
  //       label: 'Segmento 10 - Fretes',
  //       collapsedIcon: 'fa fa-folder',
  //       expandedIcon: 'fa fa-folder-open',
  //     },
  //   ];
   }

  // viewFile(file: TreeNode) {
  //     this.messageService.add({severity: 'info', summary: 'Node Selected with Right Click', detail: file.label});
  // }

  // unselectFile() {
  //   this.fileSelected = null;
  // }

  // editarFile() {}

  voltar() {
    this.location.back();
  }

}
