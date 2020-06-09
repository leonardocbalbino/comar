import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '@app/shared/layouts/full.component';

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
import { ConfigItemCatalogoComponent } from './components/configuracao-item-catalogo/config-item-catalogo/config-item-catalogo.component';
import { ImportacaoItensCatalogoComponent } from './components/importacao-itens-catalogo/importacao-itens-catalogo.component';
import { SelecaoModelosCatalogoAutomaticoListComponent } from './components/selecao-modelos-catalogo-automatico/selecao-modelos-catalogo-automatico-list/selecao-modelos-catalogo-automatico-list.component';
import { SelecaoModelosCatalogoAutomaticoVisualizarComponent } from './components/selecao-modelos-catalogo-automatico/selecao-modelos-catalogo-automatico-visualizar/selecao-modelos-catalogo-automatico-visualizar.component';
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

const routes: Routes = [
  {
    path: '', component: FullComponent,
    children: [
      { path: '', component: MainClassificadorComponent },
      {
        path: 'configuracao-atributos-regras-manuais/list',
        component: ConfiguracaoAtributosRegrasManuaisListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Configurações dos Atributos das Regras Manuais'
        }
      },
      {
        path: 'regras-manuais-classificacao/list',
        component: RegrasManuaisClassificacaoListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Configurações das Regras Manuais de Classificação'
        }
      },
      {
        path: 'regras-manuais-classificacao/cadastrar-editar',
        component: RegrasManuaisClassificacaoNovaRegraComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Configurações das Regras Manuais de Classificação - Cadastro/Edição'
        }
      },
      {
        path: 'regras-manuais-classificacao/visualizar',
        component: RegrasManuaisClassificacaoVisualizarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Detalhe da Regra Manual de Classificação'
        }
      },
      {
        path: 'selecao-modelos-classificacao-automatica/list',
        component: SelecaoModelosClassificacaoAutomaticaListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Seleção de Modelos de Classificação Automática'
        }
      },
      {
        path: 'selecao-modelos-classificacao-automatica/visualizar',
        component: SelecaoModelosClassificacaoAutomaticaVisualizarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Seleção de Modelos de Classificação Automática - Visualização'
        }
      },
      {
        path: 'classificacao-manual-item/list',
        component: ClassificacaoManualItemListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Classificação Manual'
        }
      },
      {
        path: 'classificacao-manual-item/cadastrar',
        component: ClassificacaoManualItemCadastrarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Classificação Manual - Cadastro'
        }
      },
      {
        path: 'classificacao-manual-item/visualizar',
        component: ClassificacaoManualItemVisualizarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Classificação Manual - Detalhe Item Associado'
        }
      },
      {
        path: 'classificacao-manual-item/reclassificar/class-auto/:classificacaoAutoId/nota-item/:notaItemId',
        component: ClassificacaoManualItemReclassificarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Classificação Manual de Item'
        }
      },
      {
        path: 'classificacao-manual-item/reclassificar/:itemId',
        component: ClassificacaoManualItemReclassificarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Classificação Manual de Item'
        }
      },
      {
        path: 'analise-catalogo-automatico/list',
        component: AnaliseCatalogoAutomaticoTreeListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Análise de Catálogo Automático'
        }
      },
      {
        path: 'analise-catalogo-automatico/cadastrar',
        component: AnaliseCatalogoAutomaticoCadastrarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Análise de Catálogo Automático'
        }
      },
      {
        path: 'configuracao-manual-catalogo-produto/config-catalogo',
        component: ConfigCatalogoComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Configuração Manual de Produtos do Catálogo'
        }
      },
      {
        path: 'configuracao-itens-catalogo/config-item-catalogo',
        component: ConfigItemCatalogoComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Configuração Manual de Catálogo'
        }
      },
      {
        path: 'importacao-itens-catalogo',
        component: ImportacaoItensCatalogoComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Importação de Itens de Catálogo'
        }
      },
      {
        path: 'selecao-modelos-catalogo-automatico-list',
        component: SelecaoModelosCatalogoAutomaticoListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Seleção de Modelos de Catálogo Automático'
        }
      },
      {
        path: 'selecao-modelos-catalogo-automatico-visualizacao',
        component: SelecaoModelosCatalogoAutomaticoVisualizarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Seleção de Modelos de Catálogo Automático - Visualização'
        }
      },
      {
        path: 'painel-estatisticas-classificador',
        component: PainelEstatisticasClassificadorComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Painel de Estatísticas do Classificador'
        }
      },
      {
        path: 'classificacao-manual-item/selecionados/:classificacaoAutoId',
        component: ClassificacaoManualItemSelecionadosComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Detalhe da Relação dos Itens Associados'
        }
      },
      {
        path: 'lista-classificacao-automatica/list',
        component: ListaClassificacaoAutomaticaListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Acompanhamento da Classificação Automática'
        }
      },
      {
        path: 'lista-classificacao-automatica/visualizar',
        component: ListaClassificacaoAutomaticaVisualizarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Acompanhamento da Classificação Automática'
        }
      },
      {
        path: 'manutencao-reclassificacao/list',
        component: ManutencaoReclassificacaoListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Manutenção de Reclassificação'
        }
      },
      {
        path: 'manutencao-reclassificacao/visualizar',
        component: ManutencaoReclassificacaoVisualizarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Manutenção de Reclassificação'
        }
      },
      {
        path: 'configuracao-portaria/list',
        component: PortariaListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Configuração da Portaria'
        }
      },
      {
        path: 'configuracao-portaria/edicao',
        component: PortariaCadastroComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Configuração da Portaria'
        }
      },
      {
        path: 'detalhe-catalogo/detalhar',
        component: DetalheCatalogoComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Detalhamento do Produto do Catálogo'
        }
      },
      {
        path: 'mapeamento-list',
        component: MapeamentoListComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Detalhamento do Produto do Catálogo'
        }
      },
      {
        // path: 'mapeamento-visualizar/:modeloId',
        path: 'mapeamento-visualizar',
        component: MapeamentoVisualizarComponent,
        data: {
          title: 'S.M.A.R.T - Classificador - Detalhamento do Produto do Catálogo'
        }
      },
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ClassificadorRoutingModule { }
