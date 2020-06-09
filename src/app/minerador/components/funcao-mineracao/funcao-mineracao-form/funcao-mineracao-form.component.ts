import { Component, OnInit } from '@angular/core';
import { FuncaoMineracao, Algoritmo, FuncaoMineracaoAlgoritmo } from '@app/api/model/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuncaoMineracaoService } from '@app/api/service/funcaomineracao.service';
import { AlgoritmoService } from '@app/api/service/algoritmo.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FuncaoMineracaoAlgoritmoService } from '@app/api/service/funcaomineracaoalgoritmo.service';

@Component({
  selector: 'app-funcao-mineracao-form',
  templateUrl: './funcao-mineracao-form.component.html',
  styleUrls: ['./funcao-mineracao-form.component.css']
})
export class FuncaoMineracaoFormComponent implements OnInit {

  acao: string;
  funcaoMineracao: FuncaoMineracao;
  funcaoMineracaoForm: FormGroup;
  algoritmos$: Observable<Algoritmo[]>;
  algoritmosSel: Set<FuncaoMineracaoAlgoritmo> = new Set();

  constructor(private formBuilder: FormBuilder,
              private funcaoMineracaoService: FuncaoMineracaoService,
              private location: Location,
              private funcaoMineracaoAlgoritmoService: FuncaoMineracaoAlgoritmoService,
              private router: Router,
              private algoritmoService: AlgoritmoService) { }

  ngOnInit() {

    this.funcaoMineracaoForm = this.formBuilder.group({
      algoritmo: [''],
      funcaoMineracaoNomeInterno: ['', Validators.required],
      funcaoMineracaoAlias: ['', Validators.required],
      funcaoMineracaoSeparaDados: ['', Validators.required],
      funcaoMineracaoId: [''],
    });

    if (history.state.data) {
      this.acao = 'Editar';
      this.funcaoMineracao = history.state.data;
      this.funcaoMineracao.funcaoMineracaoAlgoritmos.forEach((algortimo) => {
        this.algoritmosSel.add(algortimo);
      });
      this.funcaoMineracaoForm.patchValue(this.funcaoMineracao);
    } else {
      this.acao = 'Criar';
    }

    this.algoritmos$ = this.algoritmoService.listarAlgoritmos();
  }

  addToList() {
    const algoritmo: Algoritmo = this.f.algoritmo.value;
    const funcaoMineracaoAlgoritmo: FuncaoMineracaoAlgoritmo = {};
    funcaoMineracaoAlgoritmo.algoritmo = algoritmo;
    this.algoritmosSel.add(funcaoMineracaoAlgoritmo);
  }

  remove(algoritmo: FuncaoMineracaoAlgoritmo) {
    if (confirm(`Deseja realmente remover o algoritmo ${algoritmo.algoritmo.algoritmoAlias}`)) {
      if (algoritmo.funcaoMineracaoAlgoritmoId) {
        this.funcaoMineracaoAlgoritmoService.deletar(algoritmo.funcaoMineracaoAlgoritmoId).subscribe((res) => {
          swal.fire('Aviso', 'Removido com sucesso', 'success');
          console.log('res', res);
          this.algoritmosSel.delete(algoritmo);
        });
      } else {
        swal.fire('Aviso', 'Removido com sucesso', 'success');
        this.algoritmosSel.delete(algoritmo);
      }
    }
  }

  get f() { return this.funcaoMineracaoForm.controls; }

  voltar() {
    this.location.back();
  }

  salvar() {
    if (!this.algoritmosSel || this.algoritmosSel.size === 0) {
      swal.fire('Erro', 'Deve ser adicionado pelo menos um algoritmo', 'error');
      return;
    }
    this.funcaoMineracao = this.funcaoMineracaoForm.value;
    this.funcaoMineracao.funcaoMineracaoAlgoritmos = Array.from(this.algoritmosSel);

    // console.log('log', JSON.stringify(this.funcaoMineracao));

    this.funcaoMineracaoService.salvar(this.funcaoMineracao).subscribe((res) => {
      this.funcaoMineracaoForm.patchValue(res);
      swal.fire('Informação', 'Função de Mineração salva com sucesso', 'success').then(() => {
        this.router.navigate([`/minerador/funcao-mineracao/list`]);
      });
    });

    // this.funcaoMineracaoForm.patchValue(this.funcaoMineracao);
    // adicionar algortimos*/


  }

}
