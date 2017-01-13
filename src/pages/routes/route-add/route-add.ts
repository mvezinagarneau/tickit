import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../../providers/data';
import { Route } from '../../../models/route-model';
import { RoutesListPage } from '../home/home';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
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

  form: any;
  error: any;
  route : Route;
  action: String = "Add";

  item: FirebaseObjectObservable<any>;
  grades: FirebaseListObservable<any>;
  colors: FirebaseListObservable<any>;
  climbType: String;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private data: DataProvider, public params?:NavParams) {

   
    this.item = params.get("route");
    this.climbType = params.get("climbType");

    console.log(this.climbType);

    //console.log(this.item);

    if(this.item == undefined){
      this.form= {
          name: '',
          grade: '',
          color: ''

      }

    }
    else{
      this.form= {
          name: this.item["name"],
          grade: this.item["grade"],
          color: this.item["color"]
      }

      this.action = "update";
    }
    
  
  }

  ionViewDidLoad() {
    console.log('Hello RouteAddPage Page');
    this.getGrades();
    this.getColors();
  }
  
  getGrades(){
    
     var options = {
          query: {
            orderByChild: "type",
            equalTo: this.climbType.toLowerCase().slice(0,this.climbType.length-1)
          }
        };
   
    this.grades = this.data.list('/grades',options);
  }

   getColors(){

    
    this.colors = this.data.list('/colors')

  
  }


  save(){

    if(this.item == undefined){
        console.log("create")
      this.create();
    
    }
    else{
      this.update(this.item["$key"]);
    }

     
    this.navCtrl.push(RoutesListPage, {climbType : this.climbType});

  }
  create(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    
    var currentUser = firebase.auth().currentUser;
    
    this.route = new Route(this.form.name,this.form.grade,this.form.color,currentUser.email);
    //console.log(JSON.stringify(this.route));
    
    this.data.push('/'+ this.climbType.toLowerCase(),this.route).subscribe(data => {
      setTimeout(() => {
        
        loading.dismiss();
        //console.log("route added : " + data);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.error = err;
      }, 1000);
    });


  }

  update(key:string){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      
      this.route = new Route(this.form.name,this.form.grade,this.form.color);
     // console.log(JSON.stringify(this.route));
      //delete this.route.$key;

      //console.log('/' + this.climbType + '/'+ key);
      this.data.update('/' + this.climbType.toLowerCase() + '/'+ key,this.route);
      
       setTimeout(() => {
        loading.dismiss();
      }, 1000);
  }

}
