import React from 'react';
import Square from './square';

class Board extends React.Component {
  rows() {
    return [0, 1, 2].map((row) => this.renderRow(row));
  }

  renderRow(rowNum) {
    const squares = [0, 1, 2].map((col) => {
      return this.renderSquare(col + rowNum * 3);
    });

    return (
      <div className="board-row" key={rowNum}>
        {squares}
      </div>
    );
  }

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        isWinningSquare={() => this.props.isWinningSquare(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.rows()}
      </div>
    );
  }
}

export default Board;
