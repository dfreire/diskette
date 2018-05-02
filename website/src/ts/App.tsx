import * as React from 'react';
import { withSiteData, Router, Link } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
import { SiteData } from './common/Types';

const App = withSiteData((props: SiteData) => (
	<div className="container mx-auto bg-white rounded overflow-hidden shadow-md">
		<div className="bg-black text-white p-4"><h2>{props.title}</h2></div>
		<Router>
			<div>
				<div className="content">
					<div className="bg-grey-light p-3">
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
