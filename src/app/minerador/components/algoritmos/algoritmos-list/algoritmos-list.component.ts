import { Component, OnInit } from '@angular/core';
import { Algoritmo } from '@app/api/model/models';
import { AlgoritmoService } from '@app/api/service/algoritmo.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-algoritmos-list',
  templateUrl: './algoritmos-list.component.html',
  styleUrls: ['./algoritmos-list.component.css']
})
export class AlgoritmosListComponent implements OnInit {

  algoritmos$: Observable<Algoritmo[]>;
  colunas: any;
  algoritmos: any[] = [];
  p: number;

  constructor(private algoritmoService: AlgoritmoService, private router: Router) { }

  ngOnInit() {
    this.algoritmoService.listarAlgoritmos().subscribe((lista) => {
      lista.forEach((doc) => {
        let supervisionado = '';
        if (doc.algoritmoSupervisionado === true) {
          supervisionado = 'SIM'
        } else {
          supervisionado = 'NÃO'
        }
        this.algoritmos.push({
          algoritmoId: doc.algoritmoId,
          algoritmoAlias: doc.algoritmoAlias,
          algoritmoNomeInterno: doc.algoritmoNomeInterno,
          algoritmoSupervisionado: supervisionado,
          algoritmoLista: lista.find(model => model.algoritmoId === doc.algoritmoId)
        })

      })
    });
    this.colunas = [
      { campo: 'algoritmoNomeInterno', cabecalho: 'Nome' },
      { campo: 'algoritmoAlias', cabecalho: 'Alias' },
      { campo: 'algoritmoSupervisionado', cabecalho: 'Supervisionado' },
    ];

  }

  editar(algoritmo) {
    this.router.navigate(['/minerador/algoritmos/form'], { state: { data: algoritmo } });
  }

  criar() {
    this.router.navigate(['/minerador/algoritmos/form']);
  }

  deletar(event) {
    swal.fire({
      title: 'Aviso',
      text: 'Deseja remover o Algoritmo ' + event.algoritmoNomeInterno + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.algoritmoService.deletar(event.algoritmoId).subscribe((res) => {
          swal.fire('Informação', 'Registro excluído com sucesso', 'success').then(() => {
            // this.algoritmos$ = this.algoritmoService.listarAlgoritmos();
            this.algoritmos = [];
            this.algoritmoService.listarAlgoritmos().subscribe((lista) => {
              lista.forEach((doc) => {
                let supervisionado = '';
                if (doc.algoritmoSupervisionado === true) {
                  supervisionado = 'SIM'
                } else {
                  supervisionado = 'NÃO'
                }
                this.algoritmos.push({
                  algoritmoId: doc.algoritmoId,
                  algoritmoAlias: doc.algoritmoAlias,
                  algoritmoNomeInterno: doc.algoritmoNomeInterno,
                  algoritmoSupervisionado: supervisionado,
                  algoritmoLista: lista.find(model => model.algoritmoId === doc.algoritmoId)
                })
    
              })
            });
          });
        });
      }
    });    
  }
}
