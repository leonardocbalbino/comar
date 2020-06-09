import { Component, OnInit } from '@angular/core';
import { ModeloService } from '@app/api/service/modelo.service';
import { Modelo } from '@app/api/model/modelo';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-modelos-consulta-comparacao',
  templateUrl: './modelos-consulta-comparacao.component.html',
  styleUrls: ['./modelos-consulta-comparacao.component.css']
})
export class ModelosConsultaComparacaoComponent implements OnInit {

  listaId: any[] = [];
  modelo: any[] = [];
  modeloTemp: any[] = [];
  modeloHistorico: any[] = [];
  listaHistoricos: any[] = [];
  historicoCompare: any[] = [];
  historicoCompareOld: any[] = [];
  p: number;
  antigo: number;

  constructor(
    private modeloService: ModeloService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
  ) { }

  ngOnInit() {

    if (history.state.data) {
      this.listaId = history.state.data;
      this.modeloService.listar().subscribe((lista) => {
        lista.forEach(m => {
          const contador = this.listaId.length;
          for (let i = 0; i < contador; i++) {
            if (m.modeloId === this.listaId[i]) {
              m.historicos.forEach((historicos) => {
                if (historicos.historicoEvento === 'TESTADO') {
                  if (this.modelo.length > 0) {
                    if (!this.modelo.find((t) => t.data === historicos.historicoData)) {
                      if (historicos.dadosTeste.dadosTestePercentual === null || historicos.dadosTeste.dadosTestePercentual === 0) {
                        this.modelo.push({
                          id: m.modeloId,
                          nome: m.modeloNome,
                          data: historicos.historicoData,
                          grupo: historicos.dadosTeste.grupo.grupoNome,
                          dados: '0',
                          historicoId: historicos.historicoId,
                        });
                      } else {
                        this.modelo.push({
                          id: m.modeloId,
                          nome: m.modeloNome,
                          data: historicos.historicoData,
                          grupo: historicos.dadosTeste.grupo.grupoNome,
                          dados: historicos.dadosTeste.dadosTestePercentual,
                          historicoId: historicos.historicoId,
                        });
                      }

                    }
                  } else {
                    if (historicos.dadosTeste.dadosTestePercentual === null || historicos.dadosTeste.dadosTestePercentual === 0) {
                      this.modelo.push({
                        id: m.modeloId,
                        nome: m.modeloNome,
                        data: historicos.historicoData,
                        grupo: historicos.dadosTeste.grupo.grupoNome,
                        dados: '0',
                        historicoId: historicos.historicoId,
                      });
                    } else {
                      this.modelo.push({
                        id: m.modeloId,
                        nome: m.modeloNome,
                        data: historicos.historicoData,
                        grupo: historicos.dadosTeste.grupo.grupoNome,
                        dados: historicos.dadosTeste.dadosTestePercentual,
                        historicoId: historicos.historicoId,
                      });
                    }
                  }
                }
              });
            }
          }
          this.modelo.sort(function (a: any, b: any) {
            if (a.nome < b.nome) { return -1; }
            if (a.nome > b.nome) { return 1; }
            return 0;
          });
        });
      });
    } else {
      this.voltar();
    }
  }

  voltar() {
    //this.location.back();
    this.router.navigate([`/minerador/modelos-mineracao/list`]);
  }

  selecionahistorico(modelo: any) {
    if (this.listaHistoricos.length === 0) {
      this.listaHistoricos.push(modelo.historicoId);
    } else {
      if (this.listaHistoricos.find(p => p === modelo.historicoId)) {
        const index = this.listaHistoricos.indexOf(modelo.historicoId);
        this.listaHistoricos.splice(index, 1);
      } else {
        this.listaHistoricos.push(modelo.historicoId);
      }
    }
  }

  // enviaComparacao() {
  //   if (this.listaHistoricos.length < 2) {
  //     swal.fire('Aviso', 'Selecione ao menos dois testes', 'warning');
  //   } else {
  //     const contador = this.listaHistoricos.length;
  //     for (let i = 0; i <= contador; i++) {
  //       // if (i === contador) {
  //       //   // tslint:disable-next-line: max-line-length
  //       //   this.router.navigate([`/minerador/modelos-mineracao/comparacao`], { state: { data: this.modeloTemp, historico: this.modeloHistorico } });
  //       // } else {

  //       // }
  //       this.antigo = i - 1;
  //       if (i !== 0) {
  //         this.historicoCompare = this.modelo.find(modelo => modelo.historicoId === this.listaHistoricos[i]).id;
  //         this.historicoCompareOld = this.modelo.find(modelo => modelo.historicoId === this.listaHistoricos[this.antigo]).id;
  //         if (this.historicoCompare === this.historicoCompareOld) {
  //           swal.fire('Aviso', 'Você não pode selecionar dois testes do mesmo modelo', 'warning');
  //           this.modeloTemp = [];
  //           break;
  //         } else {
  //           this.modeloTemp.push(this.listaHistoricos[i].id);
  //           // this.modeloHistorico.push(this.listaHistoricos[i].historicoId);
  //         }
  //       } else {
  //         this.modeloTemp.push(this.listaHistoricos[i].id);
  //         // this.modeloHistorico.push(this.listaHistoricos[i].historicoId);
  //       }
  //     }

  //   }

  // }
  enviaComparacao() {
    let validacao = false;
    if (this.listaHistoricos.length < 2) {
      swal.fire('Aviso', 'Selecione ao menos dois testes', 'warning');
      validacao = true;
    } else {
      const contador = this.listaHistoricos.length;
      for (let i = 0; i < contador; i++) {
        this.antigo = i - 1;
        if (i !== 0) {
          this.historicoCompare = this.modelo.find(modelo => modelo.historicoId === this.listaHistoricos[i]).id;
          this.historicoCompareOld = this.modelo.find(modelo => modelo.historicoId === this.listaHistoricos[this.antigo]).id;
          if (this.historicoCompare === this.historicoCompareOld) {
            swal.fire('Aviso', 'Você não pode selecionar dois testes do mesmo modelo', 'warning');
            this.modeloTemp = [];
            validacao = true;
            break;
          } else {
            this.modeloTemp.push(this.modelo.find(modelo => modelo.historicoId === this.listaHistoricos[i]).id);
          }
        } else {
          this.modeloTemp.push(this.modelo.find(modelo => modelo.historicoId === this.listaHistoricos[i]).id);
          // this.modeloHistorico.push(this.listaHistoricos[i].historicoId);
        }
      }

    }
    if (!validacao) {
      // tslint:disable-next-line: max-line-length
      this.router.navigate([`/minerador/modelos-mineracao/comparacao`], { state: { data: this.modeloTemp, historico: this.listaHistoricos, consulta:history.state.data } });
    }

  }

}
