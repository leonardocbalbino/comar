import { Component, OnInit } from '@angular/core';
import { Router, Navigation, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FonteService } from '@app/api/service/fonte.service';
import { Fonte } from '@app/api/model/fonte';
import { Observable } from 'rxjs';
import { AcompanhamentoClassificacaoAuto } from '@app/api/classificador/models/acompanhamento-classificacao-auto';
import { Produto } from '@app/api/classificador/models/produto';
import { Hierarquia } from '@app/api/classificador/models/hierarquia';
import { ProdutoService } from '@app/api/classificador/service/produto.service';
import { HierarquiaService } from '@app/api/classificador/service/hierarquia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Pageable } from '@app/shared/pagination/pageable';
import { ProdutoDTO } from '@app/api/classificador/models/produto-dto';
import { AcompanhamentoClassificacaoService } from '@app/api/classificador/service/acompanhamento-class.service';
import { ItemClassificacaoManualService } from '@app/api/classificador/service/item-classificacao-manual.service';
import ItemClassificacaoManualResponse from '@app/api/classificador/models/item-classificacao-response';

@Component({
  selector: 'app-classificacao-manual-item-reclassificar',
  templateUrl: './classificacao-manual-item-reclassificar.component.html',
  styleUrls: ['./classificacao-manual-item-reclassificar.component.css']
})
export class ClassificacaoManualItemReclassificarComponent implements OnInit {

  acompClassAuto: AcompanhamentoClassificacaoAuto;
  $hierarquias: Observable<Array<Hierarquia>>;
  produtos: Pageable<ProdutoDTO> = null;
  consultaForm: FormGroup;
  produtoId: number;
  p = 1;
  notaItemId: number;
  classAutoId: number;
  itemNota: string;

  constructor(private router: Router, private location: Location,
              private produtoService: ProdutoService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private itemClassManualService: ItemClassificacaoManualService,
              private acompClassAutoService: AcompanhamentoClassificacaoService,
              private hierarquiaService: HierarquiaService) {
  }

  ngOnInit() {
    this.acompClassAuto = history.state.data;
    this.classAutoId = Number(this.route.snapshot.paramMap.get('classificacaoAutoId'));
    this.notaItemId = Number(this.route.snapshot.paramMap.get('notaItemId'));
    this.itemNota = '';
    if (this.acompClassAuto) {
      this.itemNota = this.acompClassAuto.itemNota.itemNota;
    } else if (this.classAutoId && this.notaItemId) {
      // tslint:disable-next-line: max-line-length
      this.acompClassAutoService.localizarTodos('MANUAL', {notaItemId: this.notaItemId, classificacaoAutoId: this.classAutoId}, 0, 1).subscribe((res) => {
        this.acompClassAuto = res.content[0];
        this.itemNota = this.acompClassAuto.itemNota.itemNota;
      });
    } else {
      this.itemClassManualService.buscarPorId(Number(this.route.snapshot.paramMap.get('itemId')))
        .subscribe((res) => {
           this.classAutoId = res.classificacaoAutoId;
           this.notaItemId = res.notaItemId;
           this.itemNota = res.itemNotaFiscal;

           this.acompClassAuto = {
             confiancaPreditiva: res.confiancaPreditiva,
             numeroNota: res.numeroNota,
             dataNota: res.dataNota,
           };
           const produto: ProdutoDTO = {
             hierarquiaNome: res.segmento,
             produtoNome: res.produtoAssociado,
             descricaoTipoProduto: res.descricaoTipoProduto,
             produtoId: res.produtoId,
           };
           this.produtos = {};
           this.produtos.content = [produto];
           this.produtos.totalElements = 1;
           this.produtoId = res.produtoId;
        });
    }
    this.$hierarquias = this.hierarquiaService.listar();
    this.consultaForm = this.formBuilder.group({
      segmentoId: ['', Validators.required],
      produtoNome: ['', Validators.required],
    });
  }

  voltar() {
    this.location.back();
  }

  localizar() {
    if (!this.consultaForm.value.segmentoId && !this.consultaForm.value.produtoNome) {
      swal.fire('Aviso', 'Informe o Segmento e o Produto', 'warning');
      return;
    }
    this.produtoService.buscar((this.p - 1), 10, this.consultaForm.value.segmentoId, this.consultaForm.value.produtoNome)
    .subscribe((res) => {
      this.produtos = res;
    });
  }

  salvar() {
    this.itemClassManualService.salvar(this.notaItemId, this.classAutoId, this.produtoId).subscribe((res) => {
      swal.fire('Informação', 'Registro salvo com sucesso', 'success').then(() => {
        this.router.navigate([`/classificador/lista-classificacao-automatica/list`]);
      });
    });
  }

  pageChanged(event) {
    this.p = event;
    this.localizar();
  }
}
