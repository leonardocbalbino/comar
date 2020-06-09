import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@app/home/components/home.component';
import { FullComponent } from '@app/shared/layouts/full.component';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';

const routes: Routes = [
    {
        path: '', component: FullComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
              path: 'notificacao',
              component: NotificacaoComponent
          },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
