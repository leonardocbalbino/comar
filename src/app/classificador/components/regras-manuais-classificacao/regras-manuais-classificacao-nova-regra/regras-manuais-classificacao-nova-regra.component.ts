import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { RegraManualService } from '@app/api/classificador/service/regra-manual.service';
import { RegraProdutoService } from '@app/api/classificador/service/regra-produto.service';
import { RegraDetalheService } from '@app/api/classificador/service/regra-detalhe.service';
import { HierarquiaService } from '@app/api/classificador/service/hierarquia.service';
import { ProdutoService } from '@app/api/classificador/service/produto.service';
import { Observable } from 'rxjs';
import { RegraManualDTO } from '@app/api/classificador/models/regra-manual-dto';
import { RegraProdutoDTO } from '@app/api/classificador/models/regra-produto-dto';
import { RegrasDetalheDTO } from '@app/api/classificador/models/regras-detalhe-dto';
import { Hierarquia } from '@app/api/classificador/models/hierarquia';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Pageable } from '@app/shared/pagination/pageable';

@Component({
  selector: 'app-regras-manuais-classificacao-nova-regra',
  templateUrl: './regras-manuais-classificacao-nova-regra.component.html',
  styleUrls: ['./regras-manuais-classificacao-nova-regra.component.css'],
})
export class RegrasManuaisClassificacaoNovaRegraComponent implements OnInit {

  segmentos$: Observable<Array<Hierarquia>>;
  segmentoSelecionado: Hierarquia;
  display: boolean = false;
  state: string = "subTab1";
  regraManual$: Observable<RegraManualDTO[]>;
  colunasRegra: any;
  colProd: any;
  btnAdd: string = "Adicionar";
  date1: string;
  date2: string;
  dt1: Date;
  dt2: Date;
  pt: any;
  aplicacao: any;
  aplicacaoSelected: string = '';
  regraManualAtual: any = {};
  produtoSelecionado: any;
  produtosSelecionados: Array<any> = [];
  regraProduto: Array<any> = [];
  regraProdutoSelecionada: RegraProdutoDTO
  regraDetalhe: Array<RegrasDetalheDTO> = [];
  isShowingRegras: boolean = false;
  produtos: Pageable<any>;
  @ViewChild('dataTable', { static: true }) dataTable: any;
  descProd: string = ""
  produtoTemp: any = null;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private hierarquiaService: HierarquiaService,
    private regraManualService: RegraManualService,
    private regraProdutoService: RegraProdutoService,
    private regrasDetalheService: RegraDetalheService,
    private location: Location) { }

  ngOnInit() {
    this.colunasRegra = [
      { campo: 'produtoNome', cabecalho: 'Nome' },
      { campo: 'produtoTipoProduto', cabecalho: 'Tipo' },
      { campo: 'produtoValorMedio', cabecalho: 'Valor médio' },
      { campo: 'produtoFatorAceitacao', cabecalho: 'Fator de aceitação' },
    ];
    this.colProd = [
      { campo: 'produtoNome', cabecalho: 'Descrição do produto' }
    ];

    this.segmentos$ = this.hierarquiaService.listar()

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };

    this.aplicacao = [
      "Preceder sobre as Regras do Modelo de Mineração",
      "Aplicar sobre os Itens com Classificação Automática Não Aceita"
    ];
  }

  localizarProduto(){
    if(this.segmentoSelecionado){
      this.produtoService.buscar(0, 5, this.segmentoSelecionado.hierarquiaId, this.descProd).subscribe( (res)=>{
        this.produtos = res
      })
    }else{
      swal.fire('Aviso', 'Escolha um segmento!', 'warning');
    }
  }

  produtoTemporario(event){
    // console.log(event)
    this.produtoTemp = event
  }

  escolherProd(){
    if(!this.produtoTemp){
      swal.fire('Aviso', 'Escolha um produto!', 'warning');
      return
    }
    this.produtoSelecionado = this.produtoTemp
    // console.log(this.produtoSelecionado)
    this.display = !this.display
  }

  cancelarEscolherProd(event){
    this.produtoSelecionado = null
    this.segmentoSelecionado = null
    this.descProd = ""
    this.produtoService.buscar(0, 5, null, null).subscribe( (res)=>{
      this.produtos = res
    })
    this.produtoTemp = null
    event.selected = null
    this.display = !this.display
  }

  changeDate1(event) {
    this.date1 = moment(event).format("DD/MM/YYYY")

    let d = new Date()
    d.setDate(event.getDate() + 1)

    this.dt2 = d
  }

  changeDate2(event) {
    this.date2 = moment(event).format("DD/MM/YYYY")

    let d = new Date()
    d.setDate(event.getDate() - 1)

    this.dt1 = d
  }

  voltar() {
    if (this.state === 'subTab1') {
      this.location.back()
    } else {
      this.state = "subTab1"
    }
  }

  proximo() {
    if (!this.regraManualAtual.regraManualNome) {
      swal.fire('Aviso', 'Informe uma descrição!', 'warning');
      return
    }
    if (!this.date1) {
      swal.fire('Aviso', 'Informe a data de inicio da vigência!', 'warning');
      return
    }
    if (!this.date2) {
      swal.fire('Aviso', 'Informe a data de fim da vigência!', 'warning');
      return
    }
    if (!this.regraManualAtual.regraManualJustificativa) {
      swal.fire('Aviso', 'Informe uma justificativa!', 'warning');
      return
    }
    if (!this.aplicacaoSelected) {
      swal.fire('Aviso', 'Escolha uma aplicação!', 'warning');
      return
    }

    this.state = "subTab2"

    switch (this.aplicacaoSelected) {
      case "Preceder sobre as Regras do Modelo de Mineração":
        this.regraManualAtual.regraManualAplicacao = 1;
        break;
      case "Aplicar sobre os Itens com Classificação Automática Não Aceita":
        this.regraManualAtual.regraManualAplicacao = 2;
        break;
    }

    this.regraManualAtual.regraManualFimVigencia = moment(this.date2, "DD/MM/YYYY").format("YYYY-MM-DD")
    this.regraManualAtual.regraManualInicioVigencia = moment(this.date1, "DD/MM/YYYY").format("YYYY-MM-DD")
    this.regraManualAtual.regraProdutos = []
  }

  chooseProduto(){
    this.display = !this.display
  }

  addProduto(event) {
    console.log(this.produtoTemp)
    console.log(this.produtoSelecionado)
    if (!this.produtoSelecionado) {
      swal.fire('Aviso', 'Selecione um produto para adicionar!', 'warning');
      return
    }
    if (this.produtosSelecionados.some( (res)=>( res.produtoId == this.produtoSelecionado.produtoId ))) {
      swal.fire('Aviso', 'Produto já foi adicionado!', 'warning');
    } else {
      this.produtosSelecionados = [...this.produtosSelecionados, this.produtoSelecionado]
      this.regraManualAtual.regraProdutos.push({
        produto: {
          produtoId: this.produtoSelecionado.produtoId,
          produtoNome: this.produtoSelecionado.produtoNome,
          produtoValorMinimo: this.produtoSelecionado.produtoValorMinimo,
          produtoValorMedio: this.produtoSelecionado.produtoValorMedio,
          produtoValorMaximo: this.produtoSelecionado.produtoValorMaximo,
          produtoFatorAceitacao: this.produtoSelecionado.produtoFatorAceitacao
        },
        regrasDetalhes: []
      })
    }

    this.produtoSelecionado = null
    this.segmentoSelecionado = null
    this.descProd = ""
    this.produtoService.buscar(0, 5, null, null).subscribe( (res)=>{
      this.produtos = res
    })
    this.produtoTemp = null
    event.selected = null
  }

  addRegra(event) {
    this.regraManualAtual.regraProdutos.map((res, index) => {
      if (res.produto.produtoId == this.regraProdutoSelecionada.produto.produtoId) {
        this.regraManualAtual.regraProdutos[index].regrasDetalhes = event
        return
      }
    })
  }

  salvarRegra() {
    if (!this.regraManualAtual.regraManualNome) {
      swal.fire('Aviso', 'Informe uma descrição!', 'warning');
      return
    }
    if (!this.date1) {
      swal.fire('Aviso', 'Informe a data de inicio da vigência!', 'warning');
      return
    }
    if (!this.date2) {
      swal.fire('Aviso', 'Informe a data de fim da vigência!', 'warning');
      return
    }
    if (!this.regraManualAtual.regraManualJustificativa) {
      swal.fire('Aviso', 'Informe uma justificativa!', 'warning');
      return
    }
    if (!this.aplicacaoSelected) {
      swal.fire('Aviso', 'Escolha uma aplicação!', 'warning');
      return
    }

    switch (this.aplicacaoSelected) {
      case "Preceder sobre as Regras do Modelo de Mineração":
        this.regraManualAtual.regraManualAplicacao = 1;
        break;
      case "Aplicar sobre os Itens com Classificação Automática Não Aceita":
        this.regraManualAtual.regraManualAplicacao = 2;
        break;
    }
    this.regraManualAtual.regraManualFimVigencia = moment(this.date2, "DD/MM/YYYY").format("YYYY-MM-DD")
    this.regraManualAtual.regraManualInicioVigencia = moment(this.date1, "DD/MM/YYYY").format("YYYY-MM-DD")

    const swalCustom = swal.mixin({
      customClass: {
        cancelButton: 'btn-dng'
      },
      buttonsStyling: true
    })

    let rm: RegraManualDTO = {
      regraManualAplicacao: this.regraManualAtual.regraManualAplicacao,
      regraManualFimVigencia: this.regraManualAtual.regraManualFimVigencia,
      regraManualInicioVigencia: this.regraManualAtual.regraManualInicioVigencia,
      regraManualJustificativa: this.regraManualAtual.regraManualJustificativa,
      regraManualNome: this.regraManualAtual.regraManualNome
    }
    this.regraManualService.salvar(rm).subscribe( (res) => {
      this.regraManualAtual.regraManualId = res.regraManualId
      this.regraManualAtual.regraManualDataCadastro = res.regraManualDataCadastro
      this.regraManualAtual.regraManualInicioVigencia = res.regraManualInicioVigencia
      this.regraManualAtual.regraManualFimVigencia = res.regraManualFimVigencia
      this.regraManualAtual.regraProdutos.map((r, index) => {
        this.regraManualAtual.regraProdutos[index].regraManual = { regraManualId: res.regraManualId }
      })
      this.regraProduto = this.regraManualAtual.regraProdutos
      if (this.regraManualAtual.regraProdutos) {
        this.regraProdutoService.salvar_todos(this.regraProduto).subscribe((res) => {
          res.map((r, index) => {
            this.regraProduto[index].regraProdutoId = r.regraProdutoId
            this.regraProduto[index].produto = r.produto
          })
          this.regraManualAtual.regraProdutos = this.regraProduto
          console.log(this.regraProduto)
          this.regraProduto.map( (prod, index) => {
            if (prod.regrasDetalhes) {
              prod.regrasDetalhes.map((det, i) => {
                this.regraProduto[index].regrasDetalhes[i].regraProduto = { regraProdutoId: this.regraProduto[index].regraProdutoId }
              })
              this.regrasDetalheService.salvar_todos(this.regraProduto[index].regrasDetalhes).subscribe((detail) => {
                this.regraProduto[index].regrasDetalhes = detail
                this.regraManualAtual.regraProdutos = this.regraProduto
              })
            }

            if(index === this.regraProduto.length - 1){
              swalCustom.fire({
                title: 'Regra manual salva com sucesso!',
                icon: 'success',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Pré-visualizar regra',
                cancelButtonText: 'Nova regra'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['/classificador/regras-manuais-classificacao/visualizar'], { state: { data: this.regraManualAtual } });
                } else {
                  this.router.navigate(['/classificador/regras-manuais-classificacao/cadastrar-editar']);
                }
              })
              console.log("final: regraproduto")
              console.log(this.regraManualAtual)
            }
          })
        })
      }else{
        swalCustom.fire({
          title: 'Regra manual salva com sucesso!',
          icon: 'success',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Pré-visualizar regra',
          cancelButtonText: 'Nova regra'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/classificador/regras-manuais-classificacao/visualizar'], { state: { data: this.regraManualAtual } });
          } else {
            this.router.navigate(['/classificador/regras-manuais-classificacao/cadastrar-editar']);
          }
        })
        console.log("final: regramanual")
        console.log(this.regraManualAtual)
      }
    })
    console.log(this.regraManualAtual)
  }

  selectedRowRadio(event: any) {
    this.isShowingRegras = true;
    this.regraManualAtual.regraProdutos.map((res) => {
      if (res.produto.produtoId == event.produtoId) {
        this.regraProduto = this.regraManualAtual.regraProdutos
        this.regraProdutoSelecionada = res
        this.regraDetalhe = res.regrasDetalhes

        return
      }

    })
  }

  editarDetalhe(event) {
    this.regraManualAtual.regraProdutos.map((res, index) => {
      if (res.produto.produtoId == this.regraProdutoSelecionada.produto.produtoId) {
        this.regraManualAtual.regraProdutos[index].regrasDetalhes = event
        return
      }
    })
  }

  removeProd(event) {
    this.regraManualAtual.regraProdutos.map((res, index) => {
      if (res.produto.produtoId == event.produtoId) {
        if (!this.regraProdutoSelecionada) {
          this.isShowingRegras = false;
        } else {
          if (this.regraManualAtual.regraProdutos[index].produto.produtoId == this.regraProdutoSelecionada.produto.produtoId) {
            this.isShowingRegras = false;
          } else {
            this.isShowingRegras = true;
          }
        }
        this.regraManualAtual.regraProdutos.splice(index, 1)
        if (this.regraManualAtual.regraProdutos.length == 0) {
          this.isShowingRegras = false;
        }
        this.regraProduto = this.regraManualAtual.regraProdutos

        return
      }
    })
  }

  removeRegra(event) {
    this.regraProduto[this.regraProduto.indexOf(this.regraProdutoSelecionada)].regrasDetalhes = event
    this.regraManualAtual.regraProdutos = this.regraProduto
  }

  filterResultsSingle(event) {

  }
}
