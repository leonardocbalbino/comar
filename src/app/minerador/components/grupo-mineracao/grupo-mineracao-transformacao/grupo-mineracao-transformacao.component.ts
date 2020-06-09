import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Atributo, AtributoGrupo } from '@app/api/model/models';
import { AtributoGrupoService } from '@app/api/service/atributo-grupo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-grupo-mineracao-transformacao',
  templateUrl: './grupo-mineracao-transformacao.component.html',
  styleUrls: ['./grupo-mineracao-transformacao.component.css']
})
export class GrupoMineracaoTransformacaoComponent implements OnInit {

  atributoGrupo: AtributoGrupo;
  transformacaoForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location,
              private atributoGrupoService: AtributoGrupoService) { }

  ngOnInit() {
    const atributoGrupoId = Number(this.route.snapshot.paramMap.get('atributoId'));
    this.atributoGrupoService.listar(atributoGrupoId).subscribe((res) => {
      this.atributoGrupo = res;
    });
    this.transformacaoForm = this.formBuilder.group({
      expressaoTransformacao: ['', Validators.required],
    });
  }

  voltar() {
    this.location.back();
  }


  get f() { return this.transformacaoForm.controls; }

}
