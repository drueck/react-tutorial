import React from 'react';
import Square from './square';

class Board extends React.Component {
  renderRow (rowNum) {
    const squares = [0, 1, 2].map((col) => {
      return this.renderSquare(col + rowNum * 3);
    });

    return (
      <div className="board-row" key={rowNum}>
        {squares}
      </div>
    );
  }

  renderSquare (i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [0, 1, 2].map((row) => this.renderRow(row));

    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Board;
