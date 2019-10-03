import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
}

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  error: null
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, password } = this.state;

    this.props.firebase
      .signUpWithEmailAndPassword(email, password)
      .then(user => {
        return this.props.firebase
          .user(user.uid)
          .set({
            username, 
            email
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error })
      });
    // prevents automatic browser reload on form submission
    event.preventDefault();
  }

  onChange = event => {
    /* this.setState({
      username: event.target.value.username,
      email: event.target.value.email,
      password: event.target.value.password,
      passwordConfirmation: event.target.value.passwordConfirmation,
    });
    // apparently, the above is (almost--it doesn't work) equivalent to:*/
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { username, email, password, passwordConfirmation, error } = this.state;
    const valid =
      password === passwordConfirmation &&
      password !== '' &&
      email !== '' &&
      username !== '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={!valid} type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };