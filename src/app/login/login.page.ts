import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
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
  private userSubscription: Subscription | undefined;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  printUser($event: any) {
    this.router.navigate(['dashboard']);
  }
  printError($event: any) {
    console.log($event);
  }

  private getUserDetails(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    // const userBusyIndicatorId = this.busyIndicator.show('getUserDetails()');
    this.userSubscription = this.angularFireAuth.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
