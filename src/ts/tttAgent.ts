import { TTTService as game } from './app.service';

interface MoveScore {
	move: string,
	score: number
}

export class TicTacToeAgent {
	agentXorO: string;
	opponentXorO: string;
	
	depthTracker = 0;
	recursiveDepth = 1000;
	
	constructor(xoro: string) {
		this.agentXorO = xoro;
		if (xoro == 'X') this.opponentXorO = 'O';
		else this.opponentXorO = 'X';
	}
	
	private getLegalMoves(state): string[] {
		let legalMoves = [];
		for (let key in state.cellList) {
			if (state.cellList.hasOwnProperty(key)) {
				// Any empty space is a legal move.
				if (!state.cellList[key].xoro) legalMoves.push(key);
			}
		}
		return legalMoves;
	}
	
	private generateSuccessorState(prevState, move) {
		let state = JSON.parse(JSON.stringify(prevState)); // Clone to avoid reference issues
		state.cellList[move].xoro = state.currTurn;
		if (state.currTurn == "X") state.currTurn = "O";
		else state.currTurn = "X";
		return state;
	}
	
	public getNextMove(stateOrig) {
		let state = JSON.parse(JSON.stringify(stateOrig));
		//let moveUtility = this.getUtility(state, true);
		let moveScore = this.minimax(state);
		this.depthTracker = 0;
		return moveScore.move;
	}
	
	private scoreGame(winner: string): number {
		let score = 0;
		if (winner == this.agentXorO) score = 10;
		else if (winner == this.opponentXorO) score = -10;
		return score;
	}
	
	private getOptimalScore(minormax: string, movesScores: MoveScore[]): MoveScore {
		let optimal: MoveScore;
		let minTracker = 9999;
		let maxTracker = -9999;
		
		movesScores.forEach( moveScore => {
			if (minormax == 'max') {
				if (moveScore.score > maxTracker) {
					maxTracker = moveScore.score;
					optimal = moveScore;
				}
			} else {
				if (moveScore.score < minTracker) {
					minTracker = moveScore.score;
					optimal = moveScore;
				}
			}
		});
		
		return optimal;
	}
	
	private minimax(state): MoveScore {
		let gameCondition = game.checkWinCondition(state);
		if (gameCondition.state == 'Win' || gameCondition.state == 'Draw'){
			return {move: '', score: this.scoreGame(gameCondition.winner)};	
		} 
		let movesScores: MoveScore[] = [];  // An array of each move and the value it produces at the end of the game
		
		this.getLegalMoves(state).forEach( move => {
			let nextState = this.generateSuccessorState(state, move);
			let nextStateMS = this.minimax(nextState);
			movesScores.push({move: move, score: nextStateMS.score});
		});
		
		if (state.currTurn == this.agentXorO) {
			let bestMoveScore = this.getOptimalScore('max', movesScores);
			return bestMoveScore;
		} else {
			let bestMoveScore = this.getOptimalScore('min', movesScores);
			return bestMoveScore;
		}
	}
	
}