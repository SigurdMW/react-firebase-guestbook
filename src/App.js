import React, { Component } from 'react';
import BookForm from './components/BookForm';
import BookEntry from './components/BookEntry';
import base from './base';

class App extends Component {
  constructor(){
    super();

    this.handleBookFormSubmits = this.handleBookFormSubmits.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);

    this.state = {
      entries: {}
    };
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`entries`, {
      context: this,
      state: 'entries'
    });
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
    return (
      <div className="App">
        <h1>Sigurds gjestebok</h1>
        <BookForm handleBookFormSubmits={this.handleBookFormSubmits} />
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