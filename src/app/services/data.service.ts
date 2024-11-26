import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  // Guardar un usuario
  async saveUser(user: { id: string; nombre: string; tipo: string }) {
    const users = (await this.storage.get('users')) || [];
    users.push(user);
    await this.storage.set('users', users);
  }

  // Obtener todos los usuarios
  async getUsers() {
    return (await this.storage.get('users')) || [];
  }

  // Guardar asistencia
  async saveAttendance(attendance: { idClase: string; idAlumno: string; timestamp: string }) {
    const attendances = (await this.storage.get('attendances')) || [];
    attendances.push(attendance);
    await this.storage.set('attendances', attendances);
  }

  // Obtener asistencias
  async getAttendances() {
    return (await this.storage.get('attendances')) || [];
  }
}