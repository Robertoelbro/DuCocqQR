import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  rnombre: string = '';
  rcontrasenna: string = '';
  rpcontrasenna: string = '';
  Gmail: string = '';
  tipoUsuario: string = ''; // Nuevo campo para el tipo de usuario

  constructor(
    private nvt: NavController,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  // Validación y almacenamiento del usuario
  async registrarUsuario() {
    if (!this.rnombre || !this.rcontrasenna || !this.rpcontrasenna || !this.tipoUsuario) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
    } else if (this.rcontrasenna !== this.rpcontrasenna) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      // Obtener usuarios existentes del almacenamiento
      const usuarios = (await this.storage.get('usuarios')) || [];
      
      // Crear nuevo usuario
      const nuevoUsuario = {
        nombre: this.rnombre,
        contrasenna: this.rcontrasenna,
        gmail: this.Gmail,
        tipoUsuario: this.tipoUsuario, // 'profesor' o 'alumno'
      };

      // Agregar el nuevo usuario al array y guardarlo en el Storage
      usuarios.push(nuevoUsuario);
      await this.storage.set('usuarios', usuarios);

      // Confirmación de registro exitoso
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: `Usuario ${this.rnombre} registrado como ${this.tipoUsuario}.`,
        buttons: ['OK'],
      });
      await alert.present();

      // Redirigir al login
      this.navlog();
    }
  }

  navlog() {
    this.nvt.navigateForward(['/log']);
  }

  back() {
    this.router.navigate(['/log']);
  }
}