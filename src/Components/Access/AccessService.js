import Axios from "axios";
import sha256 from "sha256";
import dotenv from "dotenv";

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
}
