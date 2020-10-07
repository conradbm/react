import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';

/**
 * Installation and project code
 * 1. npm install --save bootstrap react-icons lodash jquery popper.js moment react-moment // puts into node_modules
 * Bootstrap files for us
 * 1. https://gist.github.com/planetoftheweb/c3f562c9301c160cbd51614b8f7f640a
 * 2. https://gist.github.com/planetoftheweb/52cfe4aa90867708611a0cf33d2e1d7d
 * 3. https://gist.githubusercontent.com/planetoftheweb/560f8df9e638a0083b5327931c3e202b/raw/b22dab78e56b8e8aa18247bd96738476e2437870/ri-App.html
 * Access Data
 * 1. https://gist.github.com/planetoftheweb/bcca7bc277762bb14249f6195fe5af3d
 * Access some bootstrap code
 * 1. https://gist.github.com/planetoftheweb/4f433de6db893878acaa78135e705d06
 * Access some css code
 * 1. https://gist.githubusercontent.com/planetoftheweb/334f32d16ce3c4b877582e138255aa53/raw/123a41af51d5533e622b7826d00faf312921ca1e/ti-App.css
 * 
 * 
 * 
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
