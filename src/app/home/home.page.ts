import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { QrCodeService } from '../services/qrcode.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss', './assets/pokemon/pokesprite-misc.css','/assets/pokemon/pokesprite-inventory.css', "./assets/pokemon/pokesprite-pokemon-gen8.css"],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  rnombre: string = '';
  audio = new Audio('assets/pokemart.mp3'); // Ruta de la música de fondo
  qrCodeUrl: SafeUrl | undefined;
  idAlumno: string = this.rnombre;
  selectedPokemon: string = 'bulbasaur'; // Pokémon predeterminado
  pokemonInput: string = '';

  constructor(private nvt: NavController, private router: Router, private storage: Storage, private qrCodeService: QrCodeService, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    // Obtener el parámetro enviado a través de la URL
    this.rnombre = await this.storage.get('registeredName') || '';
    console.log('Nombre recibido: ', this.rnombre);

    // Reproduce la música solo cuando se accede a la página Home
    this.playBackgroundMusic();
  }

  navlog() {
    this.nvt.navigateForward(['/log']);
  }

  ngAfterViewInit() {
    this.initDvdScreensaver();
  }

  ngOnDestroy() {
    // Detiene la música cuando se abandona la página Home
    this.stopBackgroundMusic();
  }
  pauseBackgroundMusic() {
    this.audio.pause();
  }

  playBackgroundMusic() {
    this.audio.loop = true; // Hace que el audio se reproduzca en bucle
    this.audio.volume = 0.5; // Ajusta el volumen (0.0 a 1.0)
    this.audio.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  }

  stopBackgroundMusic() {
    this.audio.pause();
    this.audio.currentTime = 0; // Reinicia la música al inicio para la próxima vez
  }

  initDvdScreensaver() {
    const logo = document.getElementById('dvd-logo') as HTMLElement;

    if (!logo) {
        console.error("Elemento 'dvd-logo' no encontrado. Asegúrate de que esté en el DOM.");
        return;
    }

    logo.style.position = 'absolute'; // Asegura que el logo tenga posición absoluta
    const speed = 2; // Velocidad del movimiento en píxeles
    let posX = window.innerWidth / 100 - logo.offsetWidth / 1; // Posición inicial en X (centro)
    let posY = window.innerHeight / 100 - logo.offsetHeight / 1; // Posición inicial en Y (centro)
    let dirX = 1; // Dirección inicial en X
    let dirY = 1; // Dirección inicial en Y

    function moveLogo() {
        const maxX = window.innerWidth - logo.offsetWidth;
        const maxY = window.innerHeight - logo.offsetHeight;

        // Cambia de dirección al chocar con los bordes
        if (posX <= 0 || posX >= maxX) dirX *= -1;
        if (posY <= 0 || posY >= maxY) dirY *= -1;

        // Actualiza la posición
        posX += speed * dirX;
        posY += speed * dirY;

        // Debug: imprime las posiciones y direcciones en cada cuadro
        //console.log(`posX: ${posX}, posY: ${posY}, dirX: ${dirX}, dirY: ${dirY}`);

        // Aplica la nueva posición
        logo.style.transform = `translate(${posX}px, ${posY}px)`;

        // Llama a la función de nuevo para continuar el movimiento
        requestAnimationFrame(moveLogo);
    }

    // Inicia la animación después de un pequeño retraso para asegurar que el elemento esté en el DOM
    setTimeout(moveLogo, 100);
}

generateQr() {
  const data = `Nombre:${this.idAlumno}`;

  this.qrCodeService.generateQrCode(data).subscribe(
    (blob) => {
      const url = URL.createObjectURL(blob);
      this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(url); // URL segura para el QR
    },
    (error) => {
      console.error('Error generando el código QR:', error);
    }
  );
}

selectPokemon() {
  // Actualizar el Pokémon solo si el nombre es válido
  if (this.pokemonInput) {
    this.selectedPokemon = this.pokemonInput.toLowerCase(); // Convierte a minúsculas para evitar errores de coincidencia
    }
  }
}