import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Cadastro',
    icon: 'fa fa-user-plus',
    class: 'has-arrow',
    ddclass: 'single-dd',
    extralink: false,
    submenu: [
      // {
      //   path: '/minerador/fonte-dados/list',
      //   title: 'Fonte de Dados',
      //   icon: 'fa fa-database',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/minerador/grupo-mineracao/list',
      //   title: 'Grupos de Mineração',
      //   icon: 'fa fa-users',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/minerador/modelos-mineracao/list',
      //   title: 'Modelos de Mineração',
      //   icon: 'fa fa-table',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/minerador/funcao-mineracao/list',
      //   title: 'Funções de Mineração',
      //   icon: 'fa fa-diamond',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/minerador/parametros/list',
      //   title: 'Parâmetros de Configuração',
      //   icon: 'fa fa-cogs',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/minerador/origem-integracao/list',
      //   title: 'Origem de Integração',
      //   icon: 'fa fa-star-o',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/minerador/algoritmos/list',
      //   title: 'Algoritmos de Mineração',
      //   icon: 'fa fa-sitemap',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/minerador/visibilidade/form',
      //   title: 'Visibilidade de Schemas',
      //   icon: 'fa fa-binoculars',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
    ]
  },
  {
    path: '',
    title: 'Treinamento',
    icon: 'fa fa-users',
    class: 'has-arrow',
    ddclass: 'single-dd',
    extralink: false,
    submenu: [
      // {
      //   path: '/classificador/configuracao-atributos-regras-manuais/list',
      //   title: 'Configuração dos Atributos das Regras de Usuário',
      //   icon: 'fas fa-sliders-h',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/mapeamento-list',
      //   title: 'Mapeamento dos Atributos do Modelo/Agente de Classificação',
      //   icon: 'far fa-map',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/regras-manuais-classificacao/list',
      //   title: 'Configuração de Regras de Usuário para Classificação',
      //   icon: 'ti-ruler-pencil',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/selecao-modelos-classificacao-automatica/list',
      //   title: 'Seleção de Modelos de Classificação Automática',
      //   icon: 'ti-check-box',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/lista-classificacao-automatica/list',
      //   title: 'Acompanhamento da Classificação Automática',
      //   icon: 'ti-list',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/classificacao-manual-item/list',
      //   title: 'Classificação Manual',
      //   icon: 'ti-blackboard',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/manutencao-reclassificacao/list',
      //   title: 'Manutenção da Reclassificação',
      //   icon: 'ti-panel',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/configuracao-portaria/list',
      //   title: 'Configuração da Portaria',
      //   icon: 'fas fa-gavel',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/configuracao-manual-catalogo-produto/config-catalogo',
      //   title: 'Configuração Manual de Produtos do Catálogo',
      //   icon: 'fa fa-sliders-h',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/configuracao-itens-catalogo/config-item-catalogo',
      //   title: 'Configuração Manual de Catálogo',
      //   icon: 'fa fa-cogs',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // }, {
      //   path: '/classificador/importacao-itens-catalogo',
      //   title: 'Importação de Itens do Catálogo',
      //   icon: 'fa fa-upload',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/analise-catalogo-automatico/list',
      //   title: 'Análise de Catálogo Automático',
      //   icon: 'ti-stats-up',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/selecao-modelos-catalogo-automatico-list',
      //   title: 'Seleção de Modelos de Catálogo Automático',
      //   icon: 'fas fa-hand-pointer',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/classificador/painel-estatisticas-classificador',
      //   title: 'Painel Estatístico',
      //   icon: 'fas fa-chart-pie',
      //   class: '',
      //   ddclass: 'single-dd',
      //   extralink: false,
      //   submenu: []
      // },
    ]
  },
  {
    path: '',
    title: 'Avaliação',
    icon: 'fa fa-pencil',
    class: 'has-arrow',
    ddclass: 'two-column',
    extralink: false,
    submenu: [
    ]
  },
  {
    path: '',
    title: 'Dashboard',
    icon: 'fa fa-line-chart',
    class: 'has-arrow',
    ddclass: 'single-dd',
    extralink: false,
    submenu: [
    ]
  },
  // {
  //   path: '',
  //   title: 'Configurações',
  //   icon: 'fa fa-gear',
  //   class: 'has-arrow',
  //   ddclass: 'single-dd',
  //   extralink: false,
  //   submenu: [
  //   ]
  // },
];
