import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar'
import NotFoundPage from './pages/NotFoundPage';
// <Router> -> Display the body of the page with <Routes> updated by <Links> throughout the app.
// <Switch> -> to check Routes and default to NotFound if none found

function App() {
  return (
    
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <div id='page-body'>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} />
            <Route path="/articles-list" component={ArticlesListPage}  />
            <Route path="/article/:name" component={ArticlePage}  />
            <Route component={NotFoundPage}></Route>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
