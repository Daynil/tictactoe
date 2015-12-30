import { Component, View } from 'angular2/core';
import { TTTService } from './app.service';

@Component({
	selector: 'my-app',
	viewBindings: [TTTService]
})
@View({
	templateUrl: '../html/app.html',
	styleUrls: ['../css/app.css']
})
export class BaseComponent {
	
	constructor(public tttService: TTTService) {

	}
	
	animate(cellID) {
		this.tttService.animate(cellID);
	}
	
	resetGame() {
		this.tttService.resetGame();
	}
}