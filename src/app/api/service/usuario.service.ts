import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '@app/api/model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, retry, catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem(`${environment.appId}@currentUser`)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(usuario: string, senha: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.api}/${environment.mineradorContext}/usuario/login`, JSON.stringify({ usuarioLogin: usuario, usuarioSenha: senha }), this.httpOptions)
        .pipe(map(user => {
            localStorage.setItem(`${environment.appId}@currentUser`, JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }), retry(1));
  }

  logout() {
    localStorage.removeItem(`${environment.appId}@currentUser`);
    this.currentUserSubject.next(null);
    window.location.reload();
  }

  public getUsuarioLogado(): Usuario {
    const usuario: Usuario = JSON.parse(localStorage.getItem(`${environment.appId}@currentUser`));
    if (usuario) {
      return usuario;
    }

    return null;
  }

  public isUsuarioLogado(): boolean {
    return this.getUsuarioLogado() != null;
  }
}
