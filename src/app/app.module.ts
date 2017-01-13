import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { AuthPage } from '../pages/auth/home/home';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { RoutesListPage } from '../pages/routes/home/home';
import { RouteAddPage } from '../pages/routes/route-add/route-add';
import { RouteDetailPage } from '../pages/routes/route-detail/route-detail';
import { DbResetPage } from '../pages/db-reset/db-reset';
import { TestPage } from '../pages/test/test';
//import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/data';
import { Ionic2RatingModule } from 'ionic2-rating';
//import {IonicCanvas} from '../app/components/canvas/canvas';

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
    AuthPage,
    LoginEmailPage,
    RoutesListPage,
    RouteAddPage,
    RouteDetailPage,
    DbResetPage,
    TestPage
 //   IonicCanvas

    
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    //ReactiveFormsModule,
    FormsModule,
    Ionic2RatingModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    AuthPage,
    LoginEmailPage,
    RoutesListPage,
    RouteAddPage,
    RouteDetailPage,
    DbResetPage,
    TestPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthProvider,
  DataProvider
  ]
})
export class AppModule {}
