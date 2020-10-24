import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Stories from './pages/stories/Stories'
import Stat from './pages/stats/Stat'
import Error from './reusable/error/Error'
import Write from './pages/write/Write'
import Signin from './pages/land/signin/Signin'
import Signup from './pages/land/signup/Signup'

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/login' exact />
          <Route component={Signin} path='/login' exact/>
          <Route component={Signup} path='/signup' exact/>
          <Route component={Stories} path='/stories' exact/>
          <Route component={Write} path='/draft' exact/>
          <Route component={Stat} path='/stat' exact/>
          <Route component={Error} path='*' exact/>
        </Switch>
      </BrowserRouter> 
  );
}

export default App;
