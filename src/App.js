import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Stories from './pages/stories/Stories'
import Stat from './pages/stats/Stat'
import Error from './reusable/error/Error'
import Write from './pages/write/Write'

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/stories' exact />
          <Route component={Stories} path='/stories' exact/>
          <Route component={Write} path='/draft' exact/>
          <Route component={Stat} path='/stat' exact/>
          <Route component={Error} path='*' exact/>
        </Switch>
      </BrowserRouter> 
  );
}

export default App;
