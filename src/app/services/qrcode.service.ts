import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  private apiUrl = 'https://api.qrserver.com/v1/create-qr-code/';

  constructor(private http: HttpClient) {}

  generateQrCode(data: string): Observable<Blob> {
    const params = new HttpParams()
      .set('data', data) // Datos que deseas incluir en el QR
      .set('size', '200x200'); // Tamaño del QR

    return this.http.get(this.apiUrl, { params, responseType: 'blob' });
  }
}