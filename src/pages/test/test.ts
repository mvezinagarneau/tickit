import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {IonicCanvas} from '../app/components/canvas/canvas';
/*
  Generated class for the Test page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  theCanvas : any;
  context : any;
  numShapes: any;
	shapes: any;
	dragIndex: any;
	dragging: any;
  mouseX: any;
	mouseY: any;
	dragHoldX: any;
	dragHoldY: any;

  

  constructor(public navCtrl: NavController) {


  }

  ionViewDidLoad() {
    console.log('Hello TestPage Page');
    this.theCanvas = document.getElementById("canvasOne");
   
    console.log(this.theCanvas);

   this.context = this.theCanvas.getContext("2d");
   console.log(this.context);

    //this.tick();

   /// this.init();

    //this.ionicCanvas.addText("string")

  }

  tick(){
    console.log("tick");
    /*requestAnimationFrame(() => {
      this.tick();
    });*/
    this.theCanvas.width = 100;
    this.context.fillStyle = "#000000";
		this.context.fillRect(0,0,300,300);

    console.log(this.theCanvas);

  }

  init() {
		this.numShapes = 10;
		this.shapes = [];
		
		//this.makeShapes();
		
		this.drawScreen();
	
		//this.theCanvas.addEventListener("mousedown", mouseDownListener, false);
	}

  makeShapes() {
		var i;
		var tempX;
		var tempY;
		var tempRad;
		var tempR;
		var tempG;
		var tempB;
		var tempColor;
		for (i=0; i < this.numShapes; i++) {
			tempRad = 10 + Math.floor(Math.random()*25);
			tempX = Math.random()*(this.theCanvas.width - tempRad);
			tempY = Math.random()*(this.theCanvas.height - tempRad);
			tempR = Math.floor(Math.random()*255);
			tempG = Math.floor(Math.random()*255);
			tempB = Math.floor(Math.random()*255);
			tempColor = "rgb(" + tempR + "," + tempG + "," + tempB +")";
			var tempShape = {x:tempX, y:tempY, rad:tempRad, color:tempColor};
			this.shapes.push(tempShape);
		}
	}

  drawScreen() {
		//bg
		this.context.fillStyle = "#000000";
		this.context.fillRect(0,0,this.theCanvas.width,this.theCanvas.height);
		
		//this.drawShapes();		
	}

  drawShapes() {
		var i;
		for (i=0; i < this.numShapes; i++) {
			this.context.fillStyle = this.shapes[i].color;
			this.context.beginPath();
			this.context.arc(this.shapes[i].x, this.shapes[i].y, this.shapes[i].rad, 0, 2*Math.PI, false);
			this.context.closePath();
			this.context.fill();
		}
	}

}
