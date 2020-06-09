import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupo } from '@app/api/model/grupo';
import { GrupoService } from '@app/api/service/grupo.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-mineracao-list',
  templateUrl: './grupo-mineracao-list.component.html',
  styleUrls: ['./grupo-mineracao-list.component.css']
})
export class GrupoMineracaoListComponent implements OnInit {

  grupos$: Observable<Grupo[]>;
  colunas: any;
  erro: string;
  @ViewChild('modalErro', { static: true}) modalErro: NgbModalRef;

  constructor(private grupoService: GrupoService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'grupoNome', cabecalho: 'Nome' },
      { campo: 'fonte.fonteAlias', cabecalho: 'Fonte de Dados' },
      { campo: 'grupoObjetivo', cabecalho: 'Objetivo' },
      { campo: 'grupoVisibilidade', cabecalho: 'Visibilidade' },
      { campo: 'grupoStatusProc', cabecalho: 'Status', },
      { campo: 'grupoData', cabecalho: 'Data Criação', date: true },
    ];
    this.grupos$ = this.grupoService.listar('');
  }

  explorar(obj: Grupo) {
    if (obj) {
      sessionStorage.setItem('grupoMineracao', JSON.stringify(obj));
      this.router.navigate([`/minerador/grupo-mineracao/explorar/`, obj.grupoId]);
    } else {
      sessionStorage.removeItem('grupoMineracao');
    }
  }

  editarRegistro(obj: any) {
    sessionStorage.removeItem('grupoMineracao');
    sessionStorage.removeItem('grupoMineracaoTab');
    this.router.navigate([`/minerador/grupo-mineracao/form`], { state: { data: obj } });
  }

  deletarRegistro(obj: any) {
    if (confirm('Deseja realmente excluir o registro?')) {
      this.grupoService.deletar(obj.grupoId).subscribe((res) => {
        swal.fire('Informação', 'Registro excluído com sucesso', 'success');
        this.grupos$ = this.grupoService.listar('');
      });
    }
  }

  criarRegistro() {
    sessionStorage.removeItem('grupoMineracao');
    sessionStorage.removeItem('grupoMineracaoTab');
    this.router.navigate([`/minerador/grupo-mineracao/form`]);
  }

  namespace(object, path: string, padrao: any) {
    if (padrao !== undefined) {
      return padrao;
    }
    if (path.indexOf('.') === -1) {
      return object[path];
    }
    const result = path.split('.').reduce((value, index) => {
      return value[index];
    }, object);
    return result;
  }

  checkProc(obj: Grupo) {
    if (obj.grupoStatusProc === 'CONCLUIDO') {
      return true;
    }
    return false;
  }

  checkError(obj: Grupo) {
    if (obj.grupoStatusProc === 'ERRO') {
      return true;
    }
    return false;
  }

  exibirErro(obj: Grupo) {
    this.erro = obj.grupoErroCriacao;
    this.modalService.open(this.modalErro, {ariaLabelledBy: 'modal-basic-title'});
  }
}
