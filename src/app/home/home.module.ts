import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NotificacaoComponent } from '../home/components/notificacao/notificacao.component';



@NgModule({
  declarations: [HomeComponent, NotificacaoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule.forRoot(),
  ]
})
export class HomeModule { }
