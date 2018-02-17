import React from 'react';

class Square extends React.Component {
  squareClasses() {
    return this.props.isWinner() ? "square winner" : "square";
  }

  render() {
    return (
      <button
        className={this.squareClasses()}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
