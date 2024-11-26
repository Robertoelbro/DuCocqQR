import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  private apiUrl = 'https://api.qrserver.com/v1/create-qr-code/';

  constructor(private http: HttpClient) {}

  // Generación del código QR, aceptando tanto para profesor como para alumno
  generateQrCode(data: string, tipo: 'profesor' | 'alumno'): Observable<Blob> {
    // Crear un objeto con la información relevante para el tipo de usuario
    let qrData: string;

    if (tipo === 'profesor') {
      // Generar los datos del profesor
      qrData = JSON.stringify({
        tipo: 'profesor',
        id: data,  // ID del profesor
        nombre: '',  // Nombre del profesor (puedes hacer que se pase dinámicamente)
        asistencia: 'activa'
      });
    } else {
      // Generar los datos del alumno
      qrData = JSON.stringify({
        tipo: 'alumno',
        id: data,  // ID del alumno (puedes pasarlo dinámicamente también)
        asistencia: 'pendiente',
        fecha: new Date().toISOString()  // Fecha y hora actuales
      });
    }

    const params = new HttpParams()
      .set('data', qrData) // Usar el JSON con la información
      .set('size', '200x200'); // Tamaño del QR

    return this.http.get(this.apiUrl, { params, responseType: 'blob' });
  }
}
