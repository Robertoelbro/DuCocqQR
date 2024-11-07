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

    constructor(
      private nvt: NavController,
      private router: Router,
      private alertController: AlertController,
      private storage: Storage 
    ) {}
    async ngOnInit() {
      await this.storage.create()
    }
    // Validación y almacenamiento temporal
    async validarContrasenna(destino: 'login' | 'home') {
      if (!this.rnombre || !this.rcontrasenna || !this.rpcontrasenna) {
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
        // Guardamos temporalmente las credenciales registradas
        await this.storage.set('registeredName', this.rnombre);
        await this.storage.set('registeredPassword', this.rcontrasenna);
    
        // Verificar si los datos se guardaron correctamente
        console.log('Nombre Guardado:', this.rnombre);
        console.log('Contraseña Guardada:', this.rcontrasenna);
    
        if (destino === 'login') {
          this.navlog();
        } else if (destino === 'home') {
          this.navhome();
        }
      }
    }

    navlog() {
      this.nvt.navigateForward(['/log']);
    }

    navhome() {
      this.router.navigate(['/home', { rnombre: this.rnombre }]);
    }
    back(){
      this.router.navigate(['/log'])
    }


  }
