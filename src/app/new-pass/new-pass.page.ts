import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.page.html',
  styleUrls: ['./new-pass.page.scss'],
})
export class NewPassPage implements OnInit {
  nombre: string = '';
  restcontrasenna: string = '';
  confirmrestcontrasenna: string = '';
  constructor(
    private nvt: NavController,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage 
  ) {}

  navlog() {
    this.nvt.navigateForward(['/log']);
  }
 
  navregister() {
    this.nvt.navigateForward(['/register']);
  }

  async ngOnInit() {
    await this.storage.create();
  }
  async resetPassword() {
    // Validar que los campos no estén vacíos
    if (!this.nombre || !this.restcontrasenna || !this.confirmrestcontrasenna) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
    // Validar que las contraseñas coinciden
    else if (this.restcontrasenna !== this.confirmrestcontrasenna) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
    }
    // Validar si el nombre de usuario existe en el almacenamiento
    else {
      const storedName = await this.storage.get('registeredName');
      if (storedName !== this.nombre) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Este nombre de usuario no está registrado.',
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        // Guardar la nueva contraseña
        await this.storage.set('registeredPassword', this.restcontrasenna);
  
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Contraseña restablecida con éxito.',
          buttons: ['OK'],
        });
        await alert.present();
  
        // Redirigir al login o al home
        this.router.navigate(['/log']);
      }
    }
  }  
  back(){
    this.router.navigate(['/log'])
  }

}
