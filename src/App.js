import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import {Toolbar} from "@material-ui/core";
import PublicComponent from "./Components/Public/PublicComponent";
import handleOpen, {AccessControl} from "./Components/Access/AccessControl";

class GeneralPage extends React.Component{

  constructor(props){
    super(props);
    this.accessControlComponent = React.createRef();
  }

  handleClickOpenAccessControl = () => {
    this.accessControlComponent.current.open();
  };

  render(){
    return (
        <div className="App">
          <AppBar position="static" color="default">
            <Toolbar>
              <Button href="#" color="primary" variant="outlined"  onClick={this.handleClickOpenAccessControl}>
                Sing in
              </Button>
            </Toolbar>
          </AppBar>
          <PublicComponent/>
          <AccessControl  ref = {this.accessControlComponent}/>
        </div>
    );
  }
}


function App() {
    return (<GeneralPage/>);
}



export default App;
