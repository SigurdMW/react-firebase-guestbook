import React, { Component } from 'react';
import { Link } from 'react-router';

// services 
import { syncEntities, logout } from '../services/services';
import base from '../base';

// components
import BookForm from './BookForm';
import BookEntry from './BookEntry';
import NewUserByEmail from './NewUserByEmail';

class Main extends Component {
  constructor(){
    super();

    this.handleBookFormSubmits = this.handleBookFormSubmits.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setUidAndUserInfoToState = this.setUidAndUserInfoToState.bind(this);

    this.state = {
      entries: {},
      users: {},
      uid: null
    };
  }

  componentWillMount() {
    // receive props from login-page
    if(this.context.router.location.query.login){
      console.log("User is:");
      console.log(this.props.location.state.user);
      console.log("UID er: "+this.props.location.state.uid);

      const {uid, user} = this.props.location.state;
      this.setState({
        uid, 
        user
      });
    }
    // this runs right before the <App> is rendered
    syncEntities(this);
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.setUidAndUserInfoToState(user.uid, user);
      }
    });
  }

  setUidAndUserInfoToState(uid, data){
    console.log({uid, data});
    const users = {...this.state.users};
    users[uid] = data;
    this.setState({ users, uid });
  }

  handleLogout(e) {
    e.preventDefault();
    console.log("clicked logout button")
    logout();
    this.setState({ uid: null, users: null });
  }

  handleBookFormSubmits(value){
    console.log(value);
    // copy of state
    const entries = {...this.state.entries};
    // make timestamp
    const timestamp = Date.now();
    // set to own object
    entries[`item-${timestamp}`] = value;

    this.setState({
      entries
    });
  }

  deleteEntry(key){
    const entries = {...this.state.entries};
    entries[key] = null;
    this.setState({
      entries
    });
  }

  editEntry(e, key){
    const entries = {...this.state.entries};
    entries[key]["text"] = e.target.value;
    this.setState({
      entries
    });
  }

  render() {
    const isLoggedIn = (this.state.uid && base.auth().currentUser) ? true : false;
    return (
      <div className="container App">
        <h1>Sigurds gjestebok</h1>
        {isLoggedIn &&
          <button onClick={(e) => this.handleLogout(e)} className="btn btn-danger">Logg ut</button>
        }
        {!isLoggedIn &&
          <Link to="/login">Login</Link>
        }
        <div className="row">
          <div className="col-md-6">
            <NewUserByEmail setUidAndUserInfoToState={this.setUidAndUserInfoToState} />
          </div>
          <div className="col-md-6">
            {this.props.children}
          </div>
          <div className="col-md-12">
            <BookForm handleBookFormSubmits={this.handleBookFormSubmits} />
          </div>
        </div>
        {
          Object
            .keys(this.state.entries)
            .map(key => <BookEntry key={key} index={key} deleteEntry={this.deleteEntry} data={this.state.entries[key]} editEntry={this.editEntry} />)
        }
      </div>
    );
  }
}

Main.contextTypes = {
  router: React.PropTypes.object
}

export default Main;