import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Stories from './pages/stories/Stories'
import Stat from './pages/stats/Stat'
import Error from './reusable/error/Error'
import Write from './pages/write/Write'
import Signin from './pages/land/signin/Signin'
import Signup from './pages/land/signup/Signup'
import editpage from './pages/editProfile/editpage';
import user from './pages/land/setuser/user';
import {Auth} from './reusable/authentication/auth'
import Privateroute from './reusable/authentication/privateroute';

function App() {
  return (
    <Auth>
      <BrowserRouter>
        <Switch>
          <Privateroute path='/' component={Signin} exact/>
          <Privateroute path='/stories' component={Stories} exact/>
          <Route component={Signin} path='/login' exact/>
          <Route component={Signup} path='/signup' exact/>
          <Route component={user} path='/boot' exact />
          <Route component={editpage} path='/editurprofile' exact />
          <Route component={Stories} path='/stories' exact/>
          <Route component={Write} path='/draft' exact/>
          <Route component={Stat} path='/stat' exact/>
          <Route component={Error} path='*' exact/>
        </Switch>
      </BrowserRouter> 
    </Auth>
  );
}

export default App;
