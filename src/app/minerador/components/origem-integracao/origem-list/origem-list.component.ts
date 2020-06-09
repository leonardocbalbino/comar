import { Component, OnInit } from '@angular/core';
import { Origem } from '@app/api/model/origem';
import { Observable } from 'rxjs';
import { OrigemService } from '@app/api/service/origem.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-origem-list',
  templateUrl: './origem-list.component.html',
  styleUrls: ['./origem-list.component.css']
})
export class OrigemListComponent implements OnInit {

  origens$: Observable<Origem[]>;
  colunas: any;

  constructor(private service: OrigemService) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'origemNome', cabecalho: 'Nome' },
      { campo: 'origemAlias', cabecalho: 'Alias' },
      { campo: 'origemDblink', cabecalho: 'DB Link' },
      { campo: 'origemIp', cabecalho: 'IP da Origem' },
      { campo: 'origemPorta', cabecalho: 'Porta da Origem' },
    ];
    this.origens$ = this.service.listar();
  }

  deletar(event) {
    this.service.remover(event.origemId).subscribe((res) => {
      this.origens$ = this.service.listar();
      swal.fire('Informação', 'Registro excluído com sucesso', 'success');
    });
  }
}
