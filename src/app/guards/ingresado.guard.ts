import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class IngresadoGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) {}

  async canActivate(): Promise<boolean> {
    const { name: enteredName, password: enteredPassword } =
      this.authService.getCredentials();



    const registeredName = await this.storage.get('registeredName');
    const registeredPassword = await this.storage.get('registeredPassword');

    if (enteredName !== registeredName || enteredPassword !== registeredPassword) {
      await this.presentAlert('Error', 'Nombre o contraseña incorrectos.');
      return false;
    }
    if (!enteredName || !enteredPassword) {
      await this.presentAlert('Error', 'Por favor, complete todos los campos.');
      return false;
    }

    // Este caso también puede ser simplificado
    if (enteredName === registeredName && enteredPassword === registeredPassword) {
      return true;
    }

    // Retorno explícito para cubrir cualquier flujo restante
    return false;
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
