import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Customers from './Customers';
import Trainings from './Trainings';
import Navigator from './Navigator';
import Calendar from './Calendar';
import Home from './Home';


class Router extends Component {
  render() {
    return (
     <BrowserRouter>   
      <div>
        <Navigator></Navigator>
        <Switch>  
        <Route exact path="/" component={Home} />
            <Route path="/customers" component={Customers}></Route>
            <Route path="/trainings" component={Trainings}></Route>
            <Route path="/calendar" component={Calendar}></Route>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default Router;
