import { Component, OnInit } from '@angular/core';
import { pt } from '@app/shared/constants';
import { Router } from '@angular/router';
import { ProdutoClassAutoService } from '@app/api/classificador/service/produto-class-auto.service';
import { ClassificacaoManual } from '@app/api/classificador/models/classificacao-manual';
import { Pageable } from '@app/shared/pagination/pageable';
import { Produto } from '@app/api/classificador/models/produto';
import { Observable } from 'rxjs';
import { Hierarquia } from '@app/api/classificador/models/hierarquia';
import { HierarquiaService } from '@app/api/classificador/service/hierarquia.service';
import { ProdutoService } from '@app/api/classificador/service/produto.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassificacaoManualDetalhe } from '@app/api/classificador/models/classificacao-manual-detalhe';
import { ClassificacaoRequest } from '@app/api/classificador/models/classificacao-request';

@Component({
  selector: 'app-classificacao-manual-item-list',
  templateUrl: './classificacao-manual-item-list.component.html',
  styleUrls: ['./classificacao-manual-item-list.component.css'],
})
export class ClassificacaoManualItemListComponent implements OnInit {
  pt = pt;
  prodClassManual: Pageable<ClassificacaoManual>;
  p = 1;
  pDet = 1;
  $produtos: Observable<Array<Produto>>;
  $hierarquias: Observable<Array<Hierarquia>>;
  consultaForm: FormGroup;
  classItens: Array<Pageable<ClassificacaoManualDetalhe>> = [];
  produtoId: number;

  constructor(private router: Router,
              private produtoService: ProdutoService,
              private hierarquiaService: HierarquiaService,
              private formBuilder: FormBuilder,
              private prodClassAutoService: ProdutoClassAutoService) { }

  ngOnInit() {

    this.$hierarquias = this.hierarquiaService.listar();

    this.consultaForm = this.formBuilder.group({
      cnpjEmitente: [''],
      cnpjDestinatario: [''],
      confiancaPeditivaOperadorRelacional: [''],
      confiancaPreditivaValorPercentual: [''],
      dataInicioNfe: [''],
      dataFimNfe: [''],
      chaveNota: [''],
      fatorAceitacaoOperadorRelacional: [''],
      fatorAceitacaoValorPercentual: [''],
      segmentoId: [''],
      produtoId: [''],
      numeroNota: [''],
    });

    this.listar();
  }

  listar() {
    const request: ClassificacaoRequest = this.consultaForm.value;
    this.prodClassAutoService.listar(request, (this.p - 1), 10).subscribe((res) => {
      this.prodClassManual = res;
    });
  }

  criar() {
    this.router.navigate(['classificador/classificacao-manual-item/cadastrar']);
  }

  aceitar(item: any = null) {
    this.router.navigate(['classificador/classificacao-manual-item/selecionados']);
  }

  detalhar(item: ClassificacaoManualDetalhe) {
    this.router.navigate([`classificador/classificacao-manual-item/selecionados/${item.classificacaoAutoId}`]);
  }

  reclassificar(obj: ClassificacaoManualDetalhe) {
    console.log(obj);
     // tslint:disable-next-line: max-line-length
    this.router.navigate([`/classificador/classificacao-manual-item/reclassificar/class-auto/${obj.classificacaoAutoId}/nota-item/${obj.notaItemId}`]);
  }

  pageChanged(event) {
    this.p = event;
    this.listar();
  }

  pageChangedItem(event) {
    this.pDet = event;
    this.prodClassAutoService.detalhar(this.produtoId, (this.pDet - 1), 10).subscribe((res) => {
      this.classItens[this.produtoId] = res;
    });
  }

  expand(event) {
    this.produtoId = event.data.produtoId;
    this.prodClassAutoService.detalhar(this.produtoId, (this.pDet - 1), 10).subscribe((res) => {
      this.classItens[this.produtoId] = res;
    });
  }

  changeSegmento() {
    if (this.consultaForm.value.segmentoId) {
      this.$produtos = this.produtoService.listarHierarquia(this.consultaForm.value.segmentoId);
    } else {
      this.$produtos = null;
    }
  }

  localizar() {
    this.listar();
  }
}
