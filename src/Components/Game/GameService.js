import Axios from "axios";
import {CookieService} from "../CookieService";


export class GameService {

  static configreq = {
    headers: {"Authorization" : `Bearer ${CookieService.getAuthToken()}`}
  };

  static createGame(userId, title, size) {
    return Axios.post(
      process.env.REACT_APP_API_URL + "/game/create",
      {
              "IdCreatedUser": userId,
              "Title": title,
              "Size": size
      },
      {
        headers: {"Authorization" : `Bearer ${CookieService.getAuthToken()}`}
      });
  }

  static getAllGame() {
    return Axios.get(process.env.REACT_APP_API_URL + "/game/all",
      {
        headers: {"Authorization" : `Bearer ${CookieService.getAuthToken()}`}
      });
  }
}
