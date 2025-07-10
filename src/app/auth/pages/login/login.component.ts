import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHttpService } from '../../services/requestHTTP/auth-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginuser: FormGroup;

    private router = inject(Router);
    private fb = inject(FormBuilder);
    private authService = inject(AuthHttpService)

    constructor() {
      this.loginuser = this.fb.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
      })
    }

    ngOnInit(): void {
      const lastPage = sessionStorage.getItem('page-gps');
      const username = sessionStorage.getItem('username-gps');
      if (lastPage && username) {
        this.router.navigateByUrl(lastPage);
      }
    }

    login(){
      if(this.loginuser.valid){
        const numemp_pk = this.loginuser.value.user;
        const password = this.loginuser.value.password;

        this.authService.postAuth(numemp_pk, password).subscribe({
          next: (data) => {
              console.log(data);
              if(data.activo === 0){
                Swal.fire('Error', "TU USUARIO ESTA DESACTIVADO", 'info');
                return;
              }
              sessionStorage.setItem('page-gps', `/dashboard`);
              sessionStorage.setItem('userlevel-gps', data.nivel_usuario.toString());

              this.router.navigateByUrl('/dashboard');
              console.log('ingreso');
              console.log(localStorage);
              
          },
          error: (message) => {
              Swal.fire('Error', message, 'error')
          }
        })
      }else{
        this.loginuser.markAllAsTouched();
      }
    }
}
