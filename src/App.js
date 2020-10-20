import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Stories from './pages/stories/Stories'
import Stat from './pages/stats/Stat'

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/stories' exact />
          <Route component={Stories} path='/stories' exact/>
          <Route component={Stat} path='/stat' exact/>
        </Switch>
      </BrowserRouter> 
  );
}

export default App;
