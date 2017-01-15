import React, { Component } from 'react';

import base from '../../base';


class PasswordReset extends Component {
	constructor(){
		super();

		this.passwordReset = this.passwordReset.bind(this);

		this.state = {
			error: null,
			success: null
		}
	}

	passwordReset(e){
		e.preventDefault();
		const email = this.email.value;
		base.auth().sendPasswordResetEmail(email)
			.then(() => {
				this.setState({
					success: "We sent a reset link to your email!",
					error: null
				});
				this.resetForm.reset();
			})
			.catch((err) => {
				this.setState({
					error: err.message,
					success: null
				});
			});
	}

	render(){
		return (
			<div className="password-reset">
				<h1>Reset password</h1>
				<form ref={(input) => this.resetForm = input} onSubmit={(e) => this.passwordReset(e)}>
					<fieldset>
						<legend>Password reset</legend>
						{this.state.error &&
							<div className="alert alert-danger">
								{this.state.error}
							</div>
						}
						{this.state.success &&
							<div className="alert alert-success">
								{this.state.success}
							</div>
						}
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="email" className="form-control" name="email" id="email" ref={(input) => this.email = input}/>
						</div>
					</fieldset>
					<button className="btn btn-success">Reset password</button>
				</form>
			</div>
		)
	}
}

export default PasswordReset;