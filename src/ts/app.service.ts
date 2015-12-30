import { Injectable } from 'angular2/core';
import { TicTacToeAgent } from './tttAgent'

@Injectable()
export class TTTService {

	svgs = {
		["X"]: '../assets/tictactoe-x.svg',
		["O"]: '../assets/tictactoe-o.svg'
	}
	turnText = '';
	agent: TicTacToeAgent;
	playerXorO = 'X';
	agentXorO = 'O';

	gameState = {
		currTurn: "X",
		winner: '',
		cellList: {
			['cell1']: { xoro: '', anim: null }, ['cell2']: { xoro: '', anim: null }, ['cell3']: { xoro: '', anim: null },
			['cell4']: { xoro: '', anim: null }, ['cell5']: { xoro: '', anim: null }, ['cell6']: { xoro: '', anim: null },
			['cell7']: { xoro: '', anim: null }, ['cell8']: { xoro: '', anim: null }, ['cell9']: { xoro: '', anim: null }
		}
	}
	
	constructor() {
		this.agent = new TicTacToeAgent('O');
		this.setTurnText();
	}
	
	private setTurnText() {
		if (!this.gameState.winner) this.turnText = `Next move: ${this.gameState.currTurn}`;
		else if (this.gameState.winner == 'Draw') {
			this.turnText = 'Draw!!';
		} else {
			 this.turnText = `${this.gameState.winner} Wins!!`;
		}
	}
	
	private setAnimation(cellID: string, svgFile: string) {
		return new Vivus(cellID, {duration: 25, file: svgFile, start: 'manual', onReady: this.readyAnimate});
	}
	
	private readyAnimate(vivusAnim) {
		vivusAnim.play(1);
	}
	
	animate(cellID) {
		let clickedCell = this.gameState.cellList[cellID];
		if (clickedCell.anim == null) {
			clickedCell.anim = this.setAnimation(cellID, this.svgs[this.gameState.currTurn]);
			clickedCell.xoro = this.gameState.currTurn;
			let gameCondition = TTTService.checkWinCondition(this.gameState);
			if (gameCondition == 'Win') {
				this.gameState.winner = this.gameState.currTurn;
				this.setTurnText();
			} else if (gameCondition == 'Draw') {
				this.gameState.winner = 'Draw';
				this.setTurnText();
			} else {
				this.nextTurn();
			}
		}
	}
	
	private nextTurn() {
		if (this.gameState.currTurn == "X") this.gameState.currTurn = "O";
		else this.gameState.currTurn = "X";
		this.setTurnText();
		if (this.gameState.currTurn = this.agentXorO) {
			this.animate(this.agent.getNextMove(this.gameState));
		}
	}
	
	static getMoveAt(state, position: string): string {
		return state.cellList[`cell${position}`].xoro;
	}
	
	static checkRow(state, pos1: string, pos2: string, pos3:string): boolean {
		if (!this.getMoveAt(state, pos1)) return false;
		if (this.getMoveAt(state, pos1) == this.getMoveAt(state, pos2) &&
			this.getMoveAt(state, pos2) == this.getMoveAt(state, pos3)) return true;
		else return false;
	}
	
	static checkWinCondition(state): string {
		// Horizontal Wins
		if (this.checkRow(state, '1', '2', '3')) return 'Win';
		if (this.checkRow(state, '4', '5', '6')) return 'Win';
		if (this.checkRow(state, '7', '8', '9')) return 'Win';
		
		// Vertical Wins
		if (this.checkRow(state, '1', '4', '7')) return 'Win';
		if (this.checkRow(state, '2', '5', '8')) return 'Win';
		if (this.checkRow(state, '3', '6', '9')) return 'Win';
		
		// Diagonal Wins 
		if (this.checkRow(state, '1', '5', '9')) return 'Win';
		if (this.checkRow(state, '3', '5', '7')) return 'Win';
		
		for (let key in state.cellList) {
			// No win and empty spaces left on board, continue game
			if (state.cellList[key].xoro == '') return 'None';
		}
		// No win, no empty spaces left on board, draw
		return 'Draw';
	}
	
	resetGame() {
		this.gameState.winner = '';
		this.gameState.currTurn = 'X';
		this.setTurnText();
		// Clear all svg animations and grid references for new game
		var cells = document.getElementsByClassName('cell');
		Array.prototype.forEach.call(cells, (cell) => {
			let containerNode = cell.parentNode;
			if (containerNode.childNodes[1]) {
				containerNode.removeChild(containerNode.childNodes[1]);
			}
		});
		for (let key in this.gameState.cellList) {
			if (this.gameState.cellList.hasOwnProperty(key)) {
				this.gameState.cellList[key].xoro = '';
				this.gameState.cellList[key].anim = null;
			}
		}
	}
}