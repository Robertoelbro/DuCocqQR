import { Component, OnInit } from '@angular/core';
import { QrCodeService } from '../services/qrcode.service';  // Importa el servicio de QR
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  // Para manejar la URL segura
import { Storage } from '@ionic/storage-angular';  // Para acceder al almacenamiento local

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  qrUrl: SafeUrl | undefined;  // Propiedad para almacenar la URL segura del QR

  constructor(
    private qrCodeService: QrCodeService, 
    private sanitizer: DomSanitizer,
    private storage: Storage  // Acceder al almacenamiento
  ) {}

  ngOnInit(): void {
    // Llamamos a la función para generar el QR cuando la página se carga
    this.generateQr();  
  }

  /**
   * Genera el código QR para el profesor con el nombre y tipo de usuario.
   */
  generateQr(): void {
    // Recuperar el nombre del profesor desde el almacenamiento local
    this.storage.get('registeredName').then((nombre) => {
      // Obtener la fecha y hora actuales
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();  // Formato de la fecha (ejemplo: "26/11/2024")
      const formattedTime = currentDate.toLocaleTimeString();  // Formato de la hora (ejemplo: "10:30:00 AM")
  
      // Datos que se incluirán en el QR
      const data: string = `Nombre: ${nombre}, Fecha: ${formattedDate}, Hora: ${formattedTime}, Sala: v101`;
  
      // Llamamos al servicio para generar el QR con los datos
      this.qrCodeService.generateQrCode(data, 'profesor').subscribe(
        (blob: Blob) => {
          const url: string = URL.createObjectURL(blob);  // Crear la URL del QR
          this.qrUrl = this.sanitizer.bypassSecurityTrustUrl(url);  // Sanitizar la URL para usarla en el HTML
        },
        (error: any) => {
          console.error('Error generando el código QR:', error);  // Manejo de errores
        }
      );
    });
  }
}
