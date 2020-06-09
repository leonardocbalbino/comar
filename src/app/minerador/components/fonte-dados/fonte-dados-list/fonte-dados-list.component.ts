import { Component, OnInit, ViewChild } from '@angular/core';
import { FonteService } from '@app/api/service/fonte.service';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-fonte-dados-list',
  templateUrl: './fonte-dados-list.component.html',
  styleUrls: ['./fonte-dados-list.component.css']
})
export class FonteDadosListComponent implements OnInit {


  fontes$: Observable<Fonte[]>;
  fontes: any[] = [];
  colunas: any;
  erro: string;
  p: number;
  @ViewChild('modalErro', { static: true }) modalErro: NgbModalRef;

  constructor(private fonteService: FonteService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.fonteService.listar('').subscribe((lista) => {
      lista.forEach((doc) => {
        this.fontes.push({
          fonteId: doc.fonteId,
          fonteAlias: doc.fonteAlias,
          fonteArquivo: doc.fonteArquivo,
          fonteNome: doc.fonteNome,
          fonteSchema: doc.fonteSchema,
          fonteTipo: doc.fonteTipo,
          fonteStatusProc: doc.fonteStatusProc,
          fonteErroCriacao: doc.fonteErroCriacao,
          fonteData: moment(doc.fonteData).format('DD/MM/YYYY'),
          fonteTotalRegistros: doc.fonteTotalRegistros,
          fonteAprendizado: doc.fonteAprendizado,
          origem: doc.origem,
          listaFonte: lista.find(model => model.fonteId === doc.fonteId)
        });

      });
    });
    this.colunas = [
      { campo: 'fonteAlias', cabecalho: 'Nome' },
      { campo: 'fonteSchema', cabecalho: 'Esquema' },
      { campo: 'fonteNome', cabecalho: 'Tabela/Visão' },
      { campo: 'fonteTipo', cabecalho: 'Tipo' },
      { campo: 'fonteData', cabecalho: 'Data', },
      { campo: 'fonteStatusProc', cabecalho: 'Status' },
    ];
  }

  deletar(event: any) {
    swal.fire({
      title: 'Aviso',
      text: 'Deseja remover a Fonte ' + event.fonteAlias + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.fonteService.deletar(event.fonteId).subscribe((res) => {
          this.fontes = [];
          swal.fire('Informação', 'Fonte excluída com sucesso', 'success').then(() => {

            this.fonteService.listar('').subscribe((lista) => {
              lista.forEach((doc) => {
                this.fontes.push({
                  fonteId: doc.fonteId,
                  fonteAlias: doc.fonteAlias,
                  fonteArquivo: doc.fonteArquivo,
                  fonteNome: doc.fonteNome,
                  fonteSchema: doc.fonteSchema,
                  fonteTipo: doc.fonteTipo,
                  fonteStatusProc: doc.fonteStatusProc,
                  fonteErroCriacao: doc.fonteErroCriacao,
                  fonteData: moment(doc.fonteData).format('DD/MM/YYYY'),
                  fonteTotalRegistros: doc.fonteTotalRegistros,
                  fonteAprendizado: doc.fonteAprendizado,
                  origem: doc.origem,
                  listaFonte: lista.find(model => model.fonteId === doc.fonteId)
                });

              });
            });
          });

        });
      }
    });

  }

  criarRegistro() {
    this.router.navigate([`/minerador/fonte-dados/form`]);
  }

  editarRegistro(obj: any) {
    this.router.navigate([`/minerador/fonte-dados/form`], { state: { data: obj } });
  }

  checkError(obj: Fonte) {
    if (obj.fonteErroCriacao) {
      return true;
    }
    return false;
  }

  exibirErro(obj: Fonte) {
    this.erro = obj.fonteErroCriacao;
    this.modalService.open(this.modalErro, { ariaLabelledBy: 'modal-basic-title' });
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

}
