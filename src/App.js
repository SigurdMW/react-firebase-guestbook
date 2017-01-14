import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="main-header">
          <span>Sigurds gjestebok</span>
          <nav className="navigation">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </header>
        <div className="container">
          {this.props.children}
        </div>
        <footer className="main-footer">
          @footer
        </footer>
      </div>
    );
  }
}

export default App;