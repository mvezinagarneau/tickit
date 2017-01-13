import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { AuthPage } from '../pages/auth/home/home';
import { RoutesListPage } from '../pages/routes/home/home';
//import { RouteDetailPage } from '../pages/routes/route-detail/route-detail';
//import { RouteAddPage } from '../pages/routes/route-add/route-add';
//import { DbResetPage } from '../pages/db-reset/db-reset';
//Providers
//import { AuthProvider } from '../providers/auth';
//import { DataProvider } from '../providers/data';
import { TestPage } from '../pages/test/test';

import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

 //rootPage: any = DbResetPage;
  rootPage: any = AuthPage;
  user : any;
  isAppInitialized: boolean = false;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, protected data: DataProvider,
    protected auth: AuthProvider) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Routes', component: RoutesListPage },
      { title: 'Boulders', component: RoutesListPage },
    ];

    this.user = {
      image: ''
    };

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

       this.nav.setRoot(this.rootPage);
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(RoutesListPage);
          this.isAppInitialized = true;
        }
        this.user = data;
       // console.log(this.user);
      }, err => {
        this.nav.setRoot(AuthPage);
      });
      StatusBar.styleDefault();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Routes" || page.title == "Boulders"){
      this.nav.setRoot(page.component, {"climbType":page.title});
    }else{
      this.nav.setRoot(page.component);
    }
    
    console.log(page.title);
  }
}
