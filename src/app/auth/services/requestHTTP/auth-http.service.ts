import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { User } from '../../interface/user';
import { LoignResponse, Result } from '../../interface/auth';
import { catchError, map, Observable, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private http = inject(HttpClient);
  private baseUrl = enviroments.api;
  private port = ':8383';

  constructor() {}
  postAuth(numemp_pk: string, password: string): Observable<Result>{
    const url = `${this.baseUrl}${this.port}/api/login`;
    const body = { numemp_pk, password };

    return this.http.post<LoignResponse>(url, body).pipe(
      tap(() => {
        sessionStorage.setItem('username-gps', numemp_pk.toString());
      }), 
      map((resp) => resp.result),
      catchError((err) => {
        console.log(err);
        return throwError(
          () => 'Datos erróneos, verifica tus credenciales de acceso'
        );
      })
    );
  }

  logout(){
    sessionStorage.clear();
  }
}
