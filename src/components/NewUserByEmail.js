import React, { Component } from 'react';
import base from '../base';

class NewUserByEmail extends Component {
	constructor() {
    super();

    this.createUserWithEmail = this.createUserWithEmail.bind(this);
    this.captureInput = this.captureInput.bind(this);
    this.logout = this.logout.bind(this);
    
    this.state = {
      uid: null,
      error: null
    }
  }

  createUserWithEmail(email, password){
    this.setState({ error: null });
  	// creates user and signs them in
  	const auth = base.auth().createUserWithEmailAndPassword(email, password)
  		.then((user) => {
  			console.log(user);
  			this.setState({ uid: user.uid });
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


  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

	render(){
    const isLoggedIn = true;
		return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
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
          <hr /> 
          <button onClick={this.logout} className="btn btn-danger">Logg ut</button>
        </div>
      </div>
		)
	}
}

export default NewUserByEmail;