import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import LandingPage from '../Landing/Landing';
import HomePage from '../Home/Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import TypeUidAndDisplay from '../TypeUIDAndDisplay';
import TypeUidAndDisplayWithHttpTrigger from '../TypeUIAndDisplayWithHttpTrigger';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

// const App = () => (
//   <Router>
//     <div>
//       <Navigation />
//       <hr />

//       <Route exact path={ROUTES.LANDING} component={LandingPage} />
//       <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
//       <Route path={ROUTES.SIGN_IN} component={SignInPage} />
//       <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
//       <Route path={ROUTES.HOME} component={HomePage} />
//       <Route path={ROUTES.ACCOUNT} component={AccountPage} />
//       <Route path={ROUTES.ADMIN} component={AdminPage} />
//     </div>
//   </Router>
// );

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
          <div>
            <Navigation />
            <hr />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.TYPE_UID_AND_DISPLAY} component={TypeUidAndDisplay} />
            <Route path={ROUTES.TYPE_UID_AND_DISPLAY_WITH_HTTP_TRIGGER} component={TypeUidAndDisplayWithHttpTrigger} />
          </div>
        </Router>
      </AuthUserContext.Provider>
    );
  }
}


export default withFirebase(App);