import React, { Component } from 'react';
import BookForm from './components/BookForm';
import BookEntry from './components/BookEntry';
import LoginForm from './components/LoginForm';
import base from './base';
import NewUserByEmail from './components/NewUserByEmail';

class App extends Component {
  constructor(){
    super();

    this.handleBookFormSubmits = this.handleBookFormSubmits.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.logout = this.logout.bind(this);
    this.setUidAndUserInfoToState = this.setUidAndUserInfoToState.bind(this);

    this.state = {
      entries: {},
      users: {},
      uid: null
    };
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`users/1/entries`, {
      context: this,
      state: 'entries'
    });
  }

  setUidAndUserInfoToState(uid, data){
    console.log({uid, data});
    const users = {...this.state.users};
    users[uid] = data;
    this.setState({ users, uid });
  }

  logout() {
    base.unauth();
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
    const isLoggedIn = (base.auth().currentUser) ? true : false;
    return (
      <div className="container App">
        <h1>Sigurds gjestebok</h1>
        {isLoggedIn &&
          <button onClick={this.logout} className="btn btn-danger">Logg ut</button>
        }
        <div className="row">
          <div className="col-md-6">
            <NewUserByEmail setUidAndUserInfoToState={this.setUidAndUserInfoToState} />
          </div>
          <div className="col-md-6">
            <LoginForm setUidAndUserInfoToState={this.setUidAndUserInfoToState} /> 
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

export default App;