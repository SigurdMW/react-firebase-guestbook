import React, { Component } from 'react';
import { Link } from 'react-router';

// services 
import { syncEntities } from '../services/services';
import { logout } from '../services/auth';
import base from '../base';

// components
import BookForm from './BookForm';
import BookEntry from './BookEntry';
import LogOut from './auth/LogOut';


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
      uid: null
    };
  }

  componentDidMount() {
    if(localStorage.getItem("uid")){
      const uid = localStorage.getItem("uid");
      const user = JSON.parse(localStorage.getItem("user"));
      this.setState({
        uid,
        user
      });
    } else {
      base.onAuth((user) => {
        if(user) {
          this.setUidAndUserInfoToState(user.uid, user);
          return;
        }
        //this.context.router.push('/login');
      });
    }
    syncEntities(this);
  }

  setUidAndUserInfoToState(uid, data){
    console.log({uid, data});
    const user = {...this.state.user};
    this.setState({ user, uid });
  }

  handleLogout(e) {
    e.preventDefault();
    //logout(this);
    this.setState({ uid: null });
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
      <div className="App">
        <h1>Sigurds gjestebok</h1>
        <div className="row">
          <div className="col-md-8">
            <BookForm handleBookFormSubmits={this.handleBookFormSubmits} />
          </div>
          <div className="col-md-4">
            {isLoggedIn &&
              <LogOut router={this} />
            }
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