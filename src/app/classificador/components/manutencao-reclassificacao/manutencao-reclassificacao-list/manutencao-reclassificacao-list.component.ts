import { Component, OnInit } from '@angular/core';
import { FonteService } from '@app/api/service/fonte.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { Produto } from '@app/api/classificador/models/produto';
import { ProdutoService } from '@app/api/classificador/service/produto.service';
import { pt } from '@app/shared/constants';
import { HierarquiaService } from '@app/api/classificador/service/hierarquia.service';
import { Hierarquia } from '@app/api/classificador/models/hierarquia';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemClassificacaoManualService } from '@app/api/classificador/service/item-classificacao-manual.service';
import ItemClassificacaoManualResponse from '@app/api/classificador/models/item-classificacao-response';
import { Pageable } from '@app/shared/pagination/pageable';
import { ManutencaoClassificacao } from '@app/api/classificador/models/manutencao-reclassificacao';

@Component({
  selector: 'app-manutencao-reclassificacao-list',
  templateUrl: './manutencao-reclassificacao-list.component.html',
  styleUrls: ['./manutencao-reclassificacao-list.component.css']
})
export class ManutencaoReclassificacaoListComponent implements OnInit {

  pt = pt;
  $produtos: Observable<Array<Produto>>;
  $hierarquias: Observable<Array<Hierarquia>>;
  itens: Pageable<ItemClassificacaoManualResponse>;
  p: number;

  consultaForm: FormGroup;

  constructor(private router: Router,
              private produtoService: ProdutoService,
              private formBuilder: FormBuilder,
              private hierarquiaService: HierarquiaService,
              private itemClassService: ItemClassificacaoManualService) { }

  ngOnInit() {
    this.consultaForm = this.formBuilder.group({
      cnpjEmitente: [''],
      cnpjDestinatario: [''],
      dataReclassificacao: [''],
      numeroNfe: [''],
      dataInicioNfe: [''],
      dataFimNfe: [''],
      segmentoId: [''],
      produtoId: [''],
    });

    this.$hierarquias = this.hierarquiaService.listar();

    this.localizar();
  }

  localizar() {
    const manutClass: ManutencaoClassificacao = this.consultaForm.value;
    this.itemClassService.buscar(manutClass, 0, 10).subscribe((res) => {
      this.itens = res;
    });
  }

  visualizar(data: ItemClassificacaoManualResponse) {
    this.router.navigate([`/classificador/manutencao-reclassificacao/visualizar`], { state: { data } });
  }

  editar(data: ItemClassificacaoManualResponse) {
    this.router.navigate([`/classificador/classificacao-manual-item/reclassificar/${data.itemClassificacaoManualId}`]);
  }

  changeSegmento() {
    if (this.consultaForm.value.segmentoId) {
      this.$produtos = this.produtoService.listarHierarquia(this.consultaForm.value.segmentoId);
    } else {
      this.$produtos = null;
    }
  }

}
