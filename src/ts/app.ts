import { Component, View } from 'angular2/core';

@Component({
	selector: 'my-app'
})
@View({
	templateUrl: '../html/app.html',
	styleUrls: ['../css/app.css']
})
export class BaseComponent {
	oanimate;
	
	constructor() {
		this.oanimate = this.setAnimation('oanimate', '../assets/tictactoe-x.svg');
	}
	
	setAnimation(cellID: string, svgFile: string) {
		return new Vivus(cellID, {duration: 25, file: svgFile, start: 'manual'});
	}
	
	animate() {
		this.oanimate.play(1);
	}
}