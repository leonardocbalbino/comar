import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlgoritmoService } from '@app/api/service/algoritmo.service';
import { Algoritmo } from '@app/api/model/models';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-algoritmos-form',
  templateUrl: './algoritmos-form.component.html',
  styleUrls: ['./algoritmos-form.component.css']
})
export class AlgoritmosFormComponent implements OnInit {

  acao: string;
  algoritmo: Algoritmo;
  algoritmoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private router: Router,
              private algoritmoService: AlgoritmoService) { }

  ngOnInit() {
    this.algoritmoForm = this.formBuilder.group({
      algoritmoAlias: ['', Validators.required],
      algoritmoId: [''],
      algoritmoNomeInterno: ['', Validators.required],
      algoritmoSupervisionado: ['', Validators.required],
    });

    if (history.state.data) {
      this.acao = 'Editar';
      this.algoritmo = history.state.data;
      this.algoritmoForm.patchValue(this.algoritmo);
    } else {
      this.acao = 'Criar';
    }

  }

  get f() { return this.algoritmoForm.controls; }

  salvar() {
    let action: Observable<Algoritmo>;
    this.algoritmo = this.algoritmoForm.value;
    if (this.f.algoritmoId.value) {
      action = this.algoritmoService.alterar(this.algoritmo);
    } else {
      action = this.algoritmoService.salvar(this.algoritmo);
    }
    action.subscribe((res) => {
      this.algoritmoForm.patchValue(res);
      swal.fire('Informação', 'Algoritmo salvo com sucesso', 'success').then(() => {
        this.router.navigate([`/minerador/algoritmos/list`]);
      });
    });
  }

  voltar() {
    this.location.back();
  }

}
