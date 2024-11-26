import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  lnombre: string = '';
  lcontrasenna: string = '';

  constructor(
    private nvt: NavController,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    // Inicializar el almacenamiento
    await this.storage.create();
  }

  // Validación de credenciales y redirección según el tipo de usuario
  async navhome() {
    const usuarios = (await this.storage.get('usuarios')) || [];
    const usuario = usuarios.find(
      (user: any) =>
        user.nombre === this.lnombre && user.contrasenna === this.lcontrasenna
    );

    if (!this.lnombre || !this.lcontrasenna) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
    } else if (!usuario) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      // Redirigir según el tipo de usuario
      if (usuario.tipoUsuario === 'profesor') {
        this.router.navigate(['/profesor']);
      } else if (usuario.tipoUsuario === 'alumno') {
        this.router.navigate(['/home']);
      }
    }
  }

  navregister() {
    this.nvt.navigateForward(['/register']);
  }

  navsenna() {
    this.nvt.navigateForward(['/new-pass']);
  }
}
