import React from 'react';
import {Box, TextField} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import {GamesPreview} from "../Lobby/GamesPreview";
import {GameService} from "./GameService";
import {CookieService} from "../CookieService";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import {GameField} from "./GameField";
import {Game} from "../../Models/Game";
import Dialog from "@material-ui/core/Dialog";
import {User} from "../../Models/User";
import * as SignalR from "@microsoft/signalr";

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

export class GamesPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      gameId: 0,
      size: 3,
      game: Game,
      games: [],
      openGameDialog: false,
      context: props.context,
      hubConnection: null,
      isFirstUser: true
    };
    this.state.hubConnection = new SignalR.HubConnectionBuilder().withUrl("http://localhost/game").build();
    this.state.hubConnection.start().then(()=>console.info('Connection Started')).catch(error=>console.error(error));
    this.state.hubConnection.on('UserWasBeenConnection', (userId, userNameSecondUser) => {
      let newGame = this.state.game;
      console.info(userId);
      let game = new Game();
      let user = new User();
      user.id = userId;
      user.username = userNameSecondUser;
      game.id = newGame.id;
      game.firstUser = newGame.firstUser;
      game.size = newGame.size;
      game.title=newGame.title;
      game.secondUser = user;
      this.setState({
        game: game,
        waitingUser: false,
        openGameDialog: true,
      });
    });
  }

  loadGames = () => {
    GameService.getAllGame()
      .then(response => {
        this.setState({games: response.data});
      })
      .catch(error=>{
        alert(error);
      });

  };

  componentDidMount() {
    this.loadGames();
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


  setName(name) {
    this.setState({ name: name });
  }

  setSize(size) {
    this.setState({ size: size });
  }

  setGameId(gameId) {
    this.setState({ gameId: gameId });
  }

  handleCloseGameDialog = () => {
    this.setState({openGameDialog: false,
    isFirstUser: true});
  };

  handleCloseConnectDialog=()=>{

  };

  handleOpenConnectGameDialog = (gameId, gameTitle, gameSize) =>{
    this.setState({name: gameTitle, size: gameSize})
    let connectModel = {
      idGame: gameId,
      idUser: CookieService.getUserId()
    };
    this.state.hubConnection.invoke("ConnectToGame", connectModel).then(response => {
      let newGame = new Game();
      let user = new User();
      user.id = CookieService.getUserId();
      user.username = CookieService.getUsername();
      newGame.id = gameId;
      newGame.secondUser = user;
      newGame.size = this.state.size;
      newGame.title = this.state.name;

      this.setState({
        isFirstUser: false,
        openGameDialog: true,
        game: newGame
      });
    });
  };

  handleOpenGameDialog = () => {
    if (this.state.name===""){
      return;
    }
    GameService.createGame(CookieService.getUserId(), this.state.name, this.state.size)
      .then(response =>{
        let newGame = new Game();
        let user = new User();
        user.id = CookieService.getUserId();
        user.username = CookieService.getUsername();
        newGame.id = response.data["idGame"];
        newGame.firstUser = user;
        newGame.size = this.state.size;
        newGame.title = this.state.name;
        this.setState({game: newGame});
        this.state.hubConnection
            .invoke('CreateGame', this.state.game.id)
            .catch(err => console.error(err));
      })
      .catch(error => {
        alert(error);
      });

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
            <Button
              align="right"
              variant="contained"
              color="primary"
              onClick={() => this.handleOpenGameDialog()}
              style={styles.button}
            >
              Create
            </Button>
          </Box>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.games.map(row => (
                <TableRow key={row.id}>
                  <TableCell scope="row">{row.id}</TableCell>
                  <TableCell >{row.title}</TableCell>
                  <TableCell >{row.size}</TableCell>
                  <TableCell >
                    <button onClick={()=>this.handleOpenConnectGameDialog(row.id, row.title, row.size)}>Connect</button>
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </div>
        <Dialog open={this.state.openGameDialog} onClose={this.handleCloseGameDialog} >
          <GameField game = {this.state.game} hubConnection = {this.state.hubConnection} isFirstUser={this.state.isFirstUser}
          waitingUser = {this.state.waitingUser}/>
          {/*<GamesPreview*/}
          {/*  games={this.state.games}*/}
          {/*  clickHandler={this.onConnectClickHandler}*/}
          {/*/>*/}
        </Dialog>
      </div>
    );
  }
}
