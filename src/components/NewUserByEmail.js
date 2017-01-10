import React, { Component } from 'react';
import base from '../base';

class NewUserByEmail extends Component {
	constructor() {
    super();

    this.createUserWithEmail = this.createUserWithEmail.bind(this);
    this.captureInput = this.captureInput.bind(this);
    
    this.state = {
      uid: null
    }
  }

  createUserWithEmail(email, password){
  	// creates user and signs them in
  	const auth = base.auth().createUserWithEmailAndPassword(email, password)
  		.then((user) => {
  			console.log(user);
  			this.setState({ uid: user.uid });
  		})
			.catch(function(error) {
      //Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

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

export default NewUserByEmail;