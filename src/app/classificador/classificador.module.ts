import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgSelectModule } from '@ng-select/ng-select';
import { QueryBuilderModule } from 'angular2-query-builder';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '@app/shared/shared.module';
import { ClassificadorRoutingModule } from './classificador.routing.module';
import {DialogModule} from 'primeng/dialog';

import { TreeDragDropService } from 'primeng/components/common/treedragdropservice';
import { FonteService } from '@app/api/service/fonte.service';
import { SchemaService } from '@app/api/service/schema.service';
import { PastaService } from '@app/api/service/pasta.service';
import { AtributoService } from '@app/api/service/atributo.service';
import { GrupoService } from '@app/api/service/grupo.service';
import { RegraManualService } from '@app/api/classificador/service/regra-manual.service';
import { ChartModule } from 'primeng/chart';
import { RadioButtonModule } from 'primeng/radiobutton';

import { MainClassificadorComponent } from './components/main-classificador/main-classificador.component';
import { RegrasManuaisClassificacaoListComponent } from './components/regras-manuais-classificacao/regras-manuais-classificacao-list/regras-manuais-classificacao-list.component';
import { RegrasManuaisClassificacaoNovaRegraComponent } from './components/regras-manuais-classificacao/regras-manuais-classificacao-nova-regra/regras-manuais-classificacao-nova-regra.component';
import { RegrasManuaisClassificacaoVisualizarComponent } from './components/regras-manuais-classificacao/regras-manuais-classificacao-visualizar/regras-manuais-classificacao-visualizar.component';
import { SelecaoModelosClassificacaoAutomaticaListComponent } from './components/selecao-modelos-classificacao-automatica/selecao-modelos-classificacao-automatica-list/selecao-modelos-classificacao-automatica-list.component';
import { SelecaoModelosClassificacaoAutomaticaVisualizarComponent } from './components/selecao-modelos-classificacao-automatica/selecao-modelos-classificacao-automatica-visualizar/selecao-modelos-classificacao-automatica-visualizar.component';
import { ClassificacaoManualItemListComponent } from './components/classificacao-manual-item/classificacao-manual-item-list/classificacao-manual-item-list.component';
import { ClassificacaoManualItemCadastrarComponent } from './components/classificacao-manual-item/classificacao-manual-item-cadastrar/classificacao-manual-item-cadastrar.component';
import { ClassificacaoManualItemVisualizarComponent } from './components/classificacao-manual-item/classificacao-manual-item-visualizar/classificacao-manual-item-visualizar.component';
import { ClassificacaoManualItemReclassificarComponent } from './components/classificacao-manual-item/classificacao-manual-item-reclassificar/classificacao-manual-item-reclassificar.component';
import { AnaliseCatalogoAutomaticoTreeListComponent } from './components/analise-catalogo-automatico/analise-catalogo-automatico-tree-list/analise-catalogo-automatico-tree-list.component';
import { AnaliseCatalogoAutomaticoCadastrarComponent } from './components/analise-catalogo-automatico/analise-catalogo-automatico-cadastrar/analise-catalogo-automatico-cadastrar.component';
import { ConfigCatalogoComponent } from './components/configurar-manualmente-catalogo-produtos/config-catalogo/config-catalogo.component';
import { ConfigItemCatalogoComponent} from './components/configuracao-item-catalogo/config-item-catalogo/config-item-catalogo.component';
import { ImportacaoItensCatalogoComponent } from './components/importacao-itens-catalogo/importacao-itens-catalogo.component';
import { SelecaoModelosCatalogoAutomaticoListComponent } from './components/selecao-modelos-catalogo-automatico/selecao-modelos-catalogo-automatico-list/selecao-modelos-catalogo-automatico-list.component';
import { SelecaoModelosCatalogoAutomaticoVisualizarComponent } from './components/selecao-modelos-catalogo-automatico/selecao-modelos-catalogo-automatico-visualizar/selecao-modelos-catalogo-automatico-visualizar.component';
import { AnaliseCatalogoAutomaticoNodeCellComponent } from './components/analise-catalogo-automatico/analise-catalogo-automatico-node-cell/analise-catalogo-automatico-node-cell.component';
import { PainelEstatisticasClassificadorComponent } from './components/painel-estatisticas-classificador/painel-estatisticas-classificador.component';
import { ClassificacaoManualItemSelecionadosComponent } from './components/classificacao-manual-item/classificacao-manual-item-selecionados/classificacao-manual-item-selecionados.component';
import { ListaClassificacaoAutomaticaListComponent } from './components/lista-classificacao-automatica/lista-classificacao-automatica-list/lista-classificacao-automatica-list.component';
import { ListaClassificacaoAutomaticaVisualizarComponent } from './components/lista-classificacao-automatica/lista-classificacao-automatica-visualizar/lista-classificacao-automatica-visualizar.component';
import { ManutencaoReclassificacaoListComponent } from './components/manutencao-reclassificacao/manutencao-reclassificacao-list/manutencao-reclassificacao-list.component';
import { ManutencaoReclassificacaoVisualizarComponent } from './components/manutencao-reclassificacao/manutencao-reclassificacao-visualizar/manutencao-reclassificacao-visualizar.component';
import { PortariaListComponent } from './components/configuração-portaria/portaria-list/portaria-list.component';
import { PortariaCadastroComponent } from './components/configuração-portaria/portaria-cadastro/portaria-cadastro.component';
import { DetalheCatalogoComponent } from './components/configurar-manualmente-catalogo-produtos/detalhe-catalogo/detalhe-catalogo.component';
import { MapeamentoListComponent } from './components/mapeamento-agente/mapeamento-list/mapeamento-list.component';
import { ConfiguracaoAtributosRegrasManuaisListComponent } from './components/configuracao-atributos-regras-manuais/configuracao-atributos-regras-manuais-list/configuracao-atributos-regras-manuais-list.component';
import { MapeamentoVisualizarComponent } from './components/mapeamento-agente/mapeamento-visualizar/mapeamento-visualizar.component';
import { TableRegrasManuaisComponent } from './components/regras-manuais-classificacao/table-regras-manuais/table-regras-manuais.component';
import { TableSelecaoModelosComponent } from './components/selecao-modelos-classificacao-automatica/table-selecao-modelos/table-selecao-modelos.component';
import { TableMapeamentoComponent } from './components/mapeamento-agente/table-mapeamento/table-mapeamento.component';
import { TableRegrasProdutoComponent } from './components/regras-manuais-classificacao/table-regras-produto/table-regras-produto.component';
import { RegraComponent } from './components/regras-manuais-classificacao/regra/regra.component';
import { RegraProdutoComponent } from './components/regras-manuais-classificacao/regra-produto/regra-produto.component';
import { TableMapeamentoListComponent } from './components/mapeamento-agente/table-mapeamento-list/table-mapeamento-list.component';
import { NgSelectTableComponent } from './components/mapeamento-agente/ng-select-table/ng-select-table.component';


import { AcompanhamentoClassificacaoService } from '@app/api/classificador/service/acompanhamento-class.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { HierarquiaService } from '@app/api/classificador/service/hierarquia.service';
import { ItemClassificacaoManualService } from '@app/api/classificador/service/item-classificacao-manual.service';
import { ColunaProdutoService } from '@app/api/classificador/service/coluna-produto.service';
import { TableEscolhaProdutoComponent } from './components/regras-manuais-classificacao/table-escolha-produto/table-escolha-produto.component';
import { ProdutoClassAutoService } from '@app/api/classificador/service/produto-class-auto.service';
@NgModule({
  declarations: [
    MainClassificadorComponent,
    RegrasManuaisClassificacaoListComponent,
    RegrasManuaisClassificacaoNovaRegraComponent,
    RegrasManuaisClassificacaoVisualizarComponent,
    SelecaoModelosClassificacaoAutomaticaListComponent,
    SelecaoModelosClassificacaoAutomaticaVisualizarComponent,
    ClassificacaoManualItemListComponent,
    ClassificacaoManualItemCadastrarComponent,
    ClassificacaoManualItemVisualizarComponent,
    ClassificacaoManualItemReclassificarComponent,
    AnaliseCatalogoAutomaticoTreeListComponent,
    AnaliseCatalogoAutomaticoCadastrarComponent,
    ConfigCatalogoComponent,
    ConfigItemCatalogoComponent,
    ImportacaoItensCatalogoComponent,
    SelecaoModelosCatalogoAutomaticoListComponent,
    SelecaoModelosCatalogoAutomaticoVisualizarComponent,
    AnaliseCatalogoAutomaticoNodeCellComponent,
    PainelEstatisticasClassificadorComponent,
    ClassificacaoManualItemSelecionadosComponent,
    ListaClassificacaoAutomaticaListComponent,
    ListaClassificacaoAutomaticaVisualizarComponent,
    ManutencaoReclassificacaoListComponent,
    ManutencaoReclassificacaoVisualizarComponent,
    PortariaListComponent,
    PortariaCadastroComponent,
    DetalheCatalogoComponent,
    MapeamentoListComponent,
    ConfiguracaoAtributosRegrasManuaisListComponent,
    MapeamentoVisualizarComponent,
    TableRegrasManuaisComponent,
    TableSelecaoModelosComponent,
    TableMapeamentoComponent,
    TableRegrasProdutoComponent,
    RegraComponent,
    RegraProdutoComponent,
    TableMapeamentoListComponent,
    NgSelectTableComponent,
    TableEscolhaProdutoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    ClassificadorRoutingModule,
    CommonModule,
    SharedModule.forRoot(),
    ClassificadorRoutingModule,
    TreeModule,
    FormsModule,
    ReactiveFormsModule,
    ContextMenuModule,
    NgSelectModule,
    FileUploadModule,
    NgbModule,
    TableModule,
    DragDropModule,
    QueryBuilderModule,
    CalendarModule,
    ChartModule,
    RadioButtonModule,
    NgxPaginationModule,
    DialogModule,
  ],
  providers: [
    TreeDragDropService,
    FonteService,
    SchemaService,
    PastaService,
    AtributoService,
    GrupoService,
    RegraManualService,
    AcompanhamentoClassificacaoService,
    HierarquiaService,
    ItemClassificacaoManualService,
    ColunaProdutoService,
    ProdutoClassAutoService,
  ]

})
export class ClassificadorModule { }
