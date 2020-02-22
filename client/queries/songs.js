import gql from 'graphql-tag';

export const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

export const createSong = gql`  
    mutation AddNewSong($newSongTitle: String) {
        addSong(title: $newSongTitle) {
          id
          title
        }
    }
`;

export const deleteSong = gql`
  mutation DeleteSong($songId: ID) {
    deleteSong(id: $songId) {
      id
      title
    }
  }
`;