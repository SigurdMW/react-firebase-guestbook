import React, { Component } from 'react';
import base from '../base';

class AuthForm extends Component {
	captureInput(e){
		e.preventDefault();		
		this.createUserWithEmail(this.email.value, this.password.value);
		this.entryForm.reset();
	}

	render(){
		return (
			<form ref={(input) => this.entryForm = input} onSubmit={(e) => {this.captureInput(e)}}>
				<fieldset>
					<legend>Register new user</legend>
					<label htmlFor="email">Email</label>
					<input name="email" type="email" id="email" ref={(input) => this.email = input} />
					<label htmlFor="password">Password</label>
					<input type="password" ref={(input) => this.password = input} id="password" name="password" />
					<button className="submit" type="submit">Create user</button>
				</fieldset>
			</form>
		)
	}
}

export default AuthForm;