import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  name: string = '';
  apellido: string = '';
  usuario: string = '';
  password: string = '';
  confirmPassword: string = '';

  usuarioErrorMessage: string = '';
  passwordErrorMessage: string = '';
  confirmPasswordErrorMessage: string = '';
  nameErrorMessage: string = '';
  apellidoErrorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    if (!this.validInputs()) return;

    const userData = {
      name: this.name,
      apellido: this.apellido,
      usuario: this.usuario,
      password: this.password,
    };

    this.http.post('https://api-vape-pyvfd.ondigitalocean.app/api/login', userData).subscribe(
      (response: any) => {
        if (response?.status === 1) {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        } else {
          this.confirmPasswordErrorMessage =
            response?.message || 'Error al registrar usuario';
        }
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }

  validInputs(): boolean {
    let hasErrors = false;

    this.usuarioErrorMessage = '';
    this.passwordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
    this.nameErrorMessage = '';
    this.apellidoErrorMessage = '';

    if (this.name === '') {
      this.nameErrorMessage = 'El nombre es requerido';
      hasErrors = true;
    }

    if (this.apellido === '') {
      this.apellidoErrorMessage = 'El apellido es requerido';
      hasErrors = true;
    }

    if (this.usuario === '') {
      this.usuarioErrorMessage = 'El usuario es requerido';
      hasErrors = true;
    }

    if (this.password === '') {
      this.passwordErrorMessage = 'La contraseña es requerida';
      hasErrors = true;
    }

    if (this.confirmPassword === '') {
      this.confirmPasswordErrorMessage =
        'La confirmación de contraseña es requerida';
      hasErrors = true;
    }

    if (hasErrors) return false;

    if (this.password.length < 6) {
      this.passwordErrorMessage =
        'La contraseña debe tener al menos 6 caracteres';
      hasErrors = true;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordErrorMessage =
        'La confirmación de contraseña no coincide';
      hasErrors = true;
    }

    if (hasErrors) return false;

    return true;
  }
}