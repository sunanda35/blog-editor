import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Stories from './pages/stories/Stories'
import Stat from './pages/stats/Stat'

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route component={Stories} path='/' exact/>
          <Route component={Stat} path='/stories' exact/>
        </Switch>
      </BrowserRouter> 
  );
}

export default App;
