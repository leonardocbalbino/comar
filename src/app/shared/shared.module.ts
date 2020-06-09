import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full.component';
import { NavigationComponent } from './header-navigation/navigation.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { RadioButtonModule } from 'primeng/radiobutton';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { DataTableComponent } from './data-table/data-table.component';

import {TableModule} from 'primeng/table';
import { DataTableClassificadorComponent } from './data-table-classificador/data-table-classificador.component';
import { MenssegerComponent } from './mensseger/mensseger.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    FullComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    DataTableComponent,
    DataTableClassificadorComponent,
    MenssegerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    TableModule,
    RadioButtonModule
  ],
  exports: [
    FullComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    DataTableComponent,
    DataTableClassificadorComponent,
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    SharedService,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [  ]
    };
  }
}
