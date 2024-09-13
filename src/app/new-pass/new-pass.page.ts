import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.page.html',
  styleUrls: ['./new-pass.page.scss'],
})
export class NewPassPage implements OnInit {

  constructor(private nvt: NavController) {}

  navlog() {
    this.nvt.navigateForward(['/log']);
  }
 
  navregister() {
    this.nvt.navigateForward(['/register']);
  }

  ngOnInit() {
  }

}
