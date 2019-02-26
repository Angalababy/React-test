import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'


class App extends Component {
  render () {
    return (
 <Switch>
   <Route path='/login' component={Login}/>
   <Route path='/' component={Admin}/>
 </Switch>
    )
  }
}

export default App;