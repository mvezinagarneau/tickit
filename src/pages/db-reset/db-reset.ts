import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';

/*
  Generated class for the DbReset page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-db-reset',
  templateUrl: 'db-reset.html'
})
export class DbResetPage {

  error:any;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public data: DataProvider) {

  }

  ionViewDidLoad() {
    console.log('Hello DbResetPage Page');
    this.createGrades();
    this.createColors()
    this.createStyles()
    this.createGyms();
  }


  createGrades(){

    let grades = [];
   
  
    //Delete all route grades
    this.data.list("/grades").remove();
    
    //Create all route grades
    let startNumber = 5;
    let endNumber = 15;
    let letters = ['a','b','c','d'];
    let score = 0;

    for ( var i = startNumber; i <= endNumber; i++) { 
        score += 50;
       

        if(i<10){
           let g = {"grade":"5."+ i,"points": score,"type":"route"};
           grades.push(g);
          console.log("grade added :" + g );
        }
        else{
          //grades with letters
          for(var j = 0; j < letters.length; j++){
            score += 50;
            let g = {"grade":"5."+i+letters[j],"points": score,"type":"route"};
            grades.push(g);
            console.log("grade added :" + g );
          }
        }
    }

    endNumber = 15;
    score = 450;
    for( var i = 0; i <= endNumber; i++){
       score += 50;
       let g = {"grade":"V"+i,"points": score,"type":"boulder"};
       grades.push(g);
       console.log("grade added :" + grade );
    }

    for(var grade of grades){
     
      this.data.push('/grades',grade).subscribe(data => {
      setTimeout(() => {
         console.log("grade added : " + grade);
          //console.log("grade added : " + data);
        }, 1000);
      }, err => {
          console.log(err);
      });

    }

  }

  createColors(){

    //Delete all route grades
    this.data.list("/colors").remove();

    //Create all colors
    let colors =  ["black","blue","green","orange","pink","purple","red","white", "yellow"];
 
    for(let i = 0; i < colors.length; i++){
      let color = {name:colors[i]};
      this.data.push('/colors',color).subscribe(data => {
        console.log("color added : " + colors);
        //console.log("color added : " + data);
      }, err => {
        setTimeout(() => {
        
          this.error = err;
          console.log(err);
        }, 1000);
      });
    }
  }

  createStyles(){
    //Delete all send types
    this.data.list("/styles").remove();

    //create all send types
    let types =  ["onsight","flash","redpoint"];
     
    for(let i = 0; i < types.length; i++){
      let type = {name:types[i]};
      this.data.push('/styles',type).subscribe(data => {
        console.log("styles added : " + type);
        //console.log("styles added : " + data);
      }, err => {
        setTimeout(() => {
        
          this.error = err;
          console.log(err);
        }, 1000);
      });
    }
  }

  createGyms(){

    //remove all gyms
    this.data.list("/gyms").remove();

    //create all gyms
    let gyms =  ["Délire Beauport", "Délire Sainte-Foy", "Bloc Shop"];
   

    for(let i = 0; i < gyms.length; i++){
      let gym = {"name":gyms[i]};
      this.data.push('/gyms',gym).subscribe(data => {
        console.log("gym added : " + gyms[i]);
        //console.log("gym added : " + data);
      }, err => {
        setTimeout(() => {
        
          this.error = err;
          console.log(err);
        }, 1000);
      });
    }
  }

}
