import React, { Component } from 'react';
import { Link } from 'react-router';

import { setLoginDataToLS } from '../../services/auth';
import base from '../../base';

import LogOut from './LogOut';


class LoginForm extends Component {

	constructor(){
		super();

		this.login = this.login.bind(this);

		this.state = {
			error: null
		}
	}

	componentWillMount(){
		/*
		if(localStorage.getItem("uid")){
			this.context.router.push('/home');
		}
		*/
	}

	login(e){
		e.preventDefault();

		base.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
			.then((user) => {
				//console.log(user);
				const userInfo = {
					name: user.displayName,
					email: user.email
				}
				this.loginForm.reset();
				setLoginDataToLS(user.uid, userInfo);

				const { location } = this.context.router;
				
				if (location.state && location.state.nextPathname) {
					// if requested other URL than default after login, this handles that:
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/home')
        }
				//this.context.router.push('/');
			})
			.catch((error) => {
				//const errorCode = error.code;
        const errorMessage = error.message;
	     	this.setState({ error: errorMessage });
	      console.log(error);
      });
	}

	render(){
		const user = JSON.parse(localStorage.getItem("user"));
		const loggedIn = (user) ? true : false;
		var displayName;
		if(loggedIn){
			displayName = (user.name) ? user.name : user.email;
		}
		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<div className="login-form">
						<h1>Logg inn</h1>
						{ loggedIn &&
								<div className="alert alert-info">Du er logget inn som { displayName }.<br /><LogOut router={this} /></div>
						}
						<form className="login-form" ref={(input) => this.loginForm = input} onSubmit={(e) => this.login(e)}>
							<fieldset>
								{this.state.error && 
									<div className="alert alert-danger">{this.state.error}</div>
								}
								<legend>Login form</legend>
								<div className="form-group">
									<label htmlFor="email">E-post</label>
									<input type="email" id="email" ref={(input) => this.email = input} className="form-control" />
								</div>
								<div className="form-group">
									<label htmlFor="pwd">Passord</label>
									<input type="password" id="pwd" ref={(input) => this.password = input} className="form-control" />
								</div>
							</fieldset>
							<button className="btn btn-success">Login</button>
						</form>
						<hr />
						<Link to="/reset-pwd">Glemt passord?</Link>
						<hr />
						<Link to="/register">Registrer ny bruker</Link>
					</div>
				</div>
			</div>
		)
	}
}

LoginForm.contextTypes = {
	router: React.PropTypes.object
}

export default LoginForm;