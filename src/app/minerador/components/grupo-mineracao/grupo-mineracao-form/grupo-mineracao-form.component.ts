import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Grupo } from '@app/api/model/grupo';
import { Observable } from 'rxjs';
import { FonteService } from '@app/api/service/fonte.service';
import { PastaService } from '@app/api/service/pasta.service';
import { TreeNode } from 'primeng/components/common/treenode';
import { AtributoService } from '@app/api/service/atributo.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { QueryBuilderConfig, QueryBuilderComponent, Rule, QueryBuilderClassNames } from 'angular2-query-builder';
import { RegraService } from '@app/api/service/regra.service';
import { Location } from '@angular/common';
import { GrupoService } from '@app/api/service/grupo.service';
import { Fonte } from '@app/api/model/fonte';
import { Pasta } from '@app/api/model/pasta';
import { Atributo } from '@app/api/model/atributo';
import { Regra } from '@app/api/model/regra';
import { AtributoGrupoService } from '@app/api/service/atributo-grupo.service';
import { AtributoGrupo } from '@app/api/model/models';
import sqlFormatter from 'sql-formatter';
import swal from 'sweetalert2';
import { NgbTabset, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-mineracao-form',
  templateUrl: './grupo-mineracao-form.component.html',
  styleUrls: ['./grupo-mineracao-form.component.css'],
})
export class GrupoMineracaoFormComponent implements OnInit {

  acao: string;
  grupoForm: FormGroup;
  fontes$: Observable<Fonte[]>;
  listaFontes: any[] = [];
  pastas: TreeNode[] = [];
  nodeSel: TreeNode[] = [];
  items: MenuItem[];
  grupo: Grupo;
  atributosGrupo: AtributoGrupo[];
  atributos: Atributo[];
  sql: string;
  mapaOperadores = {
    string: ['=', '<>', 'like', 'is null', 'is not null', 'not like'],
    number: ['=', '!=', '>', '>=', '<', '<=', 'is null', 'is not null', 'like', 'not like'],
    time: ['=', '!=', '>', '>=', '<', '<=', 'is null', 'is not null'],
    date: ['=', '!=', '>', '>=', '<', '<=', 'is null', 'is not null'],
    category: ['=', '!=', 'in', 'not in'],
    boolean: ['=']
  };

  @ViewChild('modalSQL', { static: true }) modalSQL: NgbModalRef;
  @ViewChild(QueryBuilderComponent, { static: true }) queryBuilder: QueryBuilderComponent;
  @ViewChild('tabs', { static: true }) tabs: NgbTabset;

  public queryCtrl: FormControl;

  selectedTab: string;

  query = {
    condition: 'and',
    rules: [],
  };

  config: QueryBuilderConfig = {
    fields: {
    }
  };

  classNames: QueryBuilderClassNames = {
    removeIcon: 'fa fa-minus',
    addIcon: 'fa fa-plus',
    arrowIcon: 'fa fa-chevron-right px-2',
    button: 'btn',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    emptyWarning: 'text-danger mx-auto',
    operatorControl: 'form-control',
    operatorControlSize: 'col-auto pr-0',
    fieldControl: 'form-control',
    fieldControlSize: 'col-auto pr-0',
    entityControl: 'form-control',
    entityControlSize: 'col-auto pr-0',
    inputControl: 'form-control',
    inputControlSize: 'col-auto'
  };

  constructor(private formBuilder: FormBuilder,
              private fonteService: FonteService,
              private atributoService: AtributoService,
              private pastaService: PastaService,
              private regraService: RegraService,
              private location: Location,
              private atributoGrupoService: AtributoGrupoService,
              private grupoService: GrupoService,
              private modalService: NgbModal,
              private router: Router) {
              this.queryCtrl = this.formBuilder.control(this.query);
              this.selectedTab = '0';
  }

  ngOnInit() {
    this.grupoForm = this.formBuilder.group({
      grupoNome: ['', Validators.required],
      grupoObjetivo: ['', Validators.required],
      fonte: ['', Validators.required],
      grupoVisibilidade: ['PRIVADO', Validators.required],
      grupoId: [null],
      grupoStatusProc: [null],
    });

    this.pastas.push({
      label: '/',
      data: null,
      expandedIcon: 'fa fa-folder-open',
      collapsedIcon: 'fa fa-folder',
      type: 'pasta',
      leaf: false,
      children: [],
    });

    this.fontes$ = this.fonteService.listar('1');

    if (history.state.data || sessionStorage.getItem('grupoMineracao')) {
      this.grupo = history.state.data ? history.state.data : JSON.parse(sessionStorage.getItem('grupoMineracao'));
      this.acao = 'Editar';
      if (sessionStorage.getItem('grupoMineracaoTab')) {
        this.selectedTab = String(sessionStorage.getItem('grupoMineracaoTab'));
      } else {
        this.selectedTab = '0';
      }
      this.grupoForm.patchValue(this.grupo);
      Promise.all([
        this.carregarPastas(this.grupo.fonte.fonteId),
        this.carregarAtributos(this.grupo.fonte.fonteId),
      ]).then(() => this.carregarAtributosGrupo());
      this.carregarRegras();
      this.nodeSel = [];
    } else {
      this.acao = 'Criar';
    }
  }

  salvarGrupo() {
    const grupo: Grupo = this.grupoForm.value;
    this.grupoService.salvar(grupo).subscribe((res) => {
      swal.fire('Informação', 'Grupo salvo com sucesso', 'success');
      this.grupo = res;
      this.grupoForm.patchValue(this.grupo);

      Promise.all([
        this.carregarPastas(this.grupo.fonte.fonteId),
        this.carregarAtributos(this.grupo.fonte.fonteId),
      ]).then(() => {
        this.carregarRegras();
        this.carregarAtributosGrupo();
      });
    });
  }

  voltar() {
    this.location.back();
  }

  get f() { return this.grupoForm.controls; }

  onChangeFonte() {
    if (this.f.fonte.value) {
      Promise.all([
        this.carregarPastas(this.f.fonte.value.fonteId),
        this.carregarAtributos(this.f.fonte.value.fonteId),
      ]).then(() => this.carregarAtributosGrupo());
    } else {
      this.carregarPastas(null);
    }
  }

  carregarPastas(fonteId: number) {
    this.pastas[0].children = [];
    if (fonteId) {
      // console.log('load pastas', fonteId);
      this.pastaService.listar(fonteId).subscribe((pastas) => {
        // console.log(pastas);
        this.pastas[0].children = pastas;
        this.pastas.forEach(node => {
          this.expandRecursive(node, true);
        });
      });
    }
  }

  carregarAtributos(fonteId: number) {
    this.config.fields = {};
    this.query.rules = [];
    this.atributos = [];
    this.atributoService.listarFontes(fonteId).subscribe((res) => {
      this.atributos = res;
      res.forEach(atributo => {
        const fields = { ...this.config.fields };

        fields[`${atributo.atributoNome}`] = {
          name: atributo.atributoAlias,
          type: this.traduzTipo(atributo.atributoTipo),
        };

        this.config = { fields };
      });
    });
  }

  carregarAtributosGrupo() {
    // console.log('load attr');
    if (this.grupo && this.grupo.grupoId) {
      this.nodeSel = [];
      this.atributoGrupoService.listarGrupo(this.grupo.grupoId).subscribe((res) => {
        this.atributosGrupo = res;
        // console.log(res);
        this.checkAtributos(this.pastas[0]);
      });
    }
  }

  carregarRegras() {
    if (this.grupo) {
      this.regraService.listarRegrasGrupo(this.grupo.grupoId).subscribe((res) => {
        if (res) {
          const query = {
            rules: [],
            condition: null,
          };
          query.condition = res.regraOperadorLogico;
          this.montaRegras(res, query);
          if (query && query.rules && query.rules.length > 0) {
            this.query.condition = query.rules[0].condition;
            this.query.rules = query.rules[0].rules;
          }
        }
      });
    }
  }

  salvarRegras() {
    if (!this.grupo || !this.grupo.grupoId) {
      swal.fire('Aviso', 'O Grupo deve ser salvo primeiramente', 'warning');
      return;
    }

    const regraRaiz: Regra = {};
    regraRaiz.regraOperadorLogico = this.query.condition;
    regraRaiz.regras = [];
    regraRaiz.grupo = this.grupo;
    regraRaiz.regraOrdem = 1;
    this.gerarRegra(this.query.rules, regraRaiz, this.query.condition, 2);
    const atributos = this.gerarAtributos();

    // console.log(atributos);

    if (atributos) {
      this.grupoService.salvarRegrasAtributoGrupos(regraRaiz, atributos, this.grupo).subscribe((res) => {
        swal.fire('Informação', 'Processamento de regras e atributos iniciado com sucesso', 'success').then(() => {
          this.router.navigate([`/minerador/grupo-mineracao/list`]);
        });
      });
    }

  }

  private gerarAtributos() {
    const atributos = [];

    // console.log('nodesel', this.nodeSel);

    if (this.nodeSel && this.nodeSel.length > 0) {
      this.nodeSel.forEach(node => {
        if (node.type === 'atributo') {
          const atributoGrupo: AtributoGrupo = {};
          atributoGrupo.atributo = node.data;
          atributoGrupo.grupo = this.grupo;
          atributos.push(atributoGrupo);
        }
      });
    } else {
      swal.fire('Aviso', 'Você deve informar no mínimo um Atributo', 'warning');
      return null;
      // this.atributosGrupo.forEach((ag) => atributos.push(ag));
    }

    return atributos;
  }

  private gerarRegra(rules: any[], regraRaiz: Regra, condition: string, ordem: number) {
    rules.forEach((rule) => {
      if (!rule.rules) {
        const regra: Regra = {};
        regra.atributo = this.buscarAtributo(rule.field);
        regra.grupo = this.grupo;
        regra.regraOperadorLogico = condition;
        regra.regraOperadorRelacional = rule.operator;
        regra.regraValorComparado = rule.value;
        regra.regraOrdem = ordem;
        regraRaiz.regras.push(regra);
        ordem++;
      } else {
        const regra: Regra = {};
        regra.regraOperadorLogico = rule.condition;
        regraRaiz.regras.push(regra);
        regra.regras = [];
        regra.regraOrdem = ordem;
        regra.grupo = this.grupo;
        ordem++;
        this.gerarRegra(rule.rules, regra, rule.condition, ordem);
      }
    });
  }

  private montaRegras(regra: Regra, query: any) {
    if (regra) {
      if (regra.regras && regra.regras.length > 0) {
        const rule = {
          condition: regra.regraOperadorLogico,
          rules: []
        };
        regra.regras.forEach((r) => this.montaRegras(r, rule));
        // console.log(rule);
        query.rules.push(rule);
      } else {
        query.rules.push({
          field: regra.atributo.atributoNome,
          operator: regra.regraOperadorRelacional,
          value: regra.regraValorComparado,
          id: regra.regraId,
        });
      }
    }
  }

  exibirSQL() {
    const regraRaiz: Regra = {};
    regraRaiz.regraOperadorLogico = this.query.condition;
    regraRaiz.regras = [];
    this.gerarRegra(this.query.rules, regraRaiz, this.query.condition, 1);
    const atributos = this.gerarAtributos();

    if (!this.grupo || !this.grupo.grupoId) {
      swal.fire('Aviso', 'Primeiramente o grupo deve ser salvo', 'warning');
      return;
    }

    if (atributos) {
      // console.log(this.query.rules);
      this.grupoService.exibirSQL(regraRaiz, atributos, this.grupo).subscribe((res) => {
        this.sql = sqlFormatter.format(res.sql);
        this.modalService.open(this.modalSQL, { ariaLabelledBy: 'modal-basic-title' });
      });
    }
  }

  private traduzTipo(tipo: string) {
    switch (tipo) {
      case 'NUMBER':
        return 'number';
      case 'VARCHAR2':
        return 'string';
      case 'DATE':
        return 'date';
    }
    return 'string';
  }

  private buscarAtributo(nome: string): Atributo {
    return this.atributos.find(atr => atr.atributoNome === nome);
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private checkAtributos(node: TreeNode) {
    if (node.children) {
      node.children.forEach(childNode => {
        this.checkAtributos(childNode);
      });
    }
    if (node.type === 'atributo') {
      if (this.atributosGrupo && this.atributosGrupo.find(atr => atr.atributo.atributoId === node.data.atributoId)) {
        this.nodeSel.push(node);
      }
    }
  }
}
