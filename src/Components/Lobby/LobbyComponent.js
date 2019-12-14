import React from "react";
import { Box, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import * as SignalR from "@microsoft/signalr";
import { GamesPreview } from "./GamesPreview";

const styles = {
  formControl: {
    marginLeft: 50,
    marginRight: 50,
    minWidth: 120
  },
  box: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    padding: 22,
    paddingLeft: 70,
    paddingRight: 70
  },
  button: {
    alignSelf: "center",
    marginLeft: "auto"
  },
  container: {
    paddingLeft: 50,
    paddingRight: 50
  }
};

export class LobbyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      gameId: 0,
      size: 3,
      labelWidth: 0,
      games: [
        {
          name: "Самый ы сервер",
          host: "ы",
          size: "4x4",
          password: "ы",
          userId: 1,
          gameId: 1
        }
      ],
      hubConnection: null
    };
  }

  componentDidMount() {
    this.state.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl("/game")
      .build();
    this.state.hubConnection.baseUrl = "http://localhost/game";
    this.state.hubConnection
      .start()
      .then(() => {
        this.loadGames();
      })
      .catch(function(err) {
        console.error(err);
      });
    this.state.hubConnection.on("CreatedGame", game => {
      let myObj = {
        name: "Самый топовый сервер",
        host: "ShadowOfHuman",
        size: "4x4",
        password: "Ага",
        userId: this.state.userId,
        gameId: this.state.gameId
      };
      let games = this.state.games;
      //games.push(game);
      this.setState({gameId: game.data["IdUser"]});
      games.push(myObj);
      this.setState({ games: games });
    });
  }

  onConnectClickHandler = (gameId,player) => {
    this.state.hubConnection.invoke("ConnectToGame", {
            "IdGame": gameId,
            "IdUser": this.state.userId-0
        }).catch(err => console.error(err));
    let state = [
      this.state.size,
      this.state.userId,
      this.state.gameId,
      this.state.hubConnection,
      player
    ];
    console.info(state);
    this.props.switchToGame(state);
  };

  handleSizeChange = event => {
    this.setSize(event.target.value);
  };
  handleNameChange = event => {
    this.setName(event.target.value);
  };
  handlePasswordChange = event => {
    this.setPassword(event.target.value);
  };

  loadGames = () => {
    let myObj = {
      name: "Самый топовый сервер",
      host: "ShadowOfHuman",
      size: "4x4",
      password: "Ага",
      userId: this.state.userId,
      gameId: this.state.gameId
    };
    let games = this.state.games;
    games.push(myObj);
    this.setState({ games: games });
    this.state.hubConnection.invoke('GetAll').then(r => {
      console.info(r);
      let games = this.state.games;
      r.forEach((item) => {
        console.info(item);
        let myObj = {
          name: "ЪЕЪ",
          host: "ShadowOfHuman",
          size: "3x3",
          password: "Ага",
          userId: this.state.userId,
          gameId: item.id
        };
        console.info(myObj);
        games.push(myObj);
      });
      this.setState({games: games})});
  };

  setPassword(password) {
    this.setState({ password: password });
  }

  setName(name) {
    this.setState({ name: name });
  }

  setSize(size) {
    this.setState({ size: size });
  }

  setGameId(gameId) {
    this.setState({ gameId: gameId });
  }

  onClickHandler = () => {
    const model = {
      IdCreatedUser: this.state.userId,
      Title: this.state.name,
      Size: this.state.size
    };
    const curModel = {
      IdCreatedUser: this.state.userId
    };
    this.state.hubConnection
      .invoke("CreateGame", model).then(response =>{
        console.info(response);
      this.setState({gameId: response});
      let state = [
        this.state.size,
        this.state.userId,
        this.state.gameId,
        this.state.hubConnection,
        1
      ];
      this.props.switchToGame(state);
      console.info(this.state.gameId);
      console.info(this.state.userId);
    })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <div style={styles.container}>
          <Box style={styles.box}>
            <TextField
              label="Server name"
              variant="outlined"
              onChange={this.handleNameChange}
            />
            <FormControl variant="outlined" style={styles.formControl}>
              <InputLabel ref={0} id="demo-simple-select-outlined-label">
                Size
              </InputLabel>
              <Select
                labelid="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.size}
                onChange={this.handleSizeChange}
                labelWidth={this.state.labelWidth}
              >
                <MenuItem value="3">
                  <em>3x3</em>
                </MenuItem>
                <MenuItem value={4}>4x4</MenuItem>
                <MenuItem value={5}>5x5</MenuItem>
                <MenuItem value={6}>6x6</MenuItem>
                <MenuItem value={7}>7x7</MenuItem>
                <MenuItem value={8}>8x8</MenuItem>
                <MenuItem value={9}>9x9</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Password"
              variant="outlined"
              onChange={this.handlePasswordChange}
            />
            <Button
              align="right"
              variant="contained"
              color="primary"
              onClick={() => this.onClickHandler()}
              style={styles.button}
            >
              Create
            </Button>
          </Box>
        </div>
        <GamesPreview
          games={this.state.games}
          clickHandler={this.onConnectClickHandler}
        />
      </div>
    );
  }
}
