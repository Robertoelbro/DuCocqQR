import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  rnombre:string='';
  constructor(private nvt: NavController, private router:Router) { }
  navlog() {
    this.nvt.navigateForward(['/log']);
  }
  navhome() {
    this.router.navigate(['/home', { rnombre: this.rnombre }]);
  }
  ngOnInit() {
  }

}
