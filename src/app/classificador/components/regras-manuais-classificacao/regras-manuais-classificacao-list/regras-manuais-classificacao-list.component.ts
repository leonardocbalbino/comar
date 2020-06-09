import { Component, OnInit } from '@angular/core';
import { RegraManualService } from '@app/api/classificador/service/regra-manual.service';
import { Observable } from 'rxjs';
import { RegraManual } from '@app/api/classificador/models/regra-manual';
import { RegraManualResponse } from '@app/api/classificador/models/regra-manual-response';
import { RegraManualRequest } from '@app/api/classificador/models/regra-manual-request';
import { Pageable } from '@app/shared/pagination/pageable';
import { RegraProduto } from '@app/api/classificador/models/regra-produto';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regras-manuais-classificacao-list',
  templateUrl: './regras-manuais-classificacao-list.component.html',
  styleUrls: ['./regras-manuais-classificacao-list.component.css']
})
export class RegrasManuaisClassificacaoListComponent implements OnInit {
  regras: Pageable<RegraManualResponse>;
  regraProduto: RegraProduto[] = [];
  colunas: any;
  consultaForm: FormGroup;
  pt: any;

  constructor(private regraService: RegraManualService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
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

    this.colunas = [
      { campo: 'regraManualNome', cabecalho: 'Nome' },
      { campo: 'regraManualJustificativa', cabecalho: 'Justificativa' },
      { campo: 'regraManualDataCadastro', cabecalho: 'Data do Cadastro', date: true }
    ];

    this.consultaForm = this.formBuilder.group({
      regraManualNome: [''],
      regraManualJustificativa: [''],
      regraManualDataCadastro: [''],
    });

    this.regraService.listar({}, 0, 10).subscribe( (res)=>{
      this.regras = res
    });
  }

  localizar() {
    const regra: RegraManualRequest = this.consultaForm.value;
    this.regraService.listar(regra, 0, 10).subscribe((res) => {
      this.regras = res;
    });
  }

  criarRegistro(){
    let hasEdit: boolean = false
    this.router.navigate(['classificador/regras-manuais-classificacao/cadastrar-editar'], { state: { hasEdit } });
  }

  deletar(event: any) {
    this.regraService.remover(event.regraManualId).subscribe( (res)=>{
      swal.fire('Informação', 'Regra manual excluida com sucesso!', 'success');
      this.regraService.listar({}, 0, 10).subscribe( (res)=>{
        this.regras = res
      });
    })
  }
}
