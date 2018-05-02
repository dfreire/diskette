import * as React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import Content from './pages/Content/Content';
import Login from './pages/Login';
import * as UserModel from './models/User';
const { Icon } = require('react-fa');

interface Props extends UserModel.State, UserModel.Dispatch {
	location: Location;
}

class App extends React.Component<Props, {}> {
	render() {
		const isLoggedIn = this.props.sessionToken.length > 0;
		return isLoggedIn ? this._renderLoggedIn() : this._renderLoggedOut();
	}

	_renderLoggedIn() {
		return (
			<div className={[classes.container, classes.containerLoggedIn].join(' ')}>
				<div className={classes.headerContainer}>
					<h2 className={classes.headerTitle}>Diskette</h2>
					<button className={classes.headerLogoutButton} onClick={this.props.logout}>
						<Icon name="times" />
					</button>
				</div>
				<Breadcrumb {...this.props} />
				<Switch>
					<Route path="/content" component={Content} />
					<Redirect to="/content" />
				</Switch>
			</div>
		);
	}

	_renderLoggedOut() {
		return (
			<div className={[classes.container, classes.containerLoggedOut].join(' ')}>
				<div className={classes.headerContainer}>
					<div className={classes.headerTitle}><h2>Diskette</h2></div>
				</div>
				<Switch>
					<Route path="/login" component={Login} />
					<Redirect to="/login" />
				</Switch>
			</div>
		);
	}
}

const classes = {
	container: 'container mx-auto bg-white rounded shadow-lg font-sans',
	containerLoggedOut: 'max-w-xs',
	containerLoggedIn: 'max-w-xl',
	headerContainer: 'flex bg-black rounded-t',
	headerTitle: 'flex-1 text-white p-4',
	headerLogoutButton: 'w-8 h-8 rounded-tr p-2 rounded-bl text-grey hover:bg-grey-darkest hover:text-white font-thin font-mono',
};

const mapState = (models: { user: UserModel.State }) => ({
	sessionToken: models.user.sessionToken,
});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
	logout: models.user.logout
}) as any;

export default withRouter(connect(mapState, mapDispatch)(App) as any);
