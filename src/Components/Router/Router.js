import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import {HOSPITAL} from '../Config/Hospital-Config';

import Index from '../View/Index-kitchen';
import Login_RAM from '../View/RAM/Login/Login';
import Login_CMR from '../View/CMR/Login/Login';
import Choose_kitchen from '../View/RAM/Login/Choose-kitchen';

export default class Router extends Component {

    render() {
      return (
        <HashRouter className="test">
            <Switch>

              {(()=>{
                if(HOSPITAL != "RAM"){
                  console.log(HOSPITAL);
                  return(
                    // <React.Fragment>
                      <Route path="/" component={Login_CMR} exact />
                    // </React.Fragment>
                  )
    
                }else{
                  console.log(HOSPITAL);
                  return(
                    // <React.Fragment>
                          <Route path="/" component={Login_RAM} exact />
                    // </React.Fragment>
                  )
                }
              })()}
         
              <Route path="/Index" component={Index} />
              <Route path="/Choose-kitchen" component={Choose_kitchen} />
            </Switch>
        </HashRouter>
      );
    }
}