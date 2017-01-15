import React, { Component } from 'react';
//import { router } from 'react-router';

import { logout } from '../../services/auth';


class LogOut extends Component {

	render(){
		return (
			<button className="btn btn-danger" onClick={() => logout(this, this.props.router)}>Logg ut</button>
		)
	}
}

export default LogOut;