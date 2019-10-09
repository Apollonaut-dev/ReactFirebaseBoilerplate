import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = { user_id: '', user_name: null, error: '' };

class TypeUIDAndDisplayWithHttpTrigger extends Component {
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
    
    fetch(`https://us-central1-react-firebase-a8fbf.cloudfunctions.net/getUser?uid=${this.state.user_id}`)
      .then(response => {
        const json = response.json();
        this.setState({
          user_name: `${json.firstName} ${json.lastName}`
        });
      })
      .catch(err => {
        this.setState({
          error: 'Did not receive user object'
        });
        console.log(err);
      })
      .finally(() => {
        console.log(this.state)
      });
    this.setState({
      user_name: 'fetching...'
    });
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
        <p className="user-name">{!this.state.error ? this.state.user_name : this.state.error}</p>
      </div>
    );
  }
}

export default withRouter(withFirebase(TypeUIDAndDisplayWithHttpTrigger));