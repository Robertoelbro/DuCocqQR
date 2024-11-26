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
    // obligar al log a esperar una respuesta del register
    await this.storage.create();
  }
  // Validación de credenciales
  async navhome() {
    const registeredName = await this.storage.get('registeredName');
    const registeredPassword = await this.storage.get('registeredPassword');

    if (!this.lnombre || !this.lcontrasenna) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
    } else if (this.lnombre !== registeredName || this.lcontrasenna !== registeredPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.router.navigate(['/home', { lnombre: this.lnombre }]);
    }
  }

  navregister() {
    this.nvt.navigateForward(['/register']);
  }

  navsenna() {
    this.nvt.navigateForward(['/new-pass']);
  }

}
