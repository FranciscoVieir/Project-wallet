import React from 'react';
import { Switch, Route } from 'react-router-dom';
import login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ login } />
      </Switch>
    );
  }
}

export default App;
