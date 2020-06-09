import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Fonte } from '@app/api/model/fonte';
import { FonteService } from '@app/api/service/fonte.service';
import {FileUploadModule} from 'primeng/fileupload';



@Component({
  selector: 'app-importacao-itens-catalogo',
  templateUrl: './importacao-itens-catalogo.component.html',
  styleUrls: ['./importacao-itens-catalogo.component.css']
})
export class ImportacaoItensCatalogoComponent implements OnInit {
  grupos$: any;
  grupoService: any;
  colunas: any;
  //fontes$: Observable<Fonte[]>;
  uploadedFiles: any[] = [];


  constructor(private location: Location/*, private fonteService: FonteService*/) { }

  ngOnInit() {
    this.colunas = [
      { campo: 'fonteAlias', cabecalho: 'Segmento' },
      { campo: 'fonteAlias', cabecalho: 'Item' },
      { campo: 'fonteAlias', cabecalho: 'Valor Médio' },
      { campo: 'fonteAlias', cabecalho: 'Valor Mínimo' },
      { campo: 'fonteAlias', cabecalho: 'Valor Máximo' },
      { campo: 'fonteAlias', cabecalho: 'Und' },
    ];
    //this.fontes$ = this.fonteService.listar();
  }

  voltar() {
    this.location.back();
  }
  
  onFileChange($event) {

  }

}
