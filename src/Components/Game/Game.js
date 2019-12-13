import React from "react";

const styles = {
  game: {
    display: "flex",
    justifyContent: "center"
  },
  table: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    minWidth: 120
  },
  row: {
    display: "flex"
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "transparent",
    fontSize: 90,
    border: "2px solid #707070",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "90px"
  }
};
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.X,
      y: this.props.Y,
      value: null
    };
    this.props.state[3].on("NextMove", (x, y) => {
      if (this.state.x === x && this.state.y === y) {
        if (this.props.state[4] === 1) {
          this.setState({ value: "X" });
        } else {
          this.setState({ value: "O" });
        }
      }
    });
  }

  makeMove = () => {
    let model = {
      IdUser: this.props.state[1],
      IdGame: this.props.state[2],
      X: this.state.x,
      Y: this.state.y
    };
    console.info(model);
    this.props.state[3].invoke("MakeAMove", model);
  };

  render() {
    return (
      <div
        style={styles.square}
        onClick={() => {
          this.makeMove();
          if (this.props.state[4] === 1) {
            this.setState({ value: "X" });
          } else {
            this.setState({ value: "O" });
          }
        }}
      >
        {this.state.value}
      </div>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = "Next player: X";
    let game = [];
    for (let i = 0; i < this.props.state[0]; i++) {
      let row = [];
      for (let j = 0; j < this.props.state[0]; j++) {
        row.push(<Square state={this.props.state} X={j} Y={i} />);
      }
      game.push(<div style={styles.row}>{row}</div>);
    }
    return <div style={styles.table}>{game}</div>;
  }
}

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div style={styles.game}>
          <Board state={this.props.state} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
