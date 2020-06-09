import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from '@app/api/service/grupo.service';
import { Resultado, Estatisticas } from '@app/api/model/resultado';
import { Location } from '@angular/common';
import { Grupo } from '@app/api/model/grupo';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grupo-mineracao-explorador',
  templateUrl: './grupo-mineracao-explorador.component.html',
  styleUrls: ['./grupo-mineracao-explorador.component.css']
})
export class GrupoMineracaoExploradorComponent implements OnInit {

  grupoId: number;
  erros: string;
  errosStat: string;
  resultados: Resultado = null;
  estatisticas: Resultado = null;

  constructor(private route: ActivatedRoute,
              private grupoService: GrupoService,
              private router: Router,
              private location: Location) { }

  grupo: Grupo;

  ngOnInit() {

    this.grupoId = Number(this.route.snapshot.paramMap.get('grupoId'));

    combineLatest(this.grupoService.explorarDados(this.grupoId), this.grupoService.explorarEstatisticas(this.grupoId))
      .pipe(
        map(([explorar, res]) => ({explorar, res}))
      ).subscribe((pair) => {
        this.resultados = pair.explorar;
        this.estatisticas = pair.res.estatisticas;
        this.grupo = pair.res.grupo;
        this.erros = null;
      }, (error) => {
        this.erros = 'Nenhum resultado encontrado';
      });

    // explorar dados
    /*this.grupoService.explorarDados(this.grupoId).subscribe((res) => {
      this.resultados = res;
      this.erros = null;
    }, (error) => {
      this.erros = 'Nenhum resultado encontrado';
    });

    this.grupoService.explorarEstatisticas(this.grupoId).subscribe((res) => {
      this.estatisticas = res.estatisticas;
      this.grupo = res.grupo;
      this.errosStat = null;
    }, (error) => {
      this.errosStat = 'Nenhuma estatística encontrada';
    });*/

  }

  voltar() {
    sessionStorage.setItem('grupoMineracaoTab', '1');
    this.location.back();
  }

  transformar(obj: any[]) {
    this.router.navigate([`/minerador/grupo-mineracao/transformar/${obj[obj.length - 1]}`]);
  }

}
