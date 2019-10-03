import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => {
        return {
          ...usersObject[key],
          uid: key
        };
      });
      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    )
  }
}

const UserList = ({ users }) => {
  return (
    <ul>
      {
        users.map(user => {
          return (
          <li key={user.uid}>
            <span>
              ID: {user.uid}
            </span>
            <br />
            <span>
              Email: {user.email}
            </span>
            <br />
            <span>
              Username: {user.username}
            </span>
            <br />
          </li>
          );
        })
      }
    </ul>
  );
}

export default withFirebase(AdminPage);