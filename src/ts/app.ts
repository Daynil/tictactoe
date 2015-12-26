import { Component, View } from 'angular2/core';

@Component({
	selector: 'my-app'
})
@View({
	templateUrl: '../html/app.html',
	styleUrls: ['../css/app.css']
})
export class BaseComponent {
	
	xoro = "X";
	svgs = {
		["X"]: '../assets/tictactoe-x.svg',
		["O"]: '../assets/tictactoe-o.svg'
	}
	cellList = {
		['cell1']: null,
		['cell2']: null,
		['cell3']: null
	}
	
	constructor() {
		//this.oanimate = this.setAnimation('oanimate', '../assets/tictactoe-x.svg');
	}
	
	setAnimation(cellID: string, svgFile: string) {
		return new Vivus(cellID, {duration: 25, file: svgFile, start: 'manual'});
	}
	
	readyAnimate(cellID) {
		console.log(this.cellList[cellID]);
		this.cellList[cellID].play(1);
	}
	
	animate(cell) {
		//this.oanimate.play(1);
		//console.log(cell);
		if (this.cellList[cell.id] == null) {			
			console.log(cell.id, typeof cell.id);
			console.log(this.svgs[this.xoro], typeof this.svgs[this.xoro]);
			this.cellList[cell.id] = this.setAnimation(cell.id, this.svgs[this.xoro]);
			//this.cellList[cell.id] = "hello";
			console.log(this.cellList[cell.id]);
			console.log(this.cellList[cell.id].isReady);
		}
		else this.cellList[cell.id].play(1);
	}
	
	switchXO() {
		if (this.xoro == "X") this.xoro = "O";
		else this.xoro = "X";
	}
}