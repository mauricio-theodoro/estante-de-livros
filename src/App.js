import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import BookSearch from './components/BookSearch';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={BookShelf} />
          <Route path="/search" component={BookSearch} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
