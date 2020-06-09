import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detalhe-catalogo',
  templateUrl: './detalhe-catalogo.component.html',
  styleUrls: ['./detalhe-catalogo.component.css']
})
export class DetalheCatalogoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  voltar() {
    this.location.back();
  }

}
