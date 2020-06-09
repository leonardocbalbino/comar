import { Component, OnInit, ViewChild } from '@angular/core';
import { FonteService } from '@app/api/service/fonte.service';
import { SchemaService } from '@app/api/service/schema.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/components/common/treenode';
import { MenuItem } from 'primeng/components/common/menuitem';
import { AtributoService } from '@app/api/service/atributo.service';
import { PastaService } from '@app/api/service/pasta.service';
import { DbaSchema, DbaTable, Fonte, DbaColumns, Pasta, Atributo } from '@app/api/model/models';
import { Location } from '@angular/common';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { timeHours } from 'd3';
import { eventNames } from 'cluster';
import { Router } from '@angular/router';


const definicao = 1;
const estrutura = 2;

@Component({
  selector: 'app-fonte-dados-form',
  templateUrl: './fonte-dados-form.component.html',
  styleUrls: ['./fonte-dados-form.component.css']
})
export class FonteDadosFormComponent implements OnInit {

  baseDados: TreeNode[] = [];
  acao: string;
  schemas$: Observable<DbaSchema[]>;
  tabelas$: Observable<DbaTable[]>;
  fonte: Fonte = {};
  state: number;
  acaoModal: string;
  closeResult: string;
  nomePasta: string;
  nomeAtributo: string;
  atributo: DbaColumns;
  pastas: TreeNode[] = [];
  items: MenuItem[];
  nodeSel: TreeNode[] = [];
  arquivo: any;
  atributosSel: TreeNode[] = [];
  selectionMode = 'multiple';

  @ViewChild('table',  { static: true}) ngSelectTable: NgSelectComponent;
  @ViewChild('modalPasta', { static: true}) modalPasta: NgbModalRef;
  @ViewChild('modalAtributo', { static: true}) modalAtributo: NgbModalRef;

  constructor(private fonteService: FonteService, private schemaService: SchemaService,
              private modalService: NgbModal,
              private pastaService: PastaService,
              private location: Location,
              private toastr: ToastrService,
              private router: Router,
              private atributoService: AtributoService) { }

  ngOnInit() {
    this.state = definicao;
    this.fonte.fonteTipo = 'INTERNO';
    if (history.state.data) {
      this.acao = 'Editar';
      this.fonte = history.state.data;
      this.onChangeEsquema();
      this.carregarTabelas();
      this.carregarPastas();
    } else {
      this.acao = 'Criar';
    }
    this.schemas$ = this.schemaService.listar();
    /*this.items = [
      {label: 'Novo', icon: 'fa fa-star', command: (event) => this.openModalPasta(this.modalPasta, 'Nova')},
      {label: 'Renomear', icon: 'fa fa-edit', command: (event) => this.openModalPasta(this.modalPasta, 'Renomear')},
      {label: 'Exluir', icon: 'fa fa-trash', command: (event) => this.excluirItem()},
    ];*/

    this.pastas.push({
      label: '/',
      data: null,
      expandedIcon: 'fa fa-folder-open',
      collapsedIcon: 'fa fa-folder',
      type: 'pasta',
      children: [],
    });

    this.baseDados.push({
      label: '/',
      data: null,
      expandedIcon: 'fa fa-folder-open',
      collapsedIcon: 'fa fa-folder',
      type: 'pasta',
      leaf: false,
      children: [],
    });
  }

  onChangeEsquema() {
    if (this.fonte.fonteSchema) {
      this.tabelas$ = this.schemaService.tabelas(this.fonte.fonteSchema);
    } else {
      this.fonte.fonteNome = null;
      this.tabelas$ = null;
      this.baseDados[0].children = [];
    }
  }

  onChangeTabela() {
    this.carregarTabelas();
  }

  setState(state: number) {
    this.state = state;
  }

  salvarFonte() {
    if (this.fonte.fonteTipo === 'INTERNO') {
      if (!this.fonte.fonteSchema) {
        swal.fire('Aviso', 'Informe o Esquema', 'warning');
        return;
      }
      if (!this.fonte.fonteNome) {
        swal.fire('Aviso', 'Informe a Tabela/Visão', 'warning');
        return;
      }
      if (!this.fonte.fonteAlias) {
        swal.fire('Aviso', 'Informe o Nome', 'warning');
        return;
      }

      this.fonteService.salvar(this.fonte).subscribe((data) => {
        this.fonte = data;
        swal.fire('Informação', 'Registro salvo com sucesso', 'success');
        this.carregarTabelas();
        this.carregarPastas();
      });

    } else {
      // fazen upload de arquivo
      if (!this.arquivo && !this.fonte.fonteId) {
        swal.fire('Erro', 'Nenhum arquivo selecionado', 'error');
        return;
      }
      if (!this.fonte.fonteAlias) {
        swal.fire('Erro', 'Informe o nome da fonte', 'error');
        return;
      }
      if (this.arquivo) {
        this.fonteService.upload(this.arquivo, this.fonte.fonteAlias).subscribe((res) => {
          swal.fire('Informação', res.msg, 'success').then(() => {
            this.router.navigate([`/minerador/fonte-dados/list`]);
          });
        });
      } else {
        this.fonteService.salvar(this.fonte).subscribe((data) => {
          this.fonte = data;
          swal.fire('Informação', 'Registro salvo com sucesso', 'success');
        });
        this.state = estrutura;
        this.carregarTabelas();
        this.carregarPastas();
      }

    }

  }

  carregarTabelas() {
    if (this.fonte.fonteNome) {
      this.schemaService.colunas(this.fonte.fonteSchema, this.fonte.fonteNome).subscribe((colunas) => {
        this.baseDados[0].children = [];
        colunas.forEach(col => {
          this.baseDados[0].children.push({
            label: col.columnName,
            data: col,
            expandedIcon: 'fa fa-columns',
            collapsedIcon: 'fa fa-columns',
            type: 'atributo',
            children: [],
          });
        });
        this.baseDados[0].expanded = true;
      });
    } else {
      this.baseDados[0].children = [];
    }
  }

  carregarPastas() {
    if (this.fonte.fonteId) {
      this.pastaService.listar(this.fonte.fonteId).subscribe((pastas) => {
        this.pastas[0].children = pastas;
        this.pastas.forEach( node => {
          this.expandRecursive(node, true);
      } );
      });
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.arquivo = event.target.files[0];
    }
  }

  openModal(acaoModal: string) {
    if (this.nodeSel && this.nodeSel.length > 1) {
      swal.fire('Aviso', 'Para executar esta ação você deve ser selecionar apenas um atributo ou uma pasta', 'warning');
      return;
    }
    if (this.nodeSel.length === 0) {
      this.nodeSel.push(this.pastas[0]);
    }
    const nodeSel: TreeNode = this.nodeSel[0];
    if (nodeSel) {
      if (nodeSel.type === 'atributo' && acaoModal !== 'Renomear') {
        swal.fire('Aviso', 'Uma pasta não pode ser criada a partir de um atributo', 'warning');
        return;
      }
    } else if (!nodeSel && acaoModal === 'Renomear') {
        swal.fire('Aviso', 'Nenhuma pasta/atributo selecionado(a) para renomear', 'warning');
        return;
    } else {
      this.nodeSel[0] = this.pastas[0];
    }
    this.acaoModal = acaoModal;

    this.nomePasta = '';
    this.nomeAtributo = '';

    let content1 = null;
    if (nodeSel.type === 'pasta') {
      if (this.acaoModal === 'Renomear') {
        this.nomePasta = nodeSel.label;
      }
      content1 = this.modalPasta;
    } else if (nodeSel.type === 'atributo') {
      this.nomeAtributo = nodeSel.label;
      content1 = this.modalAtributo;
    }
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'});
  }

  salvarPasta() {
    if (!this.nomePasta) {
      swal.fire('Erro', 'Informe o nome da pasta', 'error');
      return;
    }
    if (this.nodeSel.length > 1) {
      swal.fire('Aviso', 'Para criar uma nova pasta, selecione apenas um nó', 'warning');
      return;
    }
    let pai = null;
    const nodeSel: TreeNode = this.nodeSel[0];
    if (nodeSel && nodeSel.data) {
       pai = nodeSel.data;
    }

    let novaPasta: Pasta = {
      fonte: this.fonte,
      pastaNome: this.nomePasta,
      pastaPai: pai,
    };

    let action: Observable<Pasta>;
    if (this.acaoModal === 'Nova') {
      action = this.pastaService.salvar(novaPasta);
    } else {
      novaPasta = nodeSel.data;
      novaPasta.pastaNome = this.nomePasta;
      console.log(novaPasta);
      action = this.pastaService.alterar(novaPasta);
    }

    action.subscribe((res) => {
      if (this.acaoModal === 'Renomear') {
        nodeSel.label = this.nomePasta;
      } else {
        nodeSel.children.push({
          label: res.pastaNome,
          data: res,
          expandedIcon: 'fa fa-folder-open',
          collapsedIcon: 'fa fa-folder',
          type: 'pasta',
          children: [],
        });
        nodeSel.expanded = true;
      }
      this.nomePasta = null;
      this.modalService.dismissAll('closed');
      this.toastr.success('Pasta salva com sucesso', 'Informação');
    });
  }

  salvarAtributo() {
    if (!this.nomeAtributo) {
      swal.fire('Aviso', 'Informe o nome do atributo', 'warning');
      return;
    }

    if (this.nodeSel.length > 1) {
      swal.fire('Aviso', 'Somente um atributo pode ser salvo', 'warning');
      return;
    }

    const nodeSel = this.nodeSel[0];

    if (!this.atributo) {
      this.atributo = nodeSel.data;
    }

    let action: Observable<Atributo>;

    let atributo: Atributo = {};
    atributo.atributoAlias = this.nomeAtributo;
    atributo.atributoNome = this.atributo.columnName;
    atributo.atributoTipo = this.atributo.dataType;
    atributo.fonte = this.fonte;
    atributo.pasta = nodeSel.data;

    if (this.acaoModal === 'Novo') {
      action = this.atributoService.salvar(atributo);
    } else {
      atributo = nodeSel.data;
      atributo.atributoAlias = this.nomeAtributo;
      action = this.atributoService.alterar(atributo);
    }

    this.salvarAtributoConstruirArvore(action);
  }

  private salvarAtributoConstruirArvore(action: Observable<Atributo>) {

    action.subscribe((res) => {
      if (this.acaoModal === 'Renomear') {
        this.nodeSel[0].label = this.nomeAtributo;
      } else {
        const node = {
          label: res.atributoAlias ? res.atributoNome : res.atributoAlias,
          data: res,
          expandedIcon: 'fa fa-file-o',
          collapsedIcon: 'fa fa-file-o',
          type: 'atributo',
          children: [],
        };
        this.nodeSel[0].children.push(node);
      }
      this.toastr.success(`Atributo ${res.atributoNome} salvo com sucesso`, 'Informação');
      this.modalService.dismissAll('closed');
    }, (error) => {
      console.log(error);
      this.toastr.error(`${error.error.message}`, 'Erro');
    });
  }

  excluirItem(): void {
    if (!this.nodeSel) {
      swal.fire('Aviso', 'Selecione uma pasta ou atributo', 'warning');
      return;
    }
    if (!confirm(`Deseja realmente excluir os nós selecionados?`)) {
      return;
    }
    this.nodeSel.forEach((nodeSel) => {
      if (nodeSel.data) {
        if (nodeSel.type === 'pasta') {
          this.pastaService.remover(nodeSel.data.pastaId).subscribe((res) => {
            this.deleteNode(this.pastas, nodeSel);
            this.toastr.success(`Pasta ${nodeSel.label} removida com sucesso`, 'Informação');
          });
        } else if (nodeSel.type === 'atributo') {
          this.atributoService.remover(nodeSel.data.atributoId).subscribe((data) => {
            this.deleteNode(this.pastas, nodeSel);
            this.toastr.success(`Atributo ${nodeSel.label} removido com sucesso`, 'Informação');
          });
        }
      }
    });
  }

  onDrop(event) {

    if (event.dragNode.type === 'atributo' && event.dropNode.type === 'pasta') {
      const data: DbaColumns = event.dragNode.data;
      const atributo: Atributo = {};
      atributo.atributoAlias = data.columnName;
      atributo.atributoNome = data.columnName;
      atributo.atributoTipo = data.dataType;
      atributo.fonte = this.fonte;
      atributo.pasta = event.dropNode.data;

      this.atributoService.salvar(atributo).subscribe((res) => {
        const node = {
          label: res.atributoNome,
          data: res,
          expandedIcon: 'fa fa-file-o',
          collapsedIcon: 'fa fa-file-o',
          type: 'atributo',
          children: [],
        };
        event.dropNode.children.push(node);
        event.dropNode.expanded = true;
        this.toastr.success(`Atributo ${res.atributoNome} salvo com sucesso`);
      }, (error) => {
        console.log(error);
        this.toastr.error(`${error.error.message}`, 'Erro');
      });
    }
  }

  private deleteNode(topNode: TreeNode[], selectedNode: TreeNode) {
    const index = topNode.indexOf(selectedNode);
    if (index === -1) {
      topNode.forEach(node => {
        this.deleteNode(node.children, selectedNode);
      });
    } else {
      topNode.splice(index, 1);
    }
  }

  voltar() {
    this.location.back();
  }

  checkAll() {
    if (this.atributosSel.length === 0) {
      this.baseDados[0].children.map((v) => {
          this.atributosSel.push(v);
      });
    } else {
      this.atributosSel = [];
    }
  }

  sendChecked() {
    if (this.nodeSel.length > 1) {
      swal.fire('Aviso', 'Selecione apenas uma pasta destino', 'warning');
      return;
    }

    const nodeSel = this.nodeSel[0];

    if (!nodeSel) {
      swal.fire('Aviso', 'Selecione uma pasta destino', 'warning');
      return;
    }

    if (nodeSel.type === 'atributo') {
      swal.fire('Aviso', 'O destino não pode ser um atributo', 'warning');
      return;
    }

    if (this.atributosSel && this.atributosSel.length > 0) {
      this.atributosSel.forEach(node => {
        if (node.type === 'atributo') {
          const data: DbaColumns = node.data;

          const atributo: Atributo = {};
          atributo.atributoAlias = data.columnName;
          atributo.atributoNome = data.columnName;
          atributo.atributoTipo = data.dataType;
          atributo.fonte = this.fonte;
          atributo.pasta = nodeSel.data;

          this.salvarAtributoConstruirArvore(this.atributoService.salvar(atributo));
        }
      });
    }
  }

  nodeSelect(event) {
    event.node.expand = true;
  }

  private expandRecursive(node: TreeNode, isExpand: boolean){
    node.expanded = isExpand;
    if (node.children){
        node.children.forEach( childNode => {
            this.expandRecursive(childNode, isExpand);
        } );
    }
  }

  changeMode(mode: string) {
    this.selectionMode = mode;
  }
}
