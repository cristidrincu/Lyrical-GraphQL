import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import SongList from './components/SongList';

//interacts directly with the graphql server on the backend and stores responses - it's like a client repository
import ApolloClient from 'apollo-client';

//glue layer between react and apollo client -> interacts with the apollo client and fetches data from it to the react app
import { ApolloProvider } from 'react-apollo';
import SongCreate from "./components/SongCreate";

//convention over configuration - the apollo client assumes that we interact with graphql on port localhost:4000/graphql
//that's why the config object in the constructor -> {} is empty
const client = new ApolloClient({});

const Root = () => {
  return (
      <ApolloProvider client={client}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={SongList} />
            <Route path="/songs/new" component={SongCreate} />
          </Route>
        </Router>
      </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
