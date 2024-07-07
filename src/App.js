import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingScreen from './landing';
import empDashboard from './components/empDashboard';
import Adashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/empdashboard" component={empDashboard} />
          <Route exact path="/Adashboard" component={Adashboard} />
          <Route path="/" component={LandingScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
