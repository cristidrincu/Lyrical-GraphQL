import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

import { fetchSongs, deleteSong } from "../queries/songs";

class SongList extends Component {

  renderLoader() {
    return <div><p>Loading...</p></div>;
  }

  handleDeleteSong(songId) {
    /*
    * this.props.data.refetch() - from react-apollo, refetches data from a query associated with this component - in our case, fetchSongs.
    * If multiple queries, use refetchQueries as presented in SongCreate component
    * **/

    return this.props.mutate({
      variables: {
        songId
      }
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
      return this.props.data.songs.map(({ id, title }) =>
          <li key={id} className="collection-item">
            {title}
            <i className="material-icons" onClick={() => this.handleDeleteSong(id)}>delete</i>
          </li>
      );
  }

  render() {
      return (
          <div>
            <ul className="collection">
              { this.props.data.loading ? this.renderLoader() : this.renderSongs() }
            </ul>
            <Link to="songs/new" className="btn-floating btn-large red right">
              <i className="material-icons">add</i>
            </Link>
          </div>
      )
  };
}

export default compose(
    graphql(fetchSongs),
    graphql(deleteSong)
)(SongList);