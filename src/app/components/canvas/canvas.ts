import { Component } from '@angular/core';
declare var fabric: any;

@Component({
    selector: 'ionic-canvas',
    template: '<canvas id="c"></canvas>',
})

export class IonicCanvas {


    canvas: any;
    constructor() {

    }

    ngAfterViewInit() {

        var width = window.innerWidth;
        var height = width * (4 / 3);

        this.canvas = new fabric.Canvas("c")
        // this.canvas.selection = false;
        // fabric.Object.prototype.selectable = false;

        this.canvas.setHeight(height);
        this.canvas.setWidth(width);

        this.canvas.isDrawingMode = false;
        this.canvas.freeDrawingBrush.width = 6;

        // this.canvas.freeDrawingBrush.color = "";
        // this.canvas.backgroundColor = ""
    }

    toggleDrawingMode() {
        this.canvas.isDrawingMode == true ? this.canvas.isDrawingMode = false : this.canvas.isDrawingMode = true
    }

    changeBackgroundColor(color) {
        this.canvas.backgroundColor = color;
    }

    changeDrawingBrushColor(color) {
        this.canvas.freeDrawingBrush.color = color;
    }

    changeDrawingBrushWidth(width) {
        this.canvas.freeDrawingBrush.width = width
    }

    addText(input, options) {

        // var options = {
        //     left: 100,
        //     top: 100,
        //     fontFamily: "Times New Roman",
        //     fontSize: 50,
        //     fontWeight: "normal",
        //     textDecoration: "normal",
        //     fontStyle: "normal",
        //     stroke: "#000000",
        //     strokeWidth: 1,
        //     textAlign: "center",
        //     lineHeight: 1,
        //     textBackgroundColor: "#3498db",
        // }

        var text = new fabric.Text(input, options);

        this.canvas.add(text);

    }

    undo() {
        var canvasObjects = this.canvas._objects;
        var last = canvasObjects[canvasObjects.length - 1];
        this.canvas.remove(last);
        this.canvas.renderAll();
    }

    save() {
        let image = this.canvas.toDataURL()
        return image
    }



}
