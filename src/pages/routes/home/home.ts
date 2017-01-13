import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../../providers/data';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { RouteAddPage } from '../route-add/route-add';
import { RouteDetailPage } from '../route-detail/route-detail';
//import { CommonModule } from '@angular/common';
//import { Route } from '../../../models/route-model';
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

  items: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;
  user: FirebaseObjectObservable<any>;;
  isAdmin: Boolean = false;
  climbType: String = "Routes";
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public data: DataProvider, public params?:NavParams) {
   
    //console.log(params);
    //get logged in user
    var currentUser = firebase.auth().currentUser;

    //get user profile
    if (currentUser != null) {
       data.object("/users/" + currentUser["uid"]).subscribe(user => {
        this.user = user;
        if(user["role"] == 'admin'){
          this.isAdmin = true;
        }
        //console.log(user["role"]);

       });
      
    }

    if( params.get("climbType") != undefined){
      this.climbType = params.get("climbType")
      //console.log(this.type);
    }
   
   this.getList();
     
  }

  ionViewDidLoad() {
    console.log('Hello RoutesPage Page');

  }

  getList(){

    var options = {
          query: {
            orderByChild: 'archived',
            equalTo: false
          }
        };
    this.items = this.data.list('/'+this.climbType.toLowerCase(),options);
    
  }

  openRouteAddPage(){
    console.log(this.climbType);
    this.navCtrl.push(RouteAddPage,{climbType: this.climbType});
  }

  openRouteDetailPage(item){
      // this.params.data.push({route: item});
       //console.log(this.params.data.toString());
       this.navCtrl.push(RouteDetailPage,{
         route: item,
         climbType: this.climbType
        });
  }

  filterItems(searchTerm){
 
       /* return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });   */  
 
    }

}
