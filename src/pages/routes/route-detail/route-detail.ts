import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams, ToastController } from 'ionic-angular';
import { DataProvider } from '../../../providers/data';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { RouteAddPage } from '../route-add/route-add';
import { Route } from '../../../models/route-model';
//import { Ionic2Rating } from 'ionic2-rating';

/*
  Generated class for the RouteDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-route-detail',
  templateUrl: 'route-detail.html',
})
export class RouteDetailPage {
  
  form:any;
  item: FirebaseObjectObservable<any>;
  styles: FirebaseListObservable<any>;
  grades: FirebaseListObservable<any>;
  send : FirebaseObjectObservable<any>;

  error: any;
  route : Route;
  user :any;
  climbType : String;

 // private rate = 2.5;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public data: DataProvider,  public params : NavParams, private toastCtrl: ToastController) {
     //this.getItem("-KZm9dznEBN_9zSDnn7p");
     this.item = params.get("route");
     this.climbType = params.get("climbType");
     console.log(this.item);
    
    this.getGrades();
    this.getStyles();
    this.form= {
          style: '',
          grade: this.item["grade"],
          rate: 0
     }
     
      
    this.data.object('/sends/' + firebase.auth().currentUser["uid"] + '/' + this.climbType.toLowerCase() + '/' + this.item["$key"]).subscribe(
    send => {
        this.send = send; 
        this.form= {
                style: this.send["style"],
                grade: this.send["grade"],
                rate: this.send["rate"]
          }
        console.log("send : " + JSON.stringify(this.send));
   
    });

    
  }

  ionViewDidLoad() {
    console.log('Hello RouteDetailPage Page');
    
   
  }

  getItem(id: string){
    console.log("get item");
    this.item = this.data.object('/routes/'+id);
    console.log(this.item);
  }

  getStyles(){
    console.log("get styles");
    this.styles = this.data.list('/styles');
    console.log(this.styles);
  }

 getGrades(){

    //this.items = this.data.list('/routes');
    var options = {
          query: {
            orderByChild: "type",
            equalTo: this.climbType.toLowerCase().slice(0,this.climbType.length-1)
          }
        };
    this.grades = this.data.list('/grades',options);
  }


  archive(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
    
      //console.log('/routes/'+ this.item["$key"]);
      this.data.update('/'+ this.climbType.toLowerCase() + '/'+ this.item["$key"],{archived:true});
      
       setTimeout(() => {
        loading.dismiss();
      }, 1000);
  }

  openEditPage()
  {
     this.navCtrl.push(RouteAddPage, {
         route: this.item,
         climbType: this.climbType
        } );
  }

  delete(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    
    //this.route = new Route(this.form.name,this.form.grade,this.form.color);
   // console.log(JSON.stringify(this.route));
    
    this.data.remove('/'+ this.climbType.toLowerCase() + '/'+ this.item["$key"]).subscribe(data => {
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

    this.navCtrl.pop();

  }

  /*getSend(){

    send => {
        this.send = send; 
        this.form= {
                style: this.send["style"],
                grade: this.send["grade"],
                rate: this.send["rate"]
          }
        console.log("send : " + JSON.stringify(this.send));
    }
    

  }*/

  saveSend(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log(this.item);
    this.send = this.data.object('/sends/' + firebase.auth().currentUser["uid"] + '/' + this.climbType.toLowerCase() + '/' + this.item["$key"]);
    console.log(this.send.$ref.key);
    this.send.set({
        style : this.form.style,
        grade : this.form.grade,
        rate : this.form.rate,
        date : new Date().getTime()
      });

      loading.dismiss();

      this.navCtrl.pop();
    
    /*this.data.push('/sends/' + firebase.auth().currentUser["uid"] + '/' + this.climbType.toLowerCase() + '/' + this.item["$key"],
      {
        style : this.form.style,
        grade : this.form.grade,
        rate : this.form.rate
      }).subscribe(data => {
      setTimeout(() => {
        
        loading.dismiss();
        console.log("route added : " + data);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.error = err;
      }, 1000);
    });*/

    /*
     route : this.item["$key"],
        type: this.climbType.toLowerCase().slice(0, this.climbType.length-1),
        style : this.form.style,
        grade : this.form.grade,
        rate : this.form.rate*/

  }

  share(){
    let toast = this.toastCtrl.create({
    message: 'Your send has been shared succesfully!',
    duration: 3000,
    position: 'bottom'
  });
   toast.present();
  console.log("shared!");
  }

}
