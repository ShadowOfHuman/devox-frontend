import React from "react";
import {User} from "../../Models/User";
import {CircularProgress} from "@material-ui/core";

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
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid #707070",
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
      IdUser: this.props.state[1]-0,
      IdGame: this.props.state[2].idGame,
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


  constructor(props, context) {
    super(props, context);
    this.state={
      waitingUser: true,
      waitingUserMove: true,
      nextUserMove: User,
      game: this.props.game

    }
  }

  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = "Next player: X";
    let game = [];
    for (let i = 0; i < this.props.state[0]; i++) {
      let row = [];
      for (let j = 0; j < this.props.state[0]; j++) {
        row.push(<Square state={this.props.state} X={j} Y={i}/>);
      }
      game.push(<div style={styles.row}>{row}</div>);
    }
    return <div style={styles.table}>{game}</div>;
  }
}

export class GameField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state={
      game: this.props.game
    };
    console.info(this.state.game);
  }

  render() {
    return (
      <div className="game">
        {!this.state.waitingUser && <div>`Connected with{this.state.game.secondUser.username}`</div>}
        <div className="game-info">
          Waiting second user: { this.state.waitingUser && <CircularProgress/>}
            <ol>{/* TODO */}</ol>
        </div>
        <div style={styles.game}>
          <Board game={this.state.game} />
        </div>
      </div>
    );
  }
}
