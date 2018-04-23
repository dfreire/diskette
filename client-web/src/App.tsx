import * as React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as UserModel from './models/User';
import Home from './pages/Home';
import Login from './pages/Login';

interface Props extends UserModel.State {

}

class App extends React.Component<Props, {}> {
	public render() {
		const isLoggedIn = this.props.sessionToken.length > 0;

		if (isLoggedIn) {
			return (
				<Switch>
					<Route path='/home' component={Home} />
					<Redirect to='/home' />
				</Switch>
			);
		} else {
			return (
				<Switch>
					<Route path='/login' component={Login} />
					<Redirect to='/login' />
				</Switch>
			);
		}
	}
}

const mapState = (models: { user: UserModel.State }) => ({
	sessionToken: models.user.sessionToken,
});

export default withRouter(connect(mapState)(App) as any);
