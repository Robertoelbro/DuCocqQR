import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { QrCodeService } from '../services/qrcode.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NgZone } from '@angular/core';
import { BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { BrowserMultiFormatReader } from '@zxing/library';  // Importar la librería para decodificar QR

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss', './assets/pokemon/pokesprite-misc.css', './assets/pokemon/pokesprite-inventory.css', './assets/pokemon/pokesprite-pokemon-gen8.css'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  rnombre: string = ''; // Nombre del usuario actual
  audio = new Audio('assets/pokemart.mp3'); // Ruta de la música de fondo
  asistencias: string[] = []; // Lista de asistencias registradas
  selectedPokemon: string = 'bulbasaur'; // Pokémon predeterminado
  pokemonInput: string = '';

  constructor(
    private nvt: NavController,
    private router: Router,
    private storage: Storage,
    private qrCodeService: QrCodeService,
    private sanitizer: DomSanitizer,
    private alertController: AlertController,
    private zone: NgZone // Para actualizar el UI después de escanear el QR
  ) {}

  async ngOnInit() {
    // Cargar el nombre del alumno desde el almacenamiento
    this.rnombre = await this.storage.get('registeredName') || 'Alumno';
    console.log('Nombre recibido: ', this.rnombre);

    // Inicializar lista de asistencias
    this.asistencias = (await this.storage.get('asistencias')) || [];

    // Reproducir música de fondo
    this.playBackgroundMusic();
  }

  navlog() {
    this.nvt.navigateForward(['/log']);
  }

  ngAfterViewInit() {
    this.initDvdScreensaver();
  }

  ngOnDestroy() {
    // Detener la música al abandonar la página Home
    this.stopBackgroundMusic();
  }

  pauseBackgroundMusic() {
    this.audio.pause();
  }

  playBackgroundMusic() {
    this.audio.loop = true; // Reproducir en bucle
    this.audio.volume = 0.5; // Ajustar volumen
    this.audio.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  }

  stopBackgroundMusic() {
    this.audio.pause();
    this.audio.currentTime = 0; // Reiniciar al inicio
  }

  initDvdScreensaver() {
    const logo = document.getElementById('dvd-logo') as HTMLElement;

    if (!logo) {
      console.error("Elemento 'dvd-logo' no encontrado. Asegúrate de que esté en el DOM.");
      return;
    }

    logo.style.position = 'absolute';
    const speed = 2;
    let posX = 50, posY = 50;
    let dirX = 1, dirY = 1;

    function moveLogo() {
      const maxX = window.innerWidth - logo.offsetWidth;
      const maxY = window.innerHeight - logo.offsetHeight;

      if (posX <= 0 || posX >= maxX) dirX *= -1;
      if (posY <= 0 || posY >= maxY) dirY *= -1;

      posX += speed * dirX;
      posY += speed * dirY;
      logo.style.transform = `translate(${posX}px, ${posY}px)`;

      requestAnimationFrame(moveLogo);
    }

    setTimeout(moveLogo, 100);
  }

  async scanQr() {
    try {
      // Verificar permisos de la cámara
      const permissionStatus = await BarcodeScanner.checkPermissions();
      if (permissionStatus.camera !== 'granted') {
        const permissionResponse = await BarcodeScanner.requestPermissions();
        if (permissionResponse.camera !== 'granted') {
          throw new Error('Permiso de cámara denegado.');
        }
      }

      // Iniciar el escaneo de código de barras o QR
      const result: ScanResult = await BarcodeScanner.scan();

      // Verificar si se han encontrado códigos
      if (result.barcodes && result.barcodes.length > 0) {
        const scannedData = result.barcodes[0].rawValue; // Tomamos el primer código escaneado
        console.log('Código escaneado:', scannedData);

        // Mostrar el contenido del código escaneado en una alerta
        const alert = await this.alertController.create({
          header: 'Código escaneado',
          message: `Contenido del código escaneado: ${scannedData}`,
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        throw new Error('No se detectaron códigos QR o de barras.');
      }
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: `Error al escanear: ${(error as Error).message}`,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async clearAsistencias() {
    this.asistencias = [];
    await this.storage.set('asistencias', this.asistencias);

    const alert = await this.alertController.create({
      header: 'Lista de Asistencias Limpiada',
      message: 'Se han eliminado todas las asistencias.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  selectPokemon() {
    if (this.pokemonInput) {
      this.selectedPokemon = this.pokemonInput.toLowerCase();
    }
  }
}
