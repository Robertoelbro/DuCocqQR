import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rnombre: string = '';
  audio = new Audio('assets/pokemart.mp3');
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el parámetro enviado a través de la URL
    this.rnombre = this.route.snapshot.paramMap.get('rnombre') || '';
    console.log('Nombre recibido: ', this.rnombre);
    this.playBackgroundMusic();
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
    this.audio.currentTime = 0; // Reinicia la música al inicio
  }
  
  pauseBackgroundMusic() {
    this.audio.pause();
  }
}