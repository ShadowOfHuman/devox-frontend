import Cookies from 'js-cookie'

export class CookieService{

  static setAuthToken(token){
    Cookies.set(process.env.REACT_APP_KEY_FOR_TOKEN, token, { path: '' })
  }

  static getAuthToken(){
    return Cookies.get(process.env.REACT_APP_KEY_FOR_TOKEN, { path: '' });

  }

  static removeUserId(){
    Cookies.remove("userId", { path: '' });
  }

  static setUserId(userID, usernmae){
    Cookies.set("userId", userID+'/'+usernmae, { path: '' })
  }

  static getUserId(){
    return Cookies.get("userId", { path: '' }).split('/')[0];
  }
  static getUsername(){
    return Cookies.get("userId", { path: '' }).split('/')[1];
  }

  static removeCookieToken(){
    Cookies.remove(process.env.REACT_APP_KEY_FOR_TOKEN, { path: '' });
  }

  static removeAllcookie(){
    this.removeCookieToken();
    this.removeUserId();
  }
}
