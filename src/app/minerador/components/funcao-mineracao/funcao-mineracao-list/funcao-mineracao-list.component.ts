import { Component, OnInit } from '@angular/core';
import { FuncaoMineracao } from '@app/api/model/models';
import { Observable } from 'rxjs';
import { FuncaoMineracaoService } from '@app/api/service/funcaomineracao.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-funcao-mineracao-list',
  templateUrl: './funcao-mineracao-list.component.html',
  styleUrls: ['./funcao-mineracao-list.component.css']
})
export class FuncaoMineracaoListComponent implements OnInit {

  funcoesMineracao$: Observable<FuncaoMineracao[]>;
  colunas: any;

  constructor(private funcaoMineracaoService: FuncaoMineracaoService) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'funcaoMineracaoNomeInterno', cabecalho: 'Nome' },
      { campo: 'funcaoMineracaoAlias', cabecalho: 'Alias' },
      { campo: 'funcaoMineracaoSeparaDadosLabel', cabecalho: 'Separa Teste e Treino' },
      { campo: 'algortimosAlias', cabecalho: 'Algoritmos da Função de Mineração' },
    ];
    this.funcoesMineracao$ = this.funcaoMineracaoService.listar();
  }

  deletar(event) {
    this.funcaoMineracaoService.deletar(event.funcaoMineracaoId).subscribe((res) => {
      swal.fire('Informação', 'Registro excluído com sucesso', 'success').then(() => {
        this.funcoesMineracao$ = this.funcaoMineracaoService.listar();
      });
    });
  }
}
