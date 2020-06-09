import * as $ from 'jquery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { RoutingApp } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { JwtInterceptor } from '@app/auth/helpers/jwt.interceptor';
import { ErrorInterceptor } from '@app/auth/helpers/error.interceptor';
import { SharedModule } from '@app/shared/shared.module';
import { LoaderInterceptor } from './shared/loader.interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RoutingApp,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
