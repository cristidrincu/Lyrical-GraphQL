import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';

import { createSong, fetchSongs } from "../queries/songs";

class SongCreate extends Component {

  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit (event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        newSongTitle: this.state.title
      },
      refetchQueries: [{ query: fetchSongs }]
    }).then(() => hashHistory.push('/'));
  };

  render() {
    return (
        <div>
          <Link to="/">Back</Link>
          <h3>Create a new song</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            <label htmlFor="songTitle">Song title:</label>
            <input
                id="songTitle"
                type="text"
                placeholder="Enter a title for your new song"
                onChange={event => this.setState({ title: event.target.value })}
                value={this.state.title}
            />
          </form>
        </div>
    );
  }
}

//TODO - the graphql wrapper from react-apollo will provide us the mutate function - it can be accesses from this.props.mutate
//TODO - the mutate function is actually the mutation we defined with gql (see queries.js->createSong) - all we have to do is provide the variables in the react component -> newSongTitle
export default graphql(createSong)(SongCreate);