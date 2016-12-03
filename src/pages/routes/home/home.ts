import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Routes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-routes',
  templateUrl: 'home.html'
})
export class RoutesListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RoutesPage Page');
  }

}
