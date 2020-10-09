import React, {Component} from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import GiverPage from './pages/GiverPage';
import ReceiverPage from './pages/ReceiverPage';
import NotFoundPage from './pages/NotFoundPage';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

class App extends Component {

  // Setup constructor
  state = {
  };
  
  render(){
    return(
          <Router>
          <div className="App">
            <NavBar></NavBar>
            <div id='page-body'>
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/about" component={AboutPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/give" component={GiverPage}  />
                <Route path="/receive" component={ReceiverPage}  />
                {/* <Route path="/article/:name" component={ArticlePage}  /> */}
                <Route component={NotFoundPage}></Route>
              </Switch>
            </div>
          </div>
        </Router>
    )
  }

};

export default App;
