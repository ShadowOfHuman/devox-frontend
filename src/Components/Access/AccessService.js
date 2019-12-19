import Axios from "axios";
import sha256 from "sha256";
import dotenv from "dotenv";
import {CookieService} from "../CookieService";

dotenv.config();
export class AccessService {
  static registration(username, email, password) {
    return Axios.post(process.env.REACT_APP_API_URL + "/User/registration", {
      userName: username,
      email: email,
      passwordHash: sha256(password)
    });
  }

  static authentication(email, password) {
    return Axios.post(process.env.REACT_APP_API_URL + "/User/authentication", {
      email: email,
      passwordHash: sha256(password)
    });
  }

  static checkToken(){
    return Axios.get(process.env.REACT_APP_API_URL+"/user/checkauth",
      {
        headers: {"Authorization" : `Bearer ${CookieService.getAuthToken()}`}
    });
  }

  static getAuthFromSCookie(){
    //return this.Cookies2.get("userToken");
  }

  static setAuthToCookie(token){
    //this.Cookies2.set("userToken", token);
  }

  static deleteAuth(){
    //this.Cookies2.remove('userToken', { path: '' });
  }
}
