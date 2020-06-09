import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SharedService } from '@app/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  stompClient: any;

  constructor(private sharedService: SharedService) {
  }

  connect(topic: string) {
    const ws = new SockJS(`${environment.api}/${environment.websocket}`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(topic, (sdkEvent) => {
        this.onMessageReceived(sdkEvent);
      });
    }, (error) => {
        console.log(`Falha de conexão websocket, tentando novamente... ${error}`);
        setTimeout(() => {
            this.connect(topic);
        }, 15000);
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log('Desconectado websocket');
  }

  onMessageReceived(message) {
    const notification = JSON.parse(message.body);
  }

}
