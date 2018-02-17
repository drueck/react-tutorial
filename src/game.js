import React from 'react';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {squares: Array(9).fill(null)},
      ],
      stepNumber: 0,
      xIsNext: true,
      currentSortOrder: "ASC",
    };
  }

  oppositeSortOrder () {
    return this.state.currentSortOrder === "ASC" ? "DESC" : "ASC";
  }

  toggleSortOrder () {
    this.setState ({
      currentSortOrder: this.oppositeSortOrder(),
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) { return; }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{squares: squares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const data = moveData(history, move);
      const desc = move ?
        `Go to move ${move}: ${data.value} at ${data.row}, ${data.col}` :
        "Go to game start";

      return (
        <li key={move} >
          <button
            className={(move === this.state.stepNumber) ? "current-move" : ""}
            onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (this.state.currentSortOrder === "DESC") {
      moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      const mark = this.state.xIsNext ? 'X' : 'O';
      status = `Next player: ${mark}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.toggleSortOrder()}
              >Sort {this.oppositeSortOrder()}</button>
          </div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function moveData(history, step) {
  const noMove = {...moveCell(0), value: null};
  if (step === 0) { return noMove; }

  const previous = history[step - 1].squares;
  const current = history[step].squares;

  for (let i = 0; i < 9; i++) {
    if (previous[i] == null && current[i] != null) {
      return {...moveCell(i), value: current[i]};
    }
  }

  // this should never happen unless the data is unexpected
  return noMove;
}

function moveCell(moveIndex) {
  return {
    row: Math.floor(moveIndex / 3) + 1,
    col: (moveIndex % 3) + 1
  };
}

export default Game;
