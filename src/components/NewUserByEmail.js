import React, { Component } from 'react';
import base from '../base';

class NewUserByEmail extends Component {
	constructor() {
    super();

    this.createUserWithEmail = this.createUserWithEmail.bind(this);
    this.captureInput = this.captureInput.bind(this);
    
    this.state = {
      error: null
    }
  }

  createUserWithEmail(email, password){
    this.setState({ error: null });
  	// creates user and signs them in
  	const auth = base.auth().createUserWithEmailAndPassword(email, password)
  		.then((user) => {
  			console.log(user);
        const userInfo = {
          name: user.displayName,
          email: user.email
        }
  			this.props.setUidAndUserInfoToState(user.uid, userInfo);
        this.entryForm.reset();
  		})
			.catch((error) => {
      //Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/weak-password') {
        //alert('The password is too weak.');
      } else {
        //alert(errorMessage);
      }
      this.setState({ error: errorMessage });
      console.log(error);
    });
  }

	captureInput(e){
		e.preventDefault();		
		this.createUserWithEmail(this.email.value, this.password.value);
	}

	render(){
		return (
      <div>
  			<form ref={(input) => this.entryForm = input} onSubmit={(e) => {this.captureInput(e)}}>
  				<fieldset>
  					<legend>Register new user</legend>
            {this.state.error && 
              <div className="alert alert-danger">{ this.state.error }</div>
            }
            <div className="form-group">
    					<label htmlFor="email">Email</label>
    				  <input name="email" className="form-control" type="email" id="email" ref={(input) => this.email = input} />
            </div>
            <div className="form-group">
    					<label htmlFor="password">Password</label>
    					<input type="password" className="form-control" ref={(input) => this.password = input} id="password" name="password" />
            </div>
  					<button className="submit btn btn-success" type="submit">Create user</button>
  				</fieldset>
  			</form>
      </div>
		)
	}
}

export default NewUserByEmail;