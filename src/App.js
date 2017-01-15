import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="app">
         <header className="blog-masthead">
          <div className="container">
            <nav className="blog-nav">
              <Link className="blog-nav-item" activeClassName="active" to="/home">Home</Link>
              <Link className="blog-nav-item" activeClassName="active" to="/login">Login</Link>
            </nav>
          </div>
        </header>
        <div className="container">
          {this.props.children}
        </div>
        <footer className="blog-footer">
          <div className="container">
            <p>Blog template built for Bootstrap.</p>
            <p>
              <span>Back to top</span>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;