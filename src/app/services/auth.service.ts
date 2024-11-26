import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private lnombre: string = '';
  private lcontrasenna: string = '';

  setCredentials(name: string, password: string): void {
    this.lnombre = name;
    this.lcontrasenna = password;
  }

  getCredentials(): { name: string; password: string } {
    return {
      name: this.lnombre,
      password: this.lcontrasenna,
    };
  }
}
