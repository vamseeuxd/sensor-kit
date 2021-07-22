import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  providers = AuthProvider;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  printUser($event: any) {
    console.log($event);
    this.router.navigate(['dashboard']);
  }
  printError($event: any) {
    console.log($event);
  }
}
