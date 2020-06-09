import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@app/auth/components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule.forRoot(),
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
