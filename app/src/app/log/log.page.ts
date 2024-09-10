import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  rnombre:string='';

  constructor(private nvt: NavController, private router: Router) {}

  navhome() {
    this.router.navigate(['/home', { rnombre: this.rnombre }]);
  }
 
  navregister() {
    this.nvt.navigateForward(['/register']);
  }
  navsenna() {
    this.nvt.navigateForward(['/new-pass']);
  }
  ngOnInit() {
  }


}
