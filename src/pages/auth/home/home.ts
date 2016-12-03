import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { LoginEmailPage } from '../login-email/login-email';
import { SignUpPage } from '../sign-up/sign-up';
//import { TermsOfServicePage } from '../../terms-of-service/terms-of-service';
import { AuthProvider } from '../../../providers/auth';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'auth-home',
  templateUrl: 'home.html'
})
export class AuthPage {

  error :any;

  constructor(private navCtrl: NavController, private auth: AuthProvider) {}

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  openLoginPage() {
    //this.navCtrl.push(LoginEmailPage);
  }

  openTermsOfService() {
    //this.navCtrl.push(TermsOfServicePage);
  }

  loginUserWithFacebook() {
    this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.error = err;
    });
    console.log("log user with facebook");
  }


  loginUserWithGmail() {
    /*this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.error = err;
    });*/
    console.log("log user with facebook");
  }

}
