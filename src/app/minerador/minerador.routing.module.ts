import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMineradorComponent } from '@app/minerador/components/main/main-minerador.component';
import { FullComponent } from '@app/shared/layouts/full.component';
import { GrupoMineracaoListComponent } from '@app/minerador/components/grupo-mineracao/grupo-mineracao-list/grupo-mineracao-list.component';
import { FonteDadosListComponent } from './components/fonte-dados/fonte-dados-list/fonte-dados-list.component';
import { ModelosListComponent } from './components/modelos/modelos-list/modelos-list.component';
import { FonteDadosFormComponent } from './components/fonte-dados/fonte-dados-form/fonte-dados-form.component';
import { GrupoMineracaoFormComponent } from './components/grupo-mineracao/grupo-mineracao-form/grupo-mineracao-form.component';
import { ModelosFormComponent } from './components/modelos/modelos-form/modelos-form.component';
import { ModelosHistoricoComponent } from './components/modelos/modelos-historico/modelos-historico.component';
import { ModelosComparacaoComponent } from './components/modelos/modelos-comparacao/modelos-comparacao.component';
import { ModelosTesteComponent } from './components/modelos/modelos-teste/modelos-teste.component';
import { ModelosEdicaoComponent } from './components/modelos/modelos-edicao/modelos-edicao.component';
import { ModelosConsultaComparacaoComponent } from './components/modelos/modelos-consulta-comparacao/modelos-consulta-comparacao.component';
import { MenssegerComponent } from '../shared/mensseger/mensseger.component';
// tslint:disable-next-line: max-line-length
import { GrupoMineracaoExploradorComponent } from './components/grupo-mineracao/grupo-mineracao-explorador/grupo-mineracao-explorador.component';
// tslint:disable-next-line: max-line-length
import { GrupoMineracaoTransformacaoComponent } from './components/grupo-mineracao/grupo-mineracao-transformacao/grupo-mineracao-transformacao.component';
import { FuncaoMineracaoListComponent } from './components/funcao-mineracao/funcao-mineracao-list/funcao-mineracao-list.component';
import { FuncaoMineracaoFormComponent } from './components/funcao-mineracao/funcao-mineracao-form/funcao-mineracao-form.component';
import { AlgoritmosListComponent } from './components/algoritmos/algoritmos-list/algoritmos-list.component';
import { AlgoritmosFormComponent } from './components/algoritmos/algoritmos-form/algoritmos-form.component';
import { ParametroListComponent } from './components/parametro/parametro-list/parametro-list.component';
import { ParametroFormComponent } from './components/parametro/parametro-form/parametro-form.component';
import { OrigemListComponent } from './components/origem-integracao/origem-list/origem-list.component';
import { OrigemFormComponent } from './components/origem-integracao/origem-form/origem-form.component';
import { VisibilidadeFormComponent } from './components/visibilidade/visibilidade-form/visibilidade-form.component';

const routes: Routes = [
    {
        path: '', component: FullComponent,
        children: [
            { path: '', component: MainMineradorComponent },
            {
                path: 'fonte-dados/list',
                component: FonteDadosListComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Fonte de Dados'
                }
            },
            {
                path: 'fonte-dados/form',
                component: FonteDadosFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Fonte de Dados'
                }
            },
            {
                path: 'grupo-mineracao/list',
                component: GrupoMineracaoListComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Grupo de Mineração'
                }
            },
            {
                path: 'grupo-mineracao/form',
                component: GrupoMineracaoFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Grupo de Mineração'
                }
            },
            {
                path: 'grupo-mineracao/explorar/:grupoId',
                component: GrupoMineracaoExploradorComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Grupo de Mineração - Explorar'
                }
            },
            {
                path: 'modelos-mineracao/list',
                component: ModelosListComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'modelos-mineracao/form',
                component: ModelosFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'modelos-mineracao/edit',
                component: ModelosEdicaoComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'modelos-mineracao/history',
                component: ModelosHistoricoComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'modelos-mineracao/comparacao',
                component: ModelosComparacaoComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'modelos-mineracao/consultaComparacao',
                component: ModelosConsultaComparacaoComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'modelos-mineracao/teste',
                component: ModelosTesteComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'modelos-mineracao/alert',
                component: MenssegerComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Modelos de Mineração'
                }
            },
            {
                path: 'grupo-mineracao/transformar/:atributoId',
                component: GrupoMineracaoTransformacaoComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Grupo de Mineração - Transformar'
                }
            },
            {
                path: 'funcao-mineracao/list',
                component: FuncaoMineracaoListComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Função de Mineração - Consulta'
                }
            },
            {
                path: 'funcao-mineracao/form',
                component: FuncaoMineracaoFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Função de Mineração'
                }
            },
            {
                path: 'algoritmos/list',
                component: AlgoritmosListComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Algoritmos - Consulta'
                }
            },
            {
                path: 'algoritmos/form',
                component: AlgoritmosFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Algoritmos'
                }
            },
            {
                path: 'parametros/list',
                component: ParametroListComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Parametro - Consulta'
                }
            },
            {
                path: 'parametros/form',
                component: ParametroFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Parametro'
                }
            },
            {
                path: 'origem-integracao/list',
                component: OrigemListComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Origem Integração - Consulta'
                }
            },
            {
                path: 'origem-integracao/form',
                component: OrigemFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Origem Integração'
                }
            },
            {
                path: 'visibilidade/form',
                component: VisibilidadeFormComponent,
                data: {
                    title: 'S.M.A.R.T - Minerador - Visibilidade de Schemas'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MineradorRoutingModule { }
