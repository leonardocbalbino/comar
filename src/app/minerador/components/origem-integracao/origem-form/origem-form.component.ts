import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Origem } from '@app/api/model/origem';
import { OrigemService } from '@app/api/service/origem.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-origem-form',
  templateUrl: './origem-form.component.html',
  styleUrls: ['./origem-form.component.css']
})
export class OrigemFormComponent implements OnInit {

  acao: string;
  origemForm: FormGroup;
  origem: Origem;

  constructor(private formBuilder: FormBuilder,
              private service: OrigemService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.origemForm = this.formBuilder.group({
      origemAlias: ['', [Validators.required, Validators.maxLength(10)]],
      origemDblink: ['', Validators.required],
      origemIp: [''],
      origemNome: ['', Validators.required],
      origemPorta: [''],
      origemId: [''],
    });

    if (history.state.data) {
      this.acao = 'Editar';
      this.origem = history.state.data;
      this.origemForm.patchValue(this.origem);
    } else {
      this.acao = 'Criar';
      this.origem = {};
    }
  }

  salvar() {
    this.origem =  this.origemForm.value;
    this.service.salvar(this.origem).subscribe((res) => {
      swal.fire('Informação', 'Origem salva com sucesso', 'success').then(() => {
        this.router.navigate([`/minerador/origem-integracao/list`]);
      });
    });
  }

  voltar() {
    this.location.back();
  }

}
