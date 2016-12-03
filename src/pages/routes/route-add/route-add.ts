import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RouteAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-route-add',
  templateUrl: 'route-add.html'
})
export class RouteAddPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RouteAddPage Page');
  }

}
