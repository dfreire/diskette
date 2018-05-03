import * as React from 'react';
import { withSiteData, Router, Link } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
import { SiteData } from './common/Types';

const App = withSiteData((props: SiteData) => (
	<div>
		<h2>{props.title}</h2>
		<Router>
			<div>
				<div>
					<div>
						<Link to="/">Home</Link> / <Link to="/about">About</Link> / <Link to="/blog">Blog</Link>
					</div>
					<div className="p-3">
						<Routes />
					</div>
				</div>
			</div>
		</Router>
	</div>
));

export default hot(module)(App);
