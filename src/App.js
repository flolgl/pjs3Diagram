import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChiffreMois from "./Component/DiagramCall/ChiffreMois.js"
import ChiffreCateg from "./Component/DiagramCall/ChiffreCateg.js"
import TicketMoyenMois from "./Component/DiagramCall/TicketMoyenMois"
import TicketMoyenClients from "./Component/DiagramCall/TicketMoyenClients"
import ClientsNDepByCat from "./Component/DiagramCall/clientsNDepByCat"
import NavBar from './Component/NavBar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"


class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/ChiffreMois" component={ChiffreMois}/>
          <Route path="/getChiffreCateg" component={ChiffreCateg}/>
          <Route path="/getTicketMoyenPerMonth" component={TicketMoyenMois}/>
          <Route path="/getTicketMoyenClients" component={TicketMoyenClients}/>
          <Route path="/getClientsAndDepensesByCateg" component={ClientsNDepByCat}/>

          <Route path="/">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">{this.state.data}</p>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;