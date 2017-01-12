import React, { Component } from 'react';
import base from '../base';

class LoginForm extends Component {

	constructor(){
		super();

		this.login = this.login.bind(this);

		this.state = {
			error: null
		}
	}

	login(e){
		e.preventDefault();

		base.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
			.then((user) => {
				console.log(user);
				//this.setState({ uid: user.uid });
				this.props.setUidToState(user.uid);
				this.loginForm.reset();
			})
			.catch((error) => {
				const errorCode = error.code;
        const errorMessage = error.message;
	     	this.setState({ error: errorMessage });
	      console.log(error);
      });
	}

	render(){
		return (
			<form className="login-form" ref={(input) => this.loginForm = input} onSubmit={(e) => this.login(e)}>
				<fieldset>
					{this.state.error && 
						<div className="alert alert-danger">{this.state.error}</div>
					}
					<legend>Login form</legend>
					<div className="form-group">
						<label>E-post
							<input type="email" ref={(input) => this.email = input} className="form-control" />
						</label>
					</div>
					<div className="form-group">
						<label>Passord
							<input type="password" ref={(input) => this.password = input} className="form-control" />
						</label>
					</div>
				</fieldset>
				<button className="btn btn-success">Login</button>
			</form>
		)
	}
}

export default LoginForm;