import React from 'react'

const AuthContext = React.createContext({
  setAuth: () => {},
  handleClose: () => {},
  setUserId: () => {},
  setUsername: ()=>{},

});
export default AuthContext
