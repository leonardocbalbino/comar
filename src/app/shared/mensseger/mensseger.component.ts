import { Component, OnInit } from '@angular/core';
import { ModeloService } from '@app/api/service/modelo.service';
import { ToastrService } from 'ngx-toastr';
import { Modelo } from '@app/api/model/modelo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mensseger',
  templateUrl: './mensseger.component.html',
  styleUrls: ['./mensseger.component.css']
})
export class MenssegerComponent implements OnInit {
  tituloMensagem: string;
  corpoMensagem: string;
  descricaoMensagem: string;
  statusMensagem: boolean;
  modelo: Modelo = {};

  constructor(
    private modeloService: ModeloService,
    private location: Location,
  ) { }

  ngOnInit() {
    if (history.state.funcao === 'treinaModelo') {
      console.log(history.state.grupo);
      const modelo = {
        grupoId: history.state.grupo,
        modeloId: history.state.data.id
      };
      this.modeloService.treinar(modelo).subscribe((res) => {
        this.tituloMensagem = 'Treino para o modelo ' + history.state.data.nome;
        this.corpoMensagem = 'Treino iniciado com sucesso ';
        this.descricaoMensagem = 'Para verificar o status do teste, verifique a lista de modelos';
        this.statusMensagem = true;
      });
    } else if (history.state.funcao === 'testaModelo') {
      const modelo: Modelo = {};
      modelo.modeloId = history.state.data.id;
      this.modeloService.testar(modelo).subscribe((res) => {
        this.tituloMensagem = 'Teste para o modelo ' + history.state.data.nome;
        this.corpoMensagem = 'Teste iniciado com sucesso ';
        this.descricaoMensagem = 'Para verificar o status do teste, verifique a lista de modelos';
        this.statusMensagem = true;
      });
    }

  }

  voltar() {
    this.location.back();
  }

}
