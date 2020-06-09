import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UsuarioService } from '@app/api/service/usuario.service';
import { Usuario } from '@app/api/model/models';
import { environment } from '@environments/environment';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  usuario: Usuario;

  totalNaoLida = 0;

  notifications: any[] = [];

  stompClient: any;


  constructor(private usuarioService: UsuarioService) {
    this.connectWebSocket();
  }

  private connectWebSocket() {
    const ws = new SockJS(`${environment.api}/${environment.websocket}`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/upload', (sdkEvent) => {
        this.totalNaoLida += 1;
        this.notifications.splice(0, 0, JSON.parse(sdkEvent.body));
      });

      this.stompClient.subscribe('/topic/regra_atributo_salvar', (sdkEvent) => {
        this.totalNaoLida += 1;
        this.notifications.splice(0, 0, JSON.parse(sdkEvent.body));
      });

      this.stompClient.subscribe('/topic/treino', (sdkEvent) => {
        this.totalNaoLida += 1;
        this.notifications.splice(0, 0, JSON.parse(sdkEvent.body));
      });

    }, (error) => {
        console.log(`Falha de conexão websocket, tentando novamente... ${error}`);
        setTimeout(() => {
            this.connectWebSocket();
        }, 15000);
    });

  }

  logout() {
    this.usuarioService.logout();
  }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuarioLogado();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log('destroy');
    this.stompClient.disconnect();
  }

  async read() {
    this.notifications.map((v) => {
      if (this.totalNaoLida > 0) {
        this.totalNaoLida -= 1;
      }
    });
  }
}
