import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  rnombre: string = '';
  audio = new Audio('assets/pokemart.mp3'); // Ruta de la música de fondo

  constructor(private router: Router, private storage: Storage ) {}

  async ngOnInit() {
    // Obtener el parámetro enviado a través de la URL
    this.rnombre = await this.storage.get('registeredName') || '';
    console.log('Nombre recibido: ', this.rnombre);

    // Reproduce la música solo cuando se accede a la página Home
    this.playBackgroundMusic();
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
    const speed = 2; // Velocidad del movimiento
    let posX = 1;
    let posY = 1;
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

      // Aplica la nueva posición
      logo.style.transform = `translate(${posX}px, ${posY}px)`;

      // Llama a la función de nuevo para continuar el movimiento
      requestAnimationFrame(moveLogo);
    }
  }
  }
