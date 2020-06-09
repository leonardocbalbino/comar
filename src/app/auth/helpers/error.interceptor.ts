import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UsuarioService } from '@app/api/service/usuario.service';
import swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UsuarioService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
            } else if (err.status === 500) {
                swal.fire('Falha', 'Erro Interno de Servidor', 'error');
                return throwError(err);
            } else if (err.status === 417 || err.status === 404) {
              return throwError(err);
            } else if (err.status === 0) {
              swal.fire('Falha', `Falha de comunicação com o servidor ou serviço indisponível`, 'error');
              return throwError(err);
            }
            console.log(err);
            swal.fire(err.error.error, err.error.message, 'error');
            return throwError(err);
        }));
    }
}
