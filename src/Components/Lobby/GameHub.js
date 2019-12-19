import * as signalR from "@microsoft/signalr";

export class GameHub {

  hubUrl = 'http://localhost:58604/chat';
  hubConnection = new signalR.HubConnectionBuilder();

  constructor() {
      this.hubConnection.withUrl(this.hubUrl).build();
  }

  createGame(){

  }

  connectToGame(){

  }

  makeAMove(){

  }
}
