import { Component, OnInit } from '@angular/core';
import { Parametro } from '@app/api/model/models';
import { ParametroService } from '@app/api/service/parametro.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-parametro-list',
  templateUrl: './parametro-list.component.html',
  styleUrls: ['./parametro-list.component.css']
})
export class ParametroListComponent implements OnInit {

  parametros$: Observable<Parametro[]>;
  colunas: any;

  constructor(private service: ParametroService) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'parametroNome', cabecalho: 'Nome' },
      { campo: 'parametroAlias', cabecalho: 'Alias' },
      { campo: 'parametroOrigemDescricao', cabecalho: 'Origem' },
      { campo: 'listaFuncoes', cabecalho: 'Funções de Mineração' },
      { campo: 'listaAlgoritmos', cabecalho: 'Algoritmos' },
    ];
    this.parametros$ = this.service.listar();
  }

  deletar(event) {
    this.service.remover(event.parametroId).subscribe((res) => {
      this.parametros$ = this.service.listar();
      swal.fire('Informação', 'Registro excluído com sucesso', 'success');
    });
  }

}
