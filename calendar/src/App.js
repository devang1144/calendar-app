import React from 'react';
import Calender from './components/calender';
import Months from './components/months';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Year from './components/Year';
import Signup from './components/signupPage';
import LoginPage from './components/loginPage';
import Test from './components/testPage';
import HomePage from './components/HomePage';
import Loading from './components/logload';
import Glog from './components/googlelogin';
import Contact from './components/contact';
function App() {
  return (
    <div>
      <Router>
          <Switch>
              <Route path='/' exact component={HomePage}/>
              <Route path='/d' exact component={Calender}/>
              <Route path='/month' component={Months}/>
              <Route path='/year' component={Year}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/test' component={Test}/>
              <Route path='/loading' component={Loading} />
              <Route path='/glog' component={Glog} />
              <Route path='/contact' component={Contact} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
