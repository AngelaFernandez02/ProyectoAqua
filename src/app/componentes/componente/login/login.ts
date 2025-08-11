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
  isLoading = false;

  constructor(private ServiceAuth: ServiceAuth, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Debes completar todos los campos.';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.ServiceAuth.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('✅ [Login] Login exitoso:', response);
        
        // Guardar token y rol
        this.ServiceAuth.saveToken(response.token);
        this.ServiceAuth.saveUserRole(response.tipoUsuario);
        
        console.log('💾 [Login] Token y rol guardados');
        console.log('👤 [Login] Tipo de usuario:', response.tipoUsuario);

        // Redirigir según el tipo de usuario
        if (response.tipoUsuario === 1) {
          console.log('🔄 [Login] Redirigiendo a admin dashboard');
          this.router.navigate(['/admin/dashboard']);
        } else if (response.tipoUsuario === 2) {
          console.log('🔄 [Login] Redirigiendo a cliente actualizar (Cliente)');
          this.router.navigate(['/cliente-actualizar']);
        } else {
          this.error = 'Tipo de usuario no reconocido.';
          console.error('❌ [Login] Tipo de usuario no reconocido:', response.tipoUsuario);
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ [Login] Error en login:', error);
        this.error = 'Usuario o contraseña incorrectos.';
        this.isLoading = false;
      }
    });
  }
}
