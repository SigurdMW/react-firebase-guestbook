import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import { authCheck } from './services/auth';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// Components
import App from './App';
import NotFound from './components/NotFound';
import Main from './components/Main';
import LoginForm from './components/auth/LoginForm';
import PasswordReset from './components/auth/PasswordReset';
import NewUserByEmail from './components/auth/NewUserByEmail';

const routing = (
	<Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Main} onEnter={authCheck}/>
    	<Route path="/home" component={Main} onEnter={authCheck}/>
    	<Route path="/register" component={NewUserByEmail}/>
    	<Route path="/login" component={LoginForm}/>
    	<Route path="/reset-pwd" component={PasswordReset}/>
    	<Route path="*" component={NotFound}/>
    </Route>
  </Router>
)

ReactDOM.render(
 routing, document.getElementById('root')
)