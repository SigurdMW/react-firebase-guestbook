import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App';
import Main from './components/Main';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const routing = (
	<Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Main}/>
    	<Route path="/home" component={Main}/>
    	<Route path="/login" component={LoginForm}/>
    </Route>
  </Router>
)

ReactDOM.render(
 routing, document.getElementById('root')
)