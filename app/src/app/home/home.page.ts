import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rnombre: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el parámetro enviado a través de la URL
    this.rnombre = this.route.snapshot.paramMap.get('rnombre') || '';
    console.log('Nombre recibido: ', this.rnombre);
  }
}