import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-analise-catalogo-automatico-cadastrar',
  templateUrl: './analise-catalogo-automatico-cadastrar.component.html',
  styleUrls: ['./analise-catalogo-automatico-cadastrar.component.css']
})
export class AnaliseCatalogoAutomaticoCadastrarComponent implements OnInit {
  nav: Navigation;
  nodes: any[] = [];

  constructor(private router: Router, private location: Location) { this.nav = router.getCurrentNavigation(); }

  ngOnInit() {
    if(localStorage.getItem("clusters")){
      this.nodes = JSON.parse(localStorage.getItem("clusters"));
    }
  }

  salvar(){
    localStorage.removeItem("clusters");
    this.nodes = [];
    this.router.navigate(['classificador/analise-catalogo-automatico/list']);
    confirm("Salvo com sucesso!");
  }

  voltar() {
    this.location.back();
  }

}
