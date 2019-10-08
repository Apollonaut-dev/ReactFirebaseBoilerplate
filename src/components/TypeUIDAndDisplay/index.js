import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = { user_id: '' };

class TypeUIDAndDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { user_id } = this.state;
    event.preventDefault();
    console.log(user_id);
    this.props.firebase.user(user_id).once('value')
      .then(snap => {
        this.setState({ user_name: `${snap.val().contactInfo.firstName} ${snap.val().contactInfo.lastName}` })
      })
      .catch(console.log);
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({ user_id: event.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="user_id"
            value={this.state.user_id}
            type="text"
            placeholder="Enter user id"
            onChange={this.onChange}
          />
          <button type="submit">Get user</button>
        </form>
        <p className="user-name">{this.state.user_name}</p>
      </div>
    );
  }
}

export default withRouter(withFirebase(TypeUIDAndDisplay));