// login.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceAuth } from '../../../service/service-auth/service-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    NgIf,              
    FormsModule
  ]
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private ServiceAuth: ServiceAuth, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Debes completar todos los campos.';
      return;
    }

    this.ServiceAuth.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.ServiceAuth.saveToken(response.token);
        this.ServiceAuth.saveUserRole(response.tipoUsuario);

        if (response.tipoUsuario === 1) {
          this.router.navigate(['/menu-lateral']);
        } else if (response.tipoUsuario === 2) {
          this.router.navigate(['/cliente-actualizar']);
        } else {
          this.error = 'Tipo de usuario no reconocido.';
        }
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}
