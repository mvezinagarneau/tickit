import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../../providers/auth';
import { LoginEmailPage } from '../login-email/login-email';


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  //form : FormGroup;
  form : any;
  error : any;

  constructor(public navCtrl: NavController, 
    private auth: AuthProvider,
    /*private formBuilder: FormBuilder,*/ 
    private loadingCtrl: LoadingController) {

     /*this.form = this.formBuilder.group({;
       email: ['',Validators.required],
       password: ['',Validators.required]
     });*/
     this.form = {
      email: '',
      password: ''
    }
    this.error = '';
  }

  register(){
   // console.log("user :" + this.form.get("email").value);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.registerUser(this.form).subscribe(registerData => {
      this.auth.loginWithEmail(registerData).subscribe(loginData => {
        setTimeout(() => {
          loading.dismiss();
          //his.navCtrl.setRoot(HomePage);
        }, 1000);
      }, loginError => {
        setTimeout(() => {
          loading.dismiss();
          this.error = loginError;
        }, 1000);
      });
    }, registerError => {
      setTimeout(() => {
        loading.dismiss();
        this.error = registerError;
      }, 1000);
    });

  }

  openLoginPage(){
    this.navCtrl.push(LoginEmailPage);
  }
  ionViewDidLoad() {
    console.log('Hello SignUpPage Page');
  }

}
