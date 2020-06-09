import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { FonteService } from '@app/api/service/fonte.service';
import { AcompanhamentoClassificacaoService } from '@app/api/classificador/service/acompanhamento-class.service';
import { pt } from '@app/shared/constants';
import { Pageable } from '@app/shared/pagination/pageable';
import { AcompanhamentoClassificacaoAuto } from '@app/api/classificador/models/acompanhamento-classificacao-auto';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassificacaoRequest } from '@app/api/classificador/models/classificacao-request';
import { Hierarquia } from '@app/api/classificador/models/hierarquia';
import { HierarquiaService } from '@app/api/classificador/service/hierarquia.service';
import { ProdutoService } from '@app/api/classificador/service/produto.service';
import { Produto } from '@app/api/classificador/models/produto';

@Component({
  selector: 'app-lista-classificacao-automatica-list',
  templateUrl: './lista-classificacao-automatica-list.component.html',
  styleUrls: ['./lista-classificacao-automatica-list.component.css']
})
export class ListaClassificacaoAutomaticaListComponent implements OnInit {
  date1: Date;
  date2: Date;
  date3: Date;
  date4: Date;
  pt = pt;
  acom: Pageable<AcompanhamentoClassificacaoAuto>;
  p = 1;
  consultaForm: FormGroup;
  $hierarquias: Observable<Array<Hierarquia>>;
  $produtos: Observable<Array<Produto>>;
  loader = false;

  constructor(private acompClassAuto: AcompanhamentoClassificacaoService,
              private router: Router,
              private formBuilder: FormBuilder,
              private produtoService: ProdutoService,
              private hierarquiaService: HierarquiaService) { }

  ngOnInit() {

    this.consultaForm = this.formBuilder.group({
      cnpjEmitente: [''],
      cnpjDestinatario: [''],
      confiancaPeditivaOperadorRelacional: [''],
      confiancaPreditivaValorPercentual: [''],
      dataInicioNfe: [''],
      dataFimNfe: [''],
      dataInicioClassificacao: [''],
      dataFimClassificacao: [''],
      segmentoId: [''],
      produtoId: [''],
    });

    this.$hierarquias = this.hierarquiaService.listar();
    this.localizar();
  }

  changeSegmento() {
    if (this.consultaForm.value.segmentoId) {
      this.$produtos = this.produtoService.listarHierarquia(this.consultaForm.value.segmentoId);
    } else {
      this.$produtos = null;
    }
  }

  visualizar(obj: AcompanhamentoClassificacaoAuto) {
    this.router.navigate([`/classificador/lista-classificacao-automatica/visualizar`], { state: { data: obj } });
  }

  localizar() {
    this.loader = true;
    const acompClass: ClassificacaoRequest = this.consultaForm.value;
    this.acompClassAuto.localizar(acompClass, (this.p - 1), 10).subscribe((res) => {
      this.acom = res;
      this.loader = false;
    });
  }

  reclassificar(obj: AcompanhamentoClassificacaoAuto) {
    // tslint:disable-next-line: max-line-length
    this.router.navigate([`/classificador/classificacao-manual-item/reclassificar/class-auto/${obj.classificacaoAutoId}/nota-item/${obj.itemNota.notaItemId}`], { state: { data: obj } });
  }

  pageChanged(event) {
    this.p = event;
    this.localizar();
  }
}
