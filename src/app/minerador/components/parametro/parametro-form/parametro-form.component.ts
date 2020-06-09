import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ParametroService } from '@app/api/service/parametro.service';
import { Parametro, FuncaoMineracao, FuncaoMineracaoAlgoritmo, OpcaoParametro, Algoritmo } from '@app/api/model/models';
import { Observable } from 'rxjs';
import { FuncaoMineracaoService } from '@app/api/service/funcaomineracao.service';
import { FuncaoMineracaoAlgoritmoService } from '@app/api/service/funcaomineracaoalgoritmo.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlgoritmoService } from '@app/api/service/algoritmo.service';

@Component({
  selector: 'app-parametro-form',
  templateUrl: './parametro-form.component.html',
  styleUrls: ['./parametro-form.component.css']
})
export class ParametroFormComponent implements OnInit {

  acao: string;
  parametroForm: FormGroup;
  parametro: Parametro;
  origens$: Observable<any>;
  tipos$: Observable<any>;
  funcoesMineracao$: Observable<FuncaoMineracao[]>;
  algoritmos$: Observable<Algoritmo[]>;

  globalEnabled = false;
  constanteEnabled = false;
  listaEnabled = false;

  nomeOpcaoParametro: string;
  aliasOpcaoParametro: string;
  indexOpcao = -1;

  btnAcao = 'Adicionar';

  constructor(private formBuilder: FormBuilder,
              private service: ParametroService,
              private funcaoMineracaoService: FuncaoMineracaoService,
              private toastr: ToastrService,
              private algoritmoService: AlgoritmoService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.parametroForm = this.formBuilder.group({
      parametroNome: ['', Validators.required],
      parametroAlias: ['', Validators.required],
      funcoesMineracao: [null],
      algoritmos: [null],
      parametroTipo: ['', Validators.required],
      parametroOrigem: ['', Validators.required],
      parametroMaximo: [],
      parametroMinimo: [],
      parametroObrigatorio: ['', Validators.required],
      parametroId: [''],
    });

    this.origens$ = this.service.listaParametroOrigem();
    this.tipos$ = this.service.listaParametroTipo();
    this.funcoesMineracao$ = this.funcaoMineracaoService.listar();
    this.algoritmos$ = this.algoritmoService.listarAlgoritmos();

    if (history.state.data) {
      this.acao = 'Editar';
      this.parametro = history.state.data;
      this.parametroForm.patchValue(this.parametro);
      // console.log(this.parametroForm);
      this.onChangeOrigem();
      this.onChangeTipo();
    } else {
      this.acao = 'Criar';
      this.parametro = {};
      this.parametro.opcaoParametros = [];
    }

  }

  get f() { return this.parametroForm.controls; }

  voltar() {
    this.location.back();
  }

  salvar() {
    const opcoes = this.parametro.opcaoParametros;
    this.parametro =  this.parametroForm.value;
    this.parametro.opcaoParametros = opcoes;

    if (this.f.parametroTipo.value === 'LISTA_OPCOES' && (!opcoes || opcoes.length < 1)) {
      swal.fire('Aviso', 'Parâmetro do Tipo Lista de Opções necessita ter ao menos um item na lista de opções', 'warning');
      return;
    }
    if (this.f.parametroOrigem.value !== 'GLOBAL') {
      if (!this.f.algoritmos.value && !this.f.funcoesMineracao.value) {
        swal.fire('Aviso', 'Parâmetro de Origem GLOBAL deve informar a Função Mineração e/ou Algoritmo', 'warning');
        return;
      }
    }

    if (this.f.parametroTipo.value === 'CONSTANTE') {
      if (!(this.f.parametroMaximo.value !== '' && this.f.parametroMinimo.value !== '')) {
        swal.fire('Aviso', 'Parâmetro do tipo CONSTANTE deve informar valores mínimos e máximos', 'warning');
        return;
      }
      if (this.f.parametroMinimo.value > this.f.parametroMaximo.value) {
        swal.fire('Aviso', 'O Valor mínimo não pode ser maior que o máximo', 'warning');
        return;
      }
    }

    if (this.f.parametroTipo.value === 'ATRIBUTO') {
      this.parametro.parametroMaximo = null;
      this.parametro.parametroMinimo = null;
    }

    console.log(this.parametro);

    this.service.salvar(this.parametro).subscribe((res) => {
      this.parametro = res;
      swal.fire('Informação', 'Parametro salvo com sucesso', 'success').then(() => {
        this.router.navigate([`/minerador/parametros/list`]);
      });
    });
  }

  onChangeOrigem() {
    if (this.f.parametroOrigem.value === 'GLOBAL') {
      this.f.algoritmos.disable();
      this.f.funcoesMineracao.disable();
      this.f.funcoesMineracao.setValue(null);
      this.f.algoritmos.setValue(null);
    } else {
      this.f.algoritmos.enable();
      this.f.funcoesMineracao.enable();
    }
  }

  onChangeTipo() {
    if (this.f.parametroTipo.value === 'CONSTANTE') {
      this.constanteEnabled = true;
      this.listaEnabled = false;
    } else if (this.f.parametroTipo.value === 'LISTA_OPCOES') {
      this.constanteEnabled = false;
      this.listaEnabled = true;
    } else {
      this.constanteEnabled = false;
      this.listaEnabled = false;
    }
  }

  editOpcao(opcao: OpcaoParametro, index: number) {
    this.nomeOpcaoParametro = opcao.opcaoParametroNome;
    this.aliasOpcaoParametro = opcao.opcaoParametroAlias;
    this.indexOpcao = index;
    this.btnAcao = 'Alterar';
  }

  removeOpcao(opcao: OpcaoParametro) {
    if (confirm(`Deseja excluir o registro?`)) {
      if (opcao.opcaoParametroId) {
        this.service.removerOpcaoParametro(opcao.opcaoParametroId).subscribe((res) => {
          const index = this.parametro.opcaoParametros.indexOf(opcao);
          if (index > -1) {
            this.parametro.opcaoParametros.splice(index, 1);
          }
          this.toastr.success('Parâmetro removido com sucesso', 'Informação');
        });
      } else {
        const index = this.parametro.opcaoParametros.indexOf(opcao);
        if (index > -1) {
          this.parametro.opcaoParametros.splice(index, 1);
        }
        this.toastr.success('Parâmetro removido com sucesso', 'Informação');
      }
    }
  }

  adicionaOpcao() {
    if (!this.nomeOpcaoParametro || !this.aliasOpcaoParametro) {
      swal.fire('Aviso', 'Informe os campos corretamente', 'warning');
      return;
    }

    let opcao: OpcaoParametro = {
      opcaoParametroAlias: this.aliasOpcaoParametro,
      opcaoParametroNome: this.nomeOpcaoParametro,
    };

    if (this.indexOpcao !== -1) {
      const opcaoEdit = this.parametro.opcaoParametros[this.indexOpcao];
      opcao = {...opcao, parametro: opcaoEdit.parametro, opcaoParametroId: opcaoEdit.opcaoParametroId};
      this.parametro.opcaoParametros[this.indexOpcao] = opcao;
    } else {
      this.parametro.opcaoParametros.push(opcao);
    }

    this.nomeOpcaoParametro = null;
    this.aliasOpcaoParametro = null;
    this.indexOpcao = -1;
    this.btnAcao = 'Adicionar';

  }

}
