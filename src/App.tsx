import React, { FC } from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom"
import { Aside } from './components';
import ListPage from './pages/ListPage';
import { Context } from './context';

import './assets/styles/main.scss'
import ProfilePage from './pages/ProfilePage';

const App: FC = () => { 

  const [state, setState] = React.useState<any>({
    users: [],
    sort: null,
    isLoad: true
  })


  return (
    <HashRouter basename='/'>
      <Context.Provider value={{ state, setState }} >
        <div className="app">
        <Aside />
        <Switch>
          <Route exact path='/' component={ListPage} />
          <Route exact path='/user/:id' component={ProfilePage} />
        </Switch>
        </div>
      </Context.Provider>
      
    </HashRouter>
  );
}

export default App;
