import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMineradorComponent } from '@app/minerador/components/main/main-minerador.component';
import { MineradorRoutingModule } from './minerador.routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { TreeModule } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/components/common/treedragdropservice';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FonteService } from '@app/api/service/fonte.service';
import { SchemaService } from '@app/api/service/schema.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { PastaService } from '@app/api/service/pasta.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AtributoService } from '@app/api/service/atributo.service';
import { GrupoMineracaoListComponent } from './components/grupo-mineracao/grupo-mineracao-list/grupo-mineracao-list.component';
import { GrupoMineracaoFormComponent } from './components/grupo-mineracao/grupo-mineracao-form/grupo-mineracao-form.component';
import { GrupoService } from '@app/api/service/grupo.service';
import { ModelosFormComponent } from './components/modelos/modelos-form/modelos-form.component';
import { ModelosListComponent } from './components/modelos/modelos-list/modelos-list.component';
import { FonteDadosListComponent } from './components/fonte-dados/fonte-dados-list/fonte-dados-list.component';
import { FonteDadosFormComponent } from './components/fonte-dados/fonte-dados-form/fonte-dados-form.component';
import { DragDropModule } from 'primeng/dragdrop';
import { QueryBuilderModule } from 'angular2-query-builder';
import { ModelosHistoricoComponent } from './components/modelos/modelos-historico/modelos-historico.component';
// tslint:disable-next-line:max-line-length
import { GrupoMineracaoExploradorComponent } from './components/grupo-mineracao/grupo-mineracao-explorador/grupo-mineracao-explorador.component';
// tslint:disable-next-line:max-line-length
import { GrupoMineracaoTransformacaoComponent } from './components/grupo-mineracao/grupo-mineracao-transformacao/grupo-mineracao-transformacao.component';
import { HighlightModule, HIGHLIGHT_OPTIONS  } from 'ngx-highlightjs';
import { ModelosComparacaoComponent } from './components/modelos/modelos-comparacao/modelos-comparacao.component';
import {ChartModule} from 'primeng/chart';
import {ListboxModule} from 'primeng/listbox';
import { FuncaoMineracaoListComponent } from './components/funcao-mineracao/funcao-mineracao-list/funcao-mineracao-list.component';
import { FuncaoMineracaoFormComponent } from './components/funcao-mineracao/funcao-mineracao-form/funcao-mineracao-form.component';
import { AlgoritmosFormComponent } from './components/algoritmos/algoritmos-form/algoritmos-form.component';
import { AlgoritmosListComponent } from './components/algoritmos/algoritmos-list/algoritmos-list.component';
import { ParametroListComponent } from './components/parametro/parametro-list/parametro-list.component';
import { ParametroFormComponent } from './components/parametro/parametro-form/parametro-form.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { OrigemFormComponent } from './components/origem-integracao/origem-form/origem-form.component';
import { OrigemListComponent } from './components/origem-integracao/origem-list/origem-list.component';
import { OrigemService } from '@app/api/service/origem.service';
import { ParametroService } from '@app/api/service/parametro.service';
import { FuncaoMineracaoService } from '@app/api/service/funcaomineracao.service';
import { ModeloService } from '@app/api/service/modelo.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisibilidadeFormComponent } from './components/visibilidade/visibilidade-form/visibilidade-form.component';
import { PickListModule } from 'primeng/picklist';
import { ModelosTesteComponent } from './components/modelos/modelos-teste/modelos-teste.component';
import { ModelosEdicaoComponent } from './components/modelos/modelos-edicao/modelos-edicao.component';
import { ModelosConsultaComparacaoComponent } from './components/modelos/modelos-consulta-comparacao/modelos-consulta-comparacao.component';

export function getHighlightLanguages() {
  return {
    sql: () => import('highlight.js/lib/languages/sql'),
  };
}

@NgModule({
  declarations: [
    MainMineradorComponent,
    GrupoMineracaoListComponent,
    GrupoMineracaoFormComponent,
    ModelosFormComponent,
    ModelosListComponent,
    FonteDadosListComponent,
    FonteDadosFormComponent,
    ModelosHistoricoComponent,
    GrupoMineracaoExploradorComponent,
    GrupoMineracaoTransformacaoComponent,
    ModelosComparacaoComponent,
    FuncaoMineracaoListComponent,
    FuncaoMineracaoFormComponent,
    AlgoritmosFormComponent,
    AlgoritmosListComponent,
    ParametroListComponent,
    ParametroFormComponent,
    OrigemFormComponent,
    OrigemListComponent,
    VisibilidadeFormComponent,
    ModelosTesteComponent,
    ModelosEdicaoComponent,
    ModelosConsultaComparacaoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    MineradorRoutingModule,
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
    HighlightModule,
    ChartModule,
    NgxCurrencyModule,
    NgxPaginationModule,
    ListboxModule,
    PickListModule
  ],
  providers: [
    TreeDragDropService,
    FonteService,
    SchemaService,
    PastaService,
    AtributoService,
    GrupoService,
    OrigemService,
    ParametroService,
    FuncaoMineracaoService,
    ModeloService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages()
      }
    }
  ]
})
export class MineradorModule { }
