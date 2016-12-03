import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { AuthPage } from '../pages/auth/home/home';

//import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

import { AuthProvider } from '../providers/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyDeO1j2e1DbwxIjG6HLxTxxPTRYsuyttyI',
  authDomain: 'tickit-c4f01.firebaseapp.com',
  databaseURL: 'https://tickit-c4f01.firebaseio.com',
  storageBucket: 'tickit-c4f01.appspot.com',
  messagingSenderId: "524910113033" ,
};

@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    AuthPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    //ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    AuthPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthProvider
  ]
})
export class AppModule {}
